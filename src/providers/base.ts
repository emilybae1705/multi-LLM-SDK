import { CompletionRequest, CompletionResponse } from "../types/index.js";

export interface BaseProvider {
  complete(request: CompletionRequest): Promise<CompletionResponse>;
  streamComplete(request: CompletionRequest): AsyncGenerator<string, void, unknown>;
}

export interface ProviderConfig {
  apiKey: string;
  model?: string;
  baseUrl?: string;
}