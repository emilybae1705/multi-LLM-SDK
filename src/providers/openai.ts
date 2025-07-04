import { BaseProvider, ProviderConfig } from "./base.js";
import { CompletionRequest, CompletionResponse } from "../types/index.js";
import OpenAI from "openai";

export interface OpenAIConfig extends ProviderConfig {
  model?: string;
  instructions?: string;
}

export class OpenAIAdapter implements BaseProvider {
  private client: OpenAI;
  private config: OpenAIConfig;

  constructor(config: OpenAIConfig) {
    this.config = {
      model: 'gpt-4o',
      ...config
    };
    this.client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseUrl
    });
  }

  async complete(request: CompletionRequest): Promise<CompletionResponse> {
    try {
      const response = await this.client.responses.create({
        model: request.model || this.config.model,
        input: request.prompt,
        instructions: this.config.instructions,
        max_tokens: request.maxTokens,
        temperature: request.temperature
      });

      return this.transformResponse(response);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`OpenAI request failed: ${error.message}`);
      }
      throw new Error('OpenAI request failed with unknown error');
    }
  }

  async *streamComplete(request: CompletionRequest): AsyncGenerator<string, void, unknown> {
    try {
      const stream = await this.client.responses.create({
        model: request.model || this.config.model,
        input: request.prompt,
        instructions: this.config.instructions,
        max_tokens: request.maxTokens,
        temperature: request.temperature,
        stream: true
      });

      for await (const chunk of stream) {
        if (chunk.type === 'text.delta') {
          yield chunk.text;
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`OpenAI stream failed: ${error.message}`);
      }
      throw new Error('OpenAI stream failed with unknown error');
    }
  }

  private transformResponse(response: any): CompletionResponse {
    return {
      text: response.output_text,
      usage: {
        inputTokens: response.usage?.input_tokens,
        outputTokens: response.usage?.output_tokens,
        totalTokens: response.usage?.total_tokens
      },
      rawResponse: response
    };
  }
}