import type { FC } from "react";

import "./AppButton.scss";
import type { ButtonType } from "./types";

interface IProps {
    text: string;
    style: ButtonType;
}

const AppButton: FC<IProps> = ({ text, style }) => {
    return <div className={`app-button ${style}`}>
        { text }
    </div>
};

export default AppButton;
