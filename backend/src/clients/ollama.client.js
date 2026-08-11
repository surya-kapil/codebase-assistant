import axios from "axios";
import { OLLAMA } from "./apiRoutes.js";

export const generateEmbeddings = async input => {
  const { data } = await axios.post(OLLAMA.ENDPOINT.EMBED, {
    model: OLLAMA.MODELS.NOMIC,
    stream: false,
    input,
  });

  return data.embeddings;
};

export const generate = async prompt => {
  const { data } = await axios.post(OLLAMA.ENDPOINT.GENERATE, {
    model: OLLAMA.MODELS.LLAMA,
    stream: false,
    prompt,
  });

  return data.response;
};
