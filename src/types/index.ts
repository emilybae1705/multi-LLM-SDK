export interface CompletionRequest {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  model?: string;
  response_format?: "text" | "json_object";
  stream?: boolean;
}

export interface OpenAIParams {
  max_output_tokens?: number;
}

export interface AnthropicParams {
  max_tokens_to_sample?: number;
}

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}

export interface CompletionResponse {
  text: string;
  usage: TokenUsage;
  json?: any;
  rawResponse?: any;
}