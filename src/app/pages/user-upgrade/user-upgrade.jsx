import AuthorPasswordInput from "@/components/author-password-input/author-password-input";
import Button from "@/components/button/button";
import { useState } from "react";
import { Form } from "react-router-dom";

const UserUpgrade = () => {
  const [authorPassword, setAuthorPassword] = useState("");

  return (
    <main>
      <div>
        <Form method="post">
          <p>
            Please enter the author password to confirm and upgrade your account
            to a Writer.
          </p>

          <AuthorPasswordInput
            value={authorPassword}
            setValue={setAuthorPassword}
          />

          <Button colorScheme={"dark"}>Confirm</Button>
        </Form>
      </div>
    </main>
  );
};

export default UserUpgrade;
