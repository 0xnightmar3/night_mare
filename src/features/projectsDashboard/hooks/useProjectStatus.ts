import { useState, useEffect, useRef } from "react";

import { type IProject } from "../types";
import { checkProjectStatusList, fetchProjectList } from "../services/projectStatusService";

const useProjectStatus = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projectList, setProjectList] = useState<IProject[]>([]);
  const projectListRef = useRef<IProject[]>([]);

  useEffect(() => { projectListRef.current = projectList }, [projectList]);

  useEffect(() => {
    const fetchStatuses = async (projectList: IProject[]) => {
        if (projectList.length < 1) return;
        try {
            const projectListStatuses = await checkProjectStatusList(projectList);
            setProjectList(projectListStatuses);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchProjects = async () => {
        setIsLoading(true);
        const remoteProjectList = await fetchProjectList();
        setProjectList(remoteProjectList);
        fetchStatuses(remoteProjectList);
        setIsLoading(false);
    };

    fetchProjects();

    const id = setInterval(() => fetchStatuses(projectListRef.current), 10000);

    return () => {
        () => clearInterval(id);
    };
  }, []);

  return {
    projectList,
    isLoading,
  };
};

export default useProjectStatus;
