import type { FC } from "react";
import type { IProject } from "../../types.ts";

import "./ProjectStatusSingle.scss";

interface IProps {
    project: IProject;
}

const ProjectStatusSingle: FC<IProps> = ({ project }) => {
    return <a href={project.link} target="_blank">
        <div className="status">
            <div className="status-description">
                <img className="satus-icon" src={project.icon} alt="icon" />
                <div className="status-title">
                { project.name }
                </div>
            </div>
            <div className={ `status-indicator ${project.isUp ? 'up' : 'down'}` } />
        </div>
    </a>
};

export default ProjectStatusSingle;
