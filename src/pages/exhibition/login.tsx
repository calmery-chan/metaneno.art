import { NextPage } from "next";
import React, { useCallback } from "react";
import { useOkusuriLand } from "~/utils/okusuri.land";

const ExhibitionLogin: NextPage = () => {
  const { authenticate, isProcessing, profile } = useOkusuriLand();

  const handleClickLoginButton = useCallback(() => {
    authenticate();
  }, []);

  if (isProcessing) {
    return <div>処理中...</div>;
  }

  if (profile) {
    return <div>{profile.name}</div>;
  }

  return (
    <>
      <button onClick={handleClickLoginButton}>Log In</button>
    </>
  );
};

export default ExhibitionLogin;
