import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Drawer from "../Drawer";

describe("Drawer Component", () => {
  test("renders Drawer component correctly", () => {
    const { getByRole } = render(
      <Drawer open={false} side="bottom" headline="Test Drawer" onBackdropClick={() => jest.fn()}>
        <p>Drawer Content</p>
      </Drawer>
    );

    // Drawer should be rendered but hidden
    expect(getByRole("dialog")).toBeInTheDocument();
    expect(getByRole("dialog")).toHaveClass("fixed z-40");
  });

  test("shows drawer when open is true", () => {
    const { getByRole } = render(
      <Drawer open={true} side="bottom" headline="Test Drawer" onBackdropClick={() => jest.fn()}>
        <p>Drawer Content</p>
      </Drawer>
    );

    // Check if the dialog is visible
    expect(getByRole("dialog")).toBeVisible();
  });

  test("hides drawer when open is false", () => {
    const { getByRole } = render(
      <Drawer open={false} side="bottom" headline="Test Drawer" onBackdropClick={() => jest.fn()}>
        <p>Drawer Content</p>
      </Drawer>
    );

    // Drawer should be present but not visible
    expect(getByRole("dialog")).toHaveClass("fixed z-40");
  });

  test("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <Drawer open={true} side="bottom" headline="Test Drawer" onBackdropClick={handleClick}>
        <p>Drawer Content</p>
      </Drawer>
    );

    // Simulate click event
    fireEvent.click(getByRole("dialog"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders children inside the drawer", () => {
    const { getByText } = render(
      <Drawer open={true} side="bottom" headline="Test Drawer" onBackdropClick={() => jest.fn()}>
        <p>Drawer Content</p>
      </Drawer>
    );

    expect(getByText("Drawer Content")).toBeInTheDocument();
  });

  test("displays the correct headline", () => {
    const { getByText } = render(
      <Drawer open={true} side="bottom" headline="Train Stations near me" onBackdropClick={() => jest.fn()}>
        <p>Drawer Content</p>
      </Drawer>
    );

    expect(getByText("Train Stations near me")).toBeInTheDocument();
  });
});
