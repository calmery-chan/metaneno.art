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
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.5 11.4545C15.5 11.6761 15.4196 11.8679 15.2588 12.0298L9.57129 17.7571C9.41048 17.919 9.22005 18 9 18C8.77995 18 8.58952 17.919 8.42871 17.7571L2.74121 12.0298C2.5804 11.8679 2.5 11.6761 2.5 11.4545C2.5 11.233 2.5804 11.0412 2.74121 10.8793C2.90202 10.7173 3.09245 10.6364 3.3125 10.6364H14.6875C14.9076 10.6364 15.098 10.7173 15.2588 10.8793C15.4196 11.0412 15.5 11.233 15.5 11.4545ZM15.5 6.54545C15.5 6.76705 15.4196 6.95881 15.2588 7.12074C15.098 7.28267 14.9076 7.36364 14.6875 7.36364H3.3125C3.09245 7.36364 2.90202 7.28267 2.74121 7.12074C2.5804 6.95881 2.5 6.76705 2.5 6.54545C2.5 6.32386 2.5804 6.1321 2.74121 5.97017L8.42871 0.242898C8.58952 0.0809659 8.77995 0 9 0C9.22005 0 9.41048 0.0809659 9.57129 0.242898L15.2588 5.97017C15.4196 6.1321 15.5 6.32386 15.5 6.54545Z" />
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
