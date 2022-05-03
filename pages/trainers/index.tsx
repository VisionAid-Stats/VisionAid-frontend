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

import { EditIcon } from "@chakra-ui/icons";

import { API_PATH, useAuth } from "../../common";
import { ImageLinkWrapper } from "../../components";

const Page: NextPage = () => {
  useAuth("ADMIN");
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    fetch(`${API_PATH}/trainer/get_all`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  return (
    <Container maxW={"90%"} maxH={"100%"} background={"white"}>
      <Box>
        <Heading size="l">List of trainers</Heading>
      </Box>

      <Table>
        <Thead>
          <Tr>
            <Th>Trainer Name</Th>
            <Th>Email</Th>
            <Th>Location</Th>
            <Th>State</Th>
            <Th>Qualifications</Th>
            <Th>Edit</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((trainer, index) => {
            return (
              <Tr key={index}>
                <Td>{trainer.name}</Td>
                <Td>{trainer.email}</Td>
                <Td>{trainer.location || "?"}</Td>
                <Td>{trainer.state}</Td>
                <Td>{trainer.qualifications}</Td>
                <Td>
                  <ImageLinkWrapper>
                    <EditIcon
                      onClick={() => {
                        window.location.href = `/trainers/edit/${trainer.trainer_id}`;
                      }}
                    />
                  </ImageLinkWrapper>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Container>
  );
};

export default Page;
