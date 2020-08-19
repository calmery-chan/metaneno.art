import React, { useCallback, useState } from "react";
import axios from "~/utils/axios";
import { AxiosError } from "axios";

const SignIn: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleOnChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setName(event.currentTarget.value),
    []
  );

  const handleOnChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setPassword(event.currentTarget.value),
    []
  );

  const handleOnClickSignInButton = useCallback(async () => {
    try {
      await axios.post<null>("/admin", { name, password });
    } catch (error) {
      setErrorMessage((error as AxiosError).message);
    }
  }, [name, password]);

  return (
    <>
      {errorMessage && <div>{errorMessage}</div>}
      <input type="text" value={name} onChange={handleOnChangeName} />
      <input
        type="password"
        value={password}
        onChange={handleOnChangePassword}
      />
      <button onClick={handleOnClickSignInButton}>Sign In</button>
    </>
  );
};

export default SignIn;
