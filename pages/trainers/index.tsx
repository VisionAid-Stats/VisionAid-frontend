import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import {
  Box,
  Container,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { API_PATH } from "../../common";

const Page: NextPage = () => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    fetch(`${API_PATH}/trainer/get_all`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  return (
    <Container>
      <Box>
        <Heading size="l">List of trainers</Heading>
      </Box>

      <Table>
        <Thead>
          <Tr>
            <Th>Trainer ID</Th>
            <Th>Trainer Name</Th>
            <Th>Email</Th>
            <Th>Location</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((trainer, index) => {
            return (
              <Tr key={index}>
                <Td>{trainer.trainer_id}</Td>
                <Td>{trainer.name}</Td>
                <Td>{trainer.email}</Td>
                <Td>{trainer.location || "?"}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Container>
  );
};

export default Page;
