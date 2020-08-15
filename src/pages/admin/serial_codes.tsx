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
      <path
        d="M12.5 5.33333C12.5 5.51389 12.432 5.67014 12.2959 5.80208C12.1598 5.93403 11.9987 6 11.8125 6H2.1875C2.0013 6 1.84017 5.93403 1.7041 5.80208C1.56803 5.67014 1.5 5.51389 1.5 5.33333C1.5 5.15278 1.56803 4.99653 1.7041 4.86458L6.5166 0.197917C6.65267 0.0659722 6.8138 0 7 0C7.1862 0 7.34733 0.0659722 7.4834 0.197917L12.2959 4.86458C12.432 4.99653 12.5 5.15278 12.5 5.33333Z"
        className="text-gray-400"
      />
      <path d="M12.5 8.66667C12.5 8.84722 12.432 9.00347 12.2959 9.13542L7.4834 13.8021C7.34733 13.934 7.1862 14 7 14C6.8138 14 6.65267 13.934 6.5166 13.8021L1.7041 9.13542C1.56803 9.00347 1.5 8.84722 1.5 8.66667C1.5 8.48611 1.56803 8.32986 1.7041 8.19792C1.84017 8.06597 2.0013 8 2.1875 8H11.8125C11.9987 8 12.1598 8.06597 12.2959 8.19792C12.432 8.32986 12.5 8.48611 12.5 8.66667Z" />
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
