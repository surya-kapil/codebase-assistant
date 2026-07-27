import axios from "axios";

const fetchHealthCheck = async ({ owner }) => {
  const { data } = await axios.post("/", {
    owner
  });
  return data;
};

export { fetchHealthCheck };
