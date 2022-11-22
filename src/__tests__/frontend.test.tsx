import React, { MouseEventHandler, createRef } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Button from "../globalComponents/Button";
import NavLink from "../globalComponents/NavLink";

jest.mock("../lib/customHooks", () => ({
    __esModule: true,
    useTypedSelector: () => false
}));

jest.mock("next/router", () => ({
    __esModule: true,
    useRouter: () => history
}));

let conteiner: HTMLDivElement | null = null;

beforeEach(() => {
    conteiner = document.createElement("div");
    document.body.appendChild(conteiner);
});

afterEach(() => {
    if ( conteiner ) {
        unmountComponentAtNode(conteiner);
        conteiner.remove();
        conteiner = null;
    }
});

test("Button", () => {
    const onClick: MouseEventHandler<HTMLButtonElement> = (event) => event.currentTarget;
    const mockOnClick = jest.fn(onClick);

    act(() => {
        render(
        <Button startColor="green" onClick={mockOnClick}>
            Click me
        </Button>,
        conteiner);
    });

    const button = document.querySelector("button") as HTMLButtonElement;
    expect(button.textContent).toBe("Click me");
    expect(button.classList.contains("green")).toBeTruthy();

    const mouseEvent = new MouseEvent("click", { bubbles: true });

    act(() => {
        button.dispatchEvent(mouseEvent);
    });

    expect(mockOnClick).toBeCalledTimes(1);
    expect(mockOnClick.mock.results.at(0)?.value).toEqual(button);

    act(() => {
        Array.from({length: 3}).forEach(() => button.dispatchEvent(mouseEvent));
    });

    expect(mockOnClick).toBeCalledTimes(4);
    expect(mockOnClick.mock.results.at(3)?.value).toEqual(button);
});

test("NavLink", () => {
    const imgRef = createRef<HTMLImageElement>();

    act(() => {
        render(
            <NavLink href="/home" className="test">Home</NavLink>,
            conteiner
        );
    });

    const link = document.querySelector(".test") as HTMLAnchorElement;

    expect(link.href).toMatch(/home/);
    expect(link.className).toBe("test");
    expect(link.textContent).toBe("Home");
});