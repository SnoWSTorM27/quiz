import httpService from "./http.service";

const quizEndpoint = "quizes.json";

const quizService = {
  get: async () => {
    const { data } = await httpService.get(quizEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(quizEndpoint, payload);
    return data;
  }
};

export default quizService;
