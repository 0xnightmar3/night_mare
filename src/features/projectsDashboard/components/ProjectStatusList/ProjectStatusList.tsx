import { type FC } from "react";

import "./ProjectStatusList.scss";
import AppHero from "@shared/components/AppHero";
import useProjectStatus from "../../hooks/useProjectStatus";
import AppFeatures from "@shared/components/AppFeatures/AppFeatures";
import type { FeatureItem } from "@shared/components/AppFeatures/AppFeatures";
import ProjectCard from "../ProjectCard";

const features: FeatureItem[] = [
  { title: "Real-Time", description: "Live status indicators with neon clarity." },
  { title: "Glitch Aesthetic", description: "Subtle scanlines and glow accents." },
];

const ProjectStatusList: FC = () => {
  const { projectList, isLoading } = useProjectStatus();

  return <div className="page status-list-wrapper">
    <AppHero title={`NightMare systems`} subtitle={`A minimalistic cyberpunk hub for my projects - with uptimes.`} />
    <AppFeatures items={features} />
    <h1 className="status-list-title">
      <span className="gradient-yellow">Projects </span>
      <span className="text-small superscript no-break">[and their uptime status]</span>
    </h1>
    <div className="status-list-container">
      { isLoading
        ? <h1 className="loading">Loading...</h1>
        : projectList.map(project => 
            <ProjectCard project={project} />
          )
      }
    </div>
  </div>
};

export default ProjectStatusList;
