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
import { InfoIcon } from "@chakra-ui/icons";

import { API_PATH, useAuth } from "../../common";
import { ImageLinkWrapper } from "../../components";

const Page: NextPage = () => {
  useAuth("PM");
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    fetch(`${API_PATH}/student/get_all`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  return (
    <Container maxW={"90%"} maxH={"100%"} background={"white"}>
      <Box>
        <Heading size="l">List of students</Heading>
      </Box>

      <Table>
        <Thead>
          <Tr>
            <Th>Student ID</Th>
            <Th>Student Name</Th>
            <Th>Email</Th>
            <Th>More details</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((student, index) => {
            return (
              <Tr key={index}>
                <Td>{student.student_id}</Td>
                <Td>{student.name}</Td>
                <Td>{student.email}</Td>
                <Td>
                  <ImageLinkWrapper>
                    <InfoIcon
                      onClick={() => {
                        window.location.href = `/students/details/${student.student_id}`;
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
