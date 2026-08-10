const OLLAMA_BASE_URL = "http://localhost:11434/api";

export const OLLAMA = {
  DEFAULT_PARAMS: {
    model: "nomic-embed-text",
    stream: false,
  },
  EMBED: `${OLLAMA_BASE_URL}/embed`,
};
