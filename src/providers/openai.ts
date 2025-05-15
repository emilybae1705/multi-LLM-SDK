import { BaseProvider, ProviderConfig } from "./base.js";
import { CompletionRequest, CompletionResponse } from "../types/index.js";
import axios from 'axios';

export interface OpenAIConfig extends ProviderConfig {
  model?: string;
  version?: string;
}

export class OpenAIAdapter implements BaseProvider {
  private config: OpenAIConfig;

  constructor(config: OpenAIConfig) {
    this.config = {
      model: 'gpt-4o',
      version: '2023-05-15',
      ...config
    };
  }

}