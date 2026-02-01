import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import paths from "@/app/routes/paths";
import routes from "@/app/routes/routes";
import authService from "@/services/auth.service";
import setupPageRender from "@/testing/utils/setupPageRender";
import BadRequestError from "@/lib/errors/bad-request.error";
import mockAuthor from "@/testing/mocks/author";
import testInputTyping from "@/testing/utils/testInputTyping";
import { useNavigation } from "react-router-dom";

vi.mock("../home/home.jsx");
vi.mock("../user-redirect/user-redirect.jsx", () => ({
  default: () => <>This is user redirect</>,
}));
vi.mock("react-router-dom", async (importOriginal) => {
  const reactRouterDom = await importOriginal();

  return {
    ...reactRouterDom,
    useNavigation: vi.fn(),
  };
});
vi.mock("@/services/auth.service", () => ({
  default: {
    getAuthData: vi.fn(() => null),
    logout: vi.fn(),
    login: vi.fn(() => ({
      user: mockAuthor,
      token: "sometoken",
    })),
  },
}));
vi.mock("@/services/post.service", () => ({
  default: {
    getAuthorPosts: vi.fn(),
  },
}));

const mockInputValue = {
  username: "JohnSlam",
  password: "wordpass",
};
const routesEntries = [paths.login.path];

const setup = async () => {
  const user = userEvent.setup();
  const component = setupPageRender(routes, routesEntries);

  const usernameInput = await screen.findByLabelText(/username/i);
  const passwordInput = await screen.findByLabelText(/password/i);
  const submitButton = await screen.findByRole("button", { name: /log in/i });
  const signUpLink = await screen.findByRole("link", { name: /sign up/i });

  return {
    component,
    user,
    usernameInput,
    passwordInput,
    submitButton,
    signUpLink,
  };
};

describe("Log in page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useNavigation.mockReturnValue({ state: "idle" });
  });

  describe("Log in form", () => {
    testInputTyping(
      [
        {
          inputName: "username",
          inputLabel: /username/i,
          inputValue: mockInputValue.username,
        },
        {
          inputName: "password",
          inputLabel: /password/i,
          inputValue: mockInputValue.password,
        },
      ],
      [routesEntries],
    );

    it("should call auth service login and redirect to Home page on submit", async () => {
      authService.getAuthData
        .mockReturnValueOnce(false) // Log in loader call
        .mockReturnValueOnce({ user: mockAuthor }) // Layout loader call
        .mockReturnValueOnce({ user: mockAuthor }); // Home loader call
      const { user, usernameInput, passwordInput, submitButton } =
        await setup();

      await user.type(usernameInput, mockInputValue.username);
      await user.type(passwordInput, mockInputValue.password);
      await user.click(submitButton);

      expect(authService.login).toHaveBeenCalledWith(mockInputValue);

      const homeText = await screen.findByText(/This is home/);

      expect(homeText).toBeInTheDocument();
    });

    it("should display one or many error message for any problem occuring during api call", async () => {
      const errorMessages = ["Username is invalid", "Password is too weak"];

      authService.login.mockImplementationOnce(() => {
        throw new BadRequestError("Validation error", { error: errorMessages });
      });
      const { user, usernameInput, passwordInput, submitButton } =
        await setup();

      await user.type(usernameInput, mockInputValue.username);
      await user.type(passwordInput, mockInputValue.password);
      await user.click(submitButton);

      expect(authService.login).toHaveBeenCalledWith(mockInputValue);

      for (let message of errorMessages) {
        const errorText = await screen.findByText(message);
        expect(errorText).toBeInTheDocument();
      }
    });

    it("should redirect to user-redirect page if user is not an author and call logout auth service", async () => {
      authService.login.mockReturnValueOnce({
        user: {
          ...mockAuthor,
          is_author: false,
        },
        token: "usertoken",
      });

      const { user, usernameInput, passwordInput, submitButton } =
        await setup();

      await user.type(usernameInput, mockInputValue.username);
      await user.type(passwordInput, mockInputValue.password);
      await user.click(submitButton);

      expect(authService.login).toHaveBeenCalledWith(mockInputValue);
      expect(authService.logout).toHaveBeenCalled();

      const userRedirectText = await screen.findByText("This is user redirect");
      expect(userRedirectText).toBeInTheDocument();
    });

    it("should not let user submit form if it is invalid", async () => {
      const { user, usernameInput, submitButton } = await setup();

      await user.type(usernameInput, "Bot");
      await user.click(submitButton);

      expect(authService.login).not.toHaveBeenCalled();

      const homeText = screen.queryByText(/This is home/);

      expect(homeText).not.toBeInTheDocument();
    });

    it("should display a different label on button while submitting", async () => {
      const { component, submitButton } = await setup();
      expect(submitButton).toHaveTextContent(/log in/i);

      useNavigation.mockReturnValue({ state: "submitting" });
      component.rerender();

      const submittedButton = await screen.findByRole("button", {
        name: /logging in/i,
      });
      expect(submittedButton).toBeInTheDocument();
    });
  });
});
