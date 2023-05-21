import React from "react";
import { render, screen } from "@testing-library/react";
import { InfoAlert, ErrorAlert, SuccessAlert } from "./alerts";

describe("Alerts", () => {
  test("renders InfoAlert component with the correct message", () => {
    const message = "This is an info alert";
    render(<InfoAlert message={message} />);
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toHaveTextContent(message);
    expect(alertElement).toHaveClass(
      "p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
    );
  });

  test("renders ErrorAlert component with the correct message", () => {
    const message = "This is an error alert";
    render(<ErrorAlert message={message} />);
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toHaveTextContent(message);
    expect(alertElement).toHaveClass(
      "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
    );
  });

  test("renders SuccessAlert component with the correct message", () => {
    const message = "This is a success alert";
    render(<SuccessAlert message={message} />);
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toHaveTextContent(message);
    expect(alertElement).toHaveClass(
      "p-4 mb-4 text-sm text-white rounded-lg bg-green-800"
    );
  });
});
