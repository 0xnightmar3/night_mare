import React from "react";
import styles from "./AppFeatures.module.scss";

export type FeatureItem = {
  title: string;
  description: string;
};

export type FeaturesProps = {
  items: FeatureItem[];
};

const AppFeatures: React.FC<FeaturesProps> = ({ items }) => {
  return (
    <section className={[styles.features].filter(Boolean).join(" ")}>
      <div className={styles.grid}>
        {items.map((f, idx) => (
          <div className={styles.card} key={idx}>
            <h3>{f.title}</h3>
            <p>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AppFeatures;
