import React from "react";

import styles from "./AppHero.module.scss";

export type HeroProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

const AppHero: React.FC<HeroProps> = ({ title, subtitle, className }) => {
  return (
    <section className={[styles.hero, className].filter(Boolean).join(" ")}>
      <h1 className={styles.glitch} data-text={title}>
        {title}
      </h1>
      {subtitle ? <p className={styles.sub}>{subtitle}</p> : null}
    </section>
  );
};

export default AppHero;
