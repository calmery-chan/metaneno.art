import React from "react";
import { useI18n } from "~/utils/i18n";

const Dummy = () => {
  const { t } = useI18n();

  return <p>{t("message")}</p>;
};

export default Dummy;
