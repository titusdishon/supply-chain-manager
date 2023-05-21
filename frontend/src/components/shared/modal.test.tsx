import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./modal";

describe("Modal", () => {
  it('renders modal content and closes when "Close" button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <h2>Modal Content</h2>
        <p>This is the content of the modal.</p>
      </Modal>
    );

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
    expect(
      screen.getByText("This is the content of the modal.")
    ).toBeInTheDocument();

    const closeButton = screen.getByText("Close");
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });

  it("does not render modal content when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <h2>Modal Content</h2>
        <p>This is the content of the modal.</p>
      </Modal>
    );

    expect(screen.queryByText("Modal Content")).toBeNull();
    expect(screen.queryByText("This is the content of the modal.")).toBeNull();
  });
});
