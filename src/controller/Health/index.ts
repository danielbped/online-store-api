interface HealthResponse {
  message: string;
};

export default class HealthController {
  public async getHealth(): Promise<HealthResponse> {
    return {
      message: "OK",
    };
  };
};