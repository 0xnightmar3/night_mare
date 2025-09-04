import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { ButtonType } from "../types";
import AppButton, { type IProps } from "../AppButton";

const TEXT = "Hello World!";

const defaultProps: IProps = {
  text: TEXT,
  style: ButtonType.dark,
  clickHandler: vi.fn(),
};

const setup = (override: Partial<IProps> = {}) => {
  const clickFn = vi.fn();
  const props = { ...defaultProps, clickHandler: clickFn, ...override };
  const user = userEvent.setup();
  render(<AppButton {...props} />);
  const btn = screen.getByRole("button");

  return { clickFn, user, btn };
};

describe("<AppButton />", () => {
  it("renders a button with given text", () => {
    const { btn } = setup();
    const textRegex = new RegExp(`^${TEXT}$`);
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent(textRegex);
  });

  it("applies the provided style class", () => {
    const { btn } = setup();
    expect(btn).toHaveClass(ButtonType.dark);
    expect(btn).not.toHaveClass(ButtonType.light);
    expect(btn).toHaveClass("app-button");
  });

  it("calls click handler on mouse click", async () => {
    const { clickFn, user, btn } = setup();
    expect(clickFn).not.toBeCalled();
    await user.click(btn);
    expect(clickFn).toBeCalledTimes(1);
  });

  it("is focusable for accessibility", () => {
    const { btn } = setup();
    btn.focus();
    expect(btn).toHaveFocus();
  });

  it("is clickable by enter or space for accessibility", async () => {
    const { btn, user, clickFn } = setup();
    btn.focus();

    await user.keyboard("{Enter}");
    await user.keyboard(" ");

    expect(clickFn).toHaveBeenCalledTimes(2);
  });
});
