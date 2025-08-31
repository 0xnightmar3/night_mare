import type { FC } from "react";

import "./AppButton.scss";
import type { ButtonType } from "./types";

interface IProps {
    text: string;
    style: ButtonType;
    clickHandler: () => void;
}

const AppButton: FC<IProps> = ({ text, style, clickHandler }) => {
    return <button className={`app-button ${style}`} onClick={ clickHandler }>
        { text }
    </button>
};

export default AppButton;
