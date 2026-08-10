import axios from "axios";
import { OLLAMA } from "./apiRoutes.js";

export const generateEmbeddings = async input => {
  const { data } = await axios.post(OLLAMA.EMBED, {
    ...OLLAMA.DEFAULT_PARAMS,
    input,
  });

  return data.embeddings;
};
