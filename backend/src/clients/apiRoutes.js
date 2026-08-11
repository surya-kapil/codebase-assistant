const OLLAMA_BASE_URL = "http://localhost:11434/api";

export const OLLAMA = {
  MODELS: {
    NOMIC: "nomic-embed-text",
    LLAMA: "llama3.2:3b",
  },
  ENDPOINT: {
    EMBED: `${OLLAMA_BASE_URL}/embed`,
    GENERATE: `${OLLAMA_BASE_URL}/generate`,
  },
};
