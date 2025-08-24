import { beforeEach, describe, expect, it, vi } from "vitest";
import setupPageRender from "@/testing/utils/setupPageRender";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import testInputTyping from "@/testing/utils/testInputTyping";
import paths from "@/app/routes/paths";
import routes from "@/app/routes/routes";
import authService from "@/services/auth.service";
import AuthError from "@/lib/errors/auth.error";

vi.mock("../login/login.jsx");
vi.mock("@/services/auth.service", () => ({
  default: {
    signup: vi.fn(),
  },
}));

const mockInputValue = {
  username: "JohnJohn",
  password: "wordpass",
  confirm_password: "wordpass",
  author_password: "thisisapass",
};
const routeEntries = [paths.signup.path];

const setup = () => {
  const user = userEvent.setup();
  setupPageRender(routes, routeEntries);

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/^password$/i);
  const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
  const authorPasswordInput = screen.getByLabelText(/authorization pass/i);
  const submitButton = screen.getByRole("button", { name: /sign up/i });
  const loginLink = screen.getByRole("link", { name: /log in/i });

  return {
    user,
    usernameInput,
    passwordInput,
    confirmPasswordInput,
    authorPasswordInput,
    submitButton,
    loginLink,
  };
};

describe("Sign up page", () => {
  describe("Sign up form", () => {
    beforeEach(() => vi.clearAllMocks());

    testInputTyping(
      [
        {
          inputName: "username",
          inputLabel: /username/i,
          inputValue: mockInputValue.username,
        },
        {
          inputName: "password",
          inputLabel: /^password$/i,
          inputValue: mockInputValue.password,
        },
        {
          inputName: "confirm_password",
          inputLabel: /confirm password/i,
          inputValue: mockInputValue.confirm_password,
        },
        {
          inputName: "author_password",
          inputLabel: /authorization pass/i,
          inputValue: mockInputValue.author_password,
        },
      ],
      routeEntries,
    );

    it("should call auth service sign up and redirect to login page", async () => {
      const {
        user,
        usernameInput,
        passwordInput,
        confirmPasswordInput,
        authorPasswordInput,
        submitButton,
      } = setup();

      await user.type(usernameInput, mockInputValue.username);
      await user.type(passwordInput, mockInputValue.password);
      await user.type(confirmPasswordInput, mockInputValue.confirm_password);
      await user.type(authorPasswordInput, mockInputValue.author_password);

      await user.click(submitButton);

      expect(authService.signup).toHaveBeenCalledWith(mockInputValue);

      const loginText = await screen.findByText(/This is login page/);

      expect(loginText).toBeInTheDocument();
    });

    it("should display one or many error message for any problem occuring during api call", async () => {
      const errorMessages = [
        "Username is invalid",
        "Password is too weak",
        "Password are not matching",
      ];

      authService.signup.mockImplementationOnce(() => {
        throw new AuthError({ error: errorMessages });
      });
      const {
        user,
        usernameInput,
        passwordInput,
        confirmPasswordInput,
        authorPasswordInput,
        submitButton,
      } = setup();

      await user.type(usernameInput, mockInputValue.username);
      await user.type(passwordInput, mockInputValue.password);
      await user.type(confirmPasswordInput, mockInputValue.confirm_password);
      await user.type(authorPasswordInput, mockInputValue.author_password);
      await user.click(submitButton);

      expect(authService.signup).toHaveBeenCalledWith(mockInputValue);

      for (let message of errorMessages) {
        const errorText = await screen.findByText(message);
        expect(errorText).toBeInTheDocument();
      }
    });

    it("should not be able to submit if form is invalid", async () => {
      const {
        user,
        usernameInput,
        passwordInput,
        confirmPasswordInput,
        authorPasswordInput,
        submitButton,
      } = setup();

      await user.type(usernameInput, mockInputValue.username);
      await user.type(passwordInput, mockInputValue.password);
      await user.type(confirmPasswordInput, "not matching password");
      await user.type(authorPasswordInput, "thisisnotapass");

      await user.click(submitButton);

      expect(authService.signup).not.toHaveBeenCalledWith(mockInputValue);

      const loginText = screen.queryByText(/This is log in page/);

      expect(loginText).not.toBeInTheDocument();
    });
  });

  it("display link to log in", async () => {
    const { user, loginLink } = setup();

    await user.click(loginLink);
    const loginText = await screen.findByText("This is login page");

    expect(loginText).toBeInTheDocument();
  });
});
