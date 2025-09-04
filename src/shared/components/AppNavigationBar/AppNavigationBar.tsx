import type { FC } from "react";

import "./AppNavigationBar.scss";
import AppButton from "@components/AppButton";
import { ButtonType } from "@components/AppButton/types";

const AppNavigationBar: FC = () => {
  return (
    <div className="navigation-wrapper">
      <div className="navigation-container">
        <div className="navigation-left">
          <img className="app-logo" src="nightmare_logo_v2.png" alt="logo" />
        </div>
        <div className="navigation-right">
          <AppButton
            text="Log in"
            style={ButtonType.light}
            clickHandler={() => alert("Currently unavailable!")}
          />
        </div>
      </div>
    </div>
  );
};

export default AppNavigationBar;

