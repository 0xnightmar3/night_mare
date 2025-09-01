import type { IProject } from "../../types.ts";

export type IApi = {
    getAllStatuses: () => Promise<IProject[]>;
    checkProjectHealth: (api: IProject) => Promise<{ ok: boolean }>;
};
