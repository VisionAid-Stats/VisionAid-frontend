import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Navbar } from "../../components/Navbar";
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
import { InfoIcon } from "@chakra-ui/icons";

import { API_PATH } from "../../common";

const Root = styled.div`
  height: 100vh;
`;

const ImageLinkWrapper = styled.div`
  svg {
    cursor: pointer;
  }
`;

const Trainers: NextPage = () => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    fetch(`${API_PATH}/trainer/get_all`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  return (
    <Root>
      <Navbar />
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
    </Root>
  );
};

export default Trainers;
