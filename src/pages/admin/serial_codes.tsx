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
              <Th>公開状態</Th>
              <Th>作成日時</Th>
              <Th>最終更新日時</Th>
            </Tr>
          </Thead>
          <Tbody>
            {serialCodes.map((serialCode, key) => (
              <Tr key={key}>
                <Td>
                  <p className="text-gray-900 whitespace-no-wrap">
                    {serialCode.serial_code}
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
