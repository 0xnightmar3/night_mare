import type { IProject } from "../types";
import projectService from "../api/projectStatus";

export const checkProjectStatusList = async (projectList: IProject[]): Promise<IProject[]> => {
    const clonedProjectList = JSON.parse(JSON.stringify(projectList)) as IProject[];

    await Promise.all(clonedProjectList.map(async (project) => {
        try {
            const projectHealth = await projectService.checkProjectHealth(project);
            project.isUp = projectHealth.ok;
        } catch (e) {
            console.log(e);
            project.isUp = false;
        }
    }));

    return clonedProjectList;
};

export const fetchProjectList = async (): Promise<IProject[]> => {
    try {
        const projectList = await projectService.getAllStatuses();
        return projectList;
    } catch (e) {
        throw new Error("Failed fetching api list.");
    }
};
