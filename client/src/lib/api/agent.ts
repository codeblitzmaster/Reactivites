import axios from 'axios';
const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

export const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

agent.interceptors.response.use(async (response) => {
  try {
    await sleep(1000); // Simulate a delay for demonstration purposes
    return response;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
});

agent.interceptors.request.use((config) => {
  config.headers.set('test-header', 'test-value');
  return config;
});

export default agent;
