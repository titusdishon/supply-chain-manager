import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "./sidebar";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));
describe("Sidebar", () => {
  test("renders sidebar menu items", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    // Sidebar menu items
    const sidebarItems = screen.getAllByRole("listitem");

    expect(sidebarItems).toHaveLength(6);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Orders")).toBeInTheDocument();
    expect(screen.getByText("Inventory")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("navigates to the correct path when a menu item is clicked", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("Products"));
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/home/products");
    fireEvent.click(screen.getByText("Logout"));
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/login");
  });

  test("logs out and clears local storage when the Logout menu item is clicked", () => {
    const clearMock = jest.fn();
    Object.defineProperty(window, "localStorage", {
      value: {
        clear: clearMock,
      },
      writable: true,
    });

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Logout"));
    expect(clearMock).toHaveBeenCalled();
  });

  test("toggles the sidebar open and closed when the arrow icon is clicked", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    expect(screen.getByTestId("sidebar")).toHaveClass("w-72");
    fireEvent.click(screen.getByTestId("arrow-icon"));
    expect(screen.getByTestId("sidebar")).toHaveClass("w-20");
    fireEvent.click(screen.getByTestId("arrow-icon"));
    expect(screen.getByTestId("sidebar")).toHaveClass("w-72");
  });
});
