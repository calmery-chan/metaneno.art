import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import { Header } from "~/components/Header";
import { Page } from "~/components/Page";
import { Table, Tbody, Td, Th, Thead, Tr } from "~/components/Table";
import { withBasicAuth } from "~/utils/with-basic-auth";

// Helper Functions

const getSerialCodes = (): Promise<{ data: SerialCode[] }> => {
  const headers = {
    Authorization: "Bearer secret",
    "Content-Type": "application/json",
  };

  return fetch("http://localhost:5000/admin/serial_codes", {
    headers,
  }).then((r) => r.json());
};

const formatSerialCode = (serialCode: string) => {
  if (serialCode.length !== 16) {
    return serialCode;
  }

  return [...serialCode.matchAll(/\w{4}/g)].map((s) => s[0]).join("-");
};

// Components

const SortableColumnTitle: React.FC = ({ children }) => (
  <div className="cursor-pointer flex items-center">
    {children}
    <svg
      className="ml-auto fill-current"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.1254 8.90909C12.1254 9.08144 12.0625 9.23059 11.9365 9.35653L7.4823 13.8111C7.35636 13.937 7.20723 14 7.03489 14C6.86255 14 6.71342 13.937 6.58748 13.8111L2.13324 9.35653C2.00731 9.23059 1.94434 9.08144 1.94434 8.90909C1.94434 8.73674 2.00731 8.58759 2.13324 8.46165C2.25918 8.3357 2.40832 8.27273 2.58066 8.27273H11.4891C11.6615 8.27273 11.8106 8.3357 11.9365 8.46165C12.0625 8.58759 12.1254 8.73674 12.1254 8.90909ZM12.1254 5.09091C12.1254 5.26326 12.0625 5.41241 11.9365 5.53835C11.8106 5.6643 11.6615 5.72727 11.4891 5.72727H2.58066C2.40832 5.72727 2.25918 5.6643 2.13324 5.53835C2.00731 5.41241 1.94434 5.26326 1.94434 5.09091C1.94434 4.91856 2.00731 4.76941 2.13324 4.64347L6.58748 0.18892C6.71342 0.0629735 6.86255 0 7.03489 0C7.20723 0 7.35636 0.0629735 7.4823 0.18892L11.9365 4.64347C12.0625 4.76941 12.1254 4.91856 12.1254 5.09091Z" />
    </svg>
  </div>
);

// Types

type SerialCode = {
  id: number;
  serial_code: string;
  state: "created" | "allowed" | "denied";
  created_at: string;
  updated_at: string;
};

const SerialCodes: React.FC = () => {
  const [serialCodes, setSerialCodes] = useState<SerialCode[]>();

  useEffect(() => {
    (async () => {
      const { data } = await getSerialCodes();

      setSerialCodes(data);
    })();
  }, []);

  if (!serialCodes) {
    return <div>Loading</div>;
  }

  return (
    <Page>
      <Header>Serial Codes</Header>
      <div className="shadow rounded mt-8">
        <Table>
          <Thead>
            <Tr>
              <Th>シリアルコード</Th>
              <Th>
                <SortableColumnTitle>公開状態</SortableColumnTitle>
              </Th>
              <Th>
                <SortableColumnTitle>作成日時</SortableColumnTitle>
              </Th>
              <Th>
                <SortableColumnTitle>最終更新日</SortableColumnTitle>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {serialCodes.map((serialCode, key) => (
              <Tr key={key}>
                <Td>
                  <p className="text-gray-900 whitespace-no-wrap">
                    {formatSerialCode(serialCode.serial_code)}
                  </p>
                </Td>
                <Td>
                  <span
                    className={`relative inline-block px-3 py-1 font-semibold text-${
                      { created: "blue", allowed: "green", denied: "red" }[
                        serialCode.state
                      ]
                    }-900 leading-tight`}
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-0 bg-${
                        { created: "blue", allowed: "green", denied: "red" }[
                          serialCode.state
                        ]
                      }-200 opacity-50 rounded-full`}
                    ></span>
                    <span className="relative">Created</span>
                  </span>
                </Td>
                <Td>
                  <p className="text-gray-900 whitespace-no-wrap">
                    {format(
                      new Date(serialCode.created_at),
                      "yyyy/MM/dd hh:mm"
                    )}
                  </p>
                </Td>
                <Td>
                  <p className="text-gray-900 whitespace-no-wrap">
                    {format(
                      new Date(serialCode.updated_at),
                      "yyyy/MM/dd hh:mm"
                    )}
                  </p>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </Page>
  );
};

export default SerialCodes;
export const getServerSideProps = withBasicAuth();
