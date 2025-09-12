import { useState } from "react";
import { Form } from "react-router-dom";
import Input from "@/components/input/input";
import loginSchema from "@/lib/validation/schema/login-schema";
import ranges from "@/lib/validation/ranges";
import Button from "@/components/button/button";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { errors, isFormValid } = loginSchema.validateInputs({
    username,
    password,
  });

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

      <Button disabled={!isFormValid}>Log in</Button>
    </Form>
  );
};

export default LoginForm;
