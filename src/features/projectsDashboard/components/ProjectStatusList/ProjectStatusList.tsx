import { type FC } from "react";

import "./ProjectStatusList.scss";
import useProjectStatus from "../../hooks/useProjectStatus";
import ProjectStatusSingle from "../ProjectStatusSingle/ProjectStatusSingle";

const ProjectStatusList: FC = () => {
  const { projectList, isLoading } = useProjectStatus();

  return <div className="status-list-wrapper">
    <h1 className="status-list-title">
      <span className="gradient-yellow">List of projects </span>
      <span className="text-small superscript no-break">[and their uptime status]</span>
    </h1>
    <div className="status-list-container">
      { isLoading
        ? <h1 className="loading">Loading...</h1>
        : projectList.map(project => 
            <ProjectStatusSingle project={project} key={project.url} />
          )
      }
    </div>
  </div>
};

export default ProjectStatusList;
