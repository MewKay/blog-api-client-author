import { useState } from "react";
import { Form, useNavigation } from "react-router-dom";
import Input from "@/components/input/input";
import loginSchema from "@/lib/validation/schema/login-schema";
import ranges from "@/lib/validation/ranges";
import Button from "@/components/button/button";

const LoginForm = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { errors, isFormValid } = loginSchema.validateInputs({
    username,
    password,
  });

  const isSubmitting = navigation.state !== "idle";
  const isButtonDisabled = !isFormValid || isSubmitting;

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
      >
        Password
      </Input>

      <Button
        colorScheme={"dark"}
        disabled={isButtonDisabled}
        type="submit"
        name="intent"
        value="login"
      >
        {!isSubmitting ? "Log in" : "Logging in"}
      </Button>
    </Form>
  );
};

export default LoginForm;
