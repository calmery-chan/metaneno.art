import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import axios from "~/utils/axios";
import { AxiosError } from "axios";
import { Page } from "~/components/Page";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";

const SignIn: React.FC = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaResponse, setRecaptchaResponse] = useState("");

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
      await axios.post<null>("/admin", {
        name,
        password,
        "g-recaptcha-response": recaptchaResponse,
      });
      router.back();
    } catch (error) {
      setErrorMessage((error as AxiosError).message);
    }
  }, [name, password, recaptchaResponse]);

  useEffect(() => {
    (async () => {
      try {
        await axios.get("/admin");
        router.back();
      } catch (_) {} // eslint-disable-line no-empty
    })();
  }, []);

  return (
    <Page>
      <GoogleReCaptcha onVerify={setRecaptchaResponse} />
      <div className="flex justify-center">
        <div>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={name}
                onChange={handleOnChangeName}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                value={password}
                onChange={handleOnChangePassword}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={handleOnClickSignInButton}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign In
              </button>
            </div>
          </form>
          {errorMessage && (
            <p className="text-red-500 text-xs text-center mt-4 italic">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </Page>
  );
};

export default SignIn;
