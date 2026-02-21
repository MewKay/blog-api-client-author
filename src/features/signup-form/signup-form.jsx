import Button from "@/components/button/button";
import Input from "@/components/input/input";
import ranges from "@/lib/validation/ranges";
import signUpSchema from "@/lib/validation/schema/signup-schema";
import { useState } from "react";
import { Form, useNavigation } from "react-router-dom";

const WRITER_PASS_LINK = import.meta.env.VITE_AUTHOR_PASS_LINK;

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authorPassword, setAuthorPassword] = useState("");
  const [isAuthPassFocused, setIsAuthPassFocused] = useState(false);
  const navigation = useNavigation();

  const { errors, isFormValid } = signUpSchema.validateInputs({
    username,
    password,
    confirm_password: confirmPassword,
    author_password: authorPassword,
  });

  const isSubmitting = navigation.state !== "idle";
  const isButtonDisabled = !isFormValid || isSubmitting;

  const handleAuthPassFocus = () => {
    setIsAuthPassFocused(true);
  };

  const handleAuthPassBlur = () => {
    setIsAuthPassFocused(false);
  };

  const authorPasswordLabelClassName = isAuthPassFocused
    ? "author-password-label focused"
    : "author-password-label";
  const authorPassordLinkClassName = isAuthPassFocused
    ? "author-password-link"
    : "author-password-link hidden";

  return (
    <Form method="post">
      <Input
        type="text"
        name="username"
        value={username}
        setValue={setUsername}
        errorMessage={errors.username}
        minLength={ranges.username.min}
        maxLength={ranges.username.max}
        required
      >
        Username
      </Input>

      <Input
        type="password"
        name="password"
        value={password}
        setValue={setPassword}
        errorMessage={errors.password}
        minLength={ranges.password.min}
        maxLength={ranges.password.max}
        required
      >
        Password
      </Input>

      <Input
        type="password"
        name="confirm_password"
        value={confirmPassword}
        setValue={setConfirmPassword}
        errorMessage={errors.confirm_password}
        minLength={ranges.password.min}
        maxLength={ranges.password.max}
        required
      >
        Confirm Password
      </Input>

      <Input
        type="password"
        name="author_password"
        value={authorPassword}
        setValue={setAuthorPassword}
        errorMessage={errors.author_password}
        onFocus={handleAuthPassFocus}
        onBlur={handleAuthPassBlur}
        required
      >
        <p className={authorPasswordLabelClassName}>Authorization Pass</p>
        <p className={authorPassordLinkClassName}>
          This field requires the writer password. Retrieve it{" "}
          <a href={WRITER_PASS_LINK} target="_blank" rel="noopener noreferrer">
            here
          </a>
          .
        </p>
      </Input>

      <Button
        colorScheme={"dark"}
        disabled={isButtonDisabled}
        type="submit"
        name="intent"
        value="login"
      >
        {!isSubmitting ? "Sign Up" : "Signing Up..."}
      </Button>
    </Form>
  );
};

export default SignUpForm;
