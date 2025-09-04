import restApi from "./strategies/restStrategy";
import localApi from "./strategies/localStrategy";
import type { IApi } from "./strategies/apiTypes";

const strategy: string = import.meta.env.VITE_API_STRATEGY;

const makeApi = (strategy: string): IApi => {
  switch (strategy) {
    case "local":
      return localApi;
    case "rest":
      return restApi;
    default:
      throw new Error("Unknown strategy.");
  }
};

export default makeApi(strategy);
