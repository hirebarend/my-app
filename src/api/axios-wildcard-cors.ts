import axios from "axios";

export const AxiosWildcardCors = {
  get: async <T>(
    url: string,
    config: {
      params: { [key: string]: string };
    } = {
      params: {},
    }
  ) => {
    const response = await axios.post<{
      data: T;
    }>("https://hirebarend-function-app.azurewebsites.net/api/v1/cors", {
      method: "GET",
      params: config.params,
      url,
    });

    return response.data;
  },
};
