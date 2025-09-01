import React from "react";
import styles from "./ProjectCard.module.scss";
import type { IProject } from "@features/projectsDashboard/types";

export type ProjectCardProps = {
  project: IProject;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <a href={project.link} target="_blank">
        <div
        className={[
            styles.card,
            `${project.isUp ? "up" : "down"}`
        ].filter(Boolean).join(" ")}
        >
        <div className={styles.chip}>
            <img className={styles.icon} src={project.icon} alt="Project Icon" />
            <div className={styles.status}>
            <span
                className={[
                styles.dot,
                project.isUp ? styles.on : styles.off,
                ].join(" ")}
            />
            <span className={styles.label}>
                { project.isUp ? "Online" : "Offline" }
            </span>
            </div>
        </div>
        <h3 className={styles.name}>{project.name}</h3>
        </div>
    </a>
  );
};

export default ProjectCard;
