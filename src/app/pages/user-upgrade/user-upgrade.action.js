import paths from "@/app/routes/paths";
import actionServiceHandler from "@/lib/actionServiceHandler";
import authService from "@/services/auth.service";
import { redirect } from "react-router-dom";

const userUpgradeAction = async ({ request }) => {
  const { token } = authService.getAuthData();
  const formData = await request.formData();
  const body = {
    author_password: formData.get("author_password"),
  };

  return actionServiceHandler(async () => {
    await authService.upgradeUser(body, token);
    return redirect(paths.home.path);
  });
};

export default userUpgradeAction;
