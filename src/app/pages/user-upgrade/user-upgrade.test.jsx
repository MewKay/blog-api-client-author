import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import setupPageRender from "@/testing/utils/setupPageRender";
import routes from "@/app/routes/routes";
import paths from "@/app/routes/paths";
import authService from "@/services/auth.service";
import mockAuthor from "@/testing/mocks/author";
import authorService from "@/services/author.service";
import mockLimitStatus from "@/testing/mocks/limit-status";
import postService from "@/services/post.service";

vi.mock("@/app/pages/home/home");
vi.mock("@/services/auth.service", () => ({
  default: {
    getAuthData: vi.fn(),
    upgradeUser: vi.fn(),
  },
}));

const mockInputValue = "letmeiiin";
const mockUser = {
  ...mockAuthor,
  is_author: false,
};
const mockToken = "thisistoken";

const setup = async () => {
  const user = userEvent.setup();
  setupPageRender(routes, [paths.userUpgrade.path]);

  const authPassInput = await screen.findByLabelText(/authorization pass/i);
  const submitButton = await screen.findByRole("button", { name: /confirm/i });

  return {
    user,
    authPassInput,
    submitButton,
  };
};

describe("UserUpgrade page", () => {
  beforeEach(() => {
    authService.getAuthData.mockReturnValue({
      user: mockUser,
      token: mockToken,
    });
    authService.upgradeUser.mockResolvedValue({
      user: mockAuthor,
      token: mockToken,
    });
    authorService.getLimitStatus = vi.fn().mockResolvedValue(mockLimitStatus);
    postService.getAuthorPosts = vi.fn().mockResolvedValue(mockLimitStatus);
  });

  it("should be able to type on auth pass input", async () => {
    const { user, authPassInput } = await setup();
    await user.type(authPassInput, mockInputValue);

    expect(authPassInput).toHaveValue(mockInputValue);
  });

  it("calls upgradeUser service with input then redirect to home page", async () => {
    const { user, authPassInput, submitButton } = await setup();
    await user.type(authPassInput, mockInputValue);
    await user.click(submitButton);

    expect(authService.upgradeUser).toHaveBeenNthCalledWith(
      1,
      {
        author_password: mockInputValue,
      },
      mockToken,
    );

    const homeText = await screen.findByText("This is home");
    expect(homeText).toBeInTheDocument();
  });
});
