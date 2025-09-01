import axios from "axios";

import type { IApi } from "./apiTypes";
import type { IProject } from "../../types";

const projectList: IProject[] = [
  { url: "api.mealtracker.texhno.lol/health", name: "Meal Tracker", isUp: false, icon: "mealtracker_logo.png", link: "https://mealtracker.texhno.lol" },
  { url: "mythicdungeon.help/api/health", name: "Mythic Dungeon Helper", isUp: false, icon: "/mythicdungeon_logo.png", link: "https://mythicdungeon.help" },
];

const getAllStatuses = () => {
    return new Promise<IProject[]>((res) => res(projectList));
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

const localApi: IApi = {
    getAllStatuses,
    checkProjectHealth,
};

export default localApi;
