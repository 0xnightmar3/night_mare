import type { IProject } from "../../types";

export type IApi = {
    getAllStatuses: () => Promise<IProject[]>;
    checkProjectHealth: (api: IProject) => Promise<{ ok: boolean }>;
};
