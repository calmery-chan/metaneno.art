import React from "react";
import { Example } from "~/components/Example";
import { useI18n } from "~/utils/i18n";

const Dummy = () => {
  const { t } = useI18n();

  return (
    <>
      <p>{t("message")}</p>
      <Example />
    </>
  );
};

export default Dummy;
