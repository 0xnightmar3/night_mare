import axios from "axios";

import type { IApi } from "./apiTypes";
import type { IProject } from "../../types";

const apiList: IProject[] = [
  {
    url: "api.mealtracker.texhno.lol/health",
    name: "MEAL TRACKER",
    isUp: false,
    icon: "/avatar-big.png",
    link: "https://mealtracker.texhno.lol",
  },
  {
    url: "mythicdungeon.help/api/health",
    name: "MYTHIC DUNGEON HELPER",
    isUp: false,
    icon: "/info-big.png",
    link: "https://mythicdungeon.help",
  },
];

const getAllStatuses = () => {
  return new Promise<IProject[]>((res) => res(apiList));
};

const checkProjectHealth = async (project: IProject) => {
  try {
    const response = await axios.get<{ ok: boolean }>(`https://${project.url}`);
    return response.data;
  } catch (e) {
    console.log(e);
    return { ok: false };
  }
};

const restApi: IApi = {
  getAllStatuses,
  checkProjectHealth,
};

export default restApi;
