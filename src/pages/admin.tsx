import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { withAdmin } from "~/utils/with-admin";

const Admin: NextPage = () => {
  return <Link href="/admin/serial_codes">Serial Codes</Link>;
};

export default withAdmin(Admin);
