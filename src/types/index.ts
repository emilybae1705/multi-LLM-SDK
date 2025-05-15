export interface CompletionRequest {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  model?: string;
}

export interface OpenAIParams {
  max_tokens?: number;
  max_completion_tokens?: number;
}

export interface AnthropicParams {
  max_tokens_to_sample?: number;
}

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface CompletionResponse {
  text: string;
  usage: TokenUsage;
  rawResponse?: any;
}