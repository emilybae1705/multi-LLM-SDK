import { BaseProvider, ProviderConfig } from "./base.js";
import { CompletionRequest, CompletionResponse } from "../types/index.js";
import Anthropic from '@anthropic-ai/sdk';

export interface AnthropicConfig extends ProviderConfig {
  model?: string;
  instructions?: string;
}

export class AnthropicAdapter implements BaseProvider {
  private client: Anthropic;
  private config: AnthropicConfig;

  constructor(config: AnthropicConfig) {
    this.config = {
      model: 'claude-opus-4-20250514',
      ...config
    };
    this.client = new Anthropic({
      apiKey: config.apiKey
    });
  }

  async complete(request: CompletionRequest): Promise<CompletionResponse> {
    try {
      const response = await this.client.messages.create({
        model: request.model || this.config.model,
        max_tokens: request.maxTokens,
        messages: [{
          role: 'user',
          content: request.prompt
        }],
        temperature: request.temperature
      });

      return this.transformResponse(response);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Anthropic request failed: ${error.message}`);
      }
      throw new Error('Anthropic request failed with unknown error');
    }
  }

  private transformResponse(response: any): CompletionResponse {
    return {
      text: response.content.text,
      usage: {
        inputTokens: response.usage?.input_tokens,
        outputTokens: response.usage?.output_tokens,
        totalTokens: response.usage?.input_tokens + response.usage?.output_tokens
      },
      rawResponse: response
    };
  }
}