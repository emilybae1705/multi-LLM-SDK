# Multi-LLM SDK

A TypeScript SDK for interacting with multiple LLM APIs (OpenAI, Anthropic, Mistral, etc.).

## Class Diagram

```mermaid
classDiagram
    %% Core Interfaces
    class BaseProvider {
        <<interface>>
        +complete(request) Promise
        +streamComplete(request) AsyncGenerator
    }
    
    %% Provider Adapters
    class OpenAIAdapter {
        +complete(request) Promise
        +streamComplete(request) AsyncGenerator
    }
    
    class AnthropicAdapter {
        +complete(request) Promise
        +streamComplete(request) AsyncGenerator
    }
    
    class MistralAdapter {
        +complete(request) Promise
        +streamComplete(request) AsyncGenerator
    }
    
    %% Factory
    class ProviderFactory {
        +registerProvider(name, creator) void
        +createProvider(name, config) BaseProvider
    }
    
    %% Main Client
    class MultiLLMClient {
        +complete(request) Promise
        +withProvider(name) MultiLLMClient
        +withFallback(providers) MultiLLMClient
    }
    
    %% Data Models
    class CompletionRequest {
        +prompt string
        +maxTokens number
        +temperature number
    }
    
    class CompletionResponse {
        +text string
        +usage TokenUsage
    }
    
    %% Key Relationships
    BaseProvider <|.. OpenAIAdapter : implements
    BaseProvider <|.. AnthropicAdapter : implements
    BaseProvider <|.. MistralAdapter : implements
    
    ProviderFactory ..> BaseProvider : creates
    MultiLLMClient o-- BaseProvider : contains
    MultiLLMClient --> ProviderFactory : uses
    
    BaseProvider ..> CompletionRequest : uses
    BaseProvider ..> CompletionResponse : returns
    
    %% Styling
    classDef interface fill:#f5f5f5,stroke:#666,stroke-width:1px
    classDef adapter fill:#e1f5fe,stroke:#03a9f4,stroke-width:1px
    classDef client fill:#e8f5e9,stroke:#4caf50,stroke-width:1px
    classDef factory fill:#fff8e1,stroke:#ffc107,stroke-width:1px
    classDef data fill:#f3e5f5,stroke:#9c27b0,stroke-width:1px
    
    class BaseProvider interface
    class OpenAIAdapter,AnthropicAdapter,MistralAdapter adapter
    class MultiLLMClient client
    class ProviderFactory factory
    class CompletionRequest,CompletionResponse data
```