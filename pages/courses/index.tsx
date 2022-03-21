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
import { CheckIcon } from "@chakra-ui/icons";

import { API_PATH } from "../../common";

const Page: NextPage = () => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    fetch(`${API_PATH}/course/get_all`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  return (
    <Container>
      <Box>
        <Heading size="l">List of courses</Heading>
      </Box>

      <Table>
        <Thead>
          <Tr>
            <Th>Course Code</Th>
            <Th>Course ID</Th>
            <Th>Course Name</Th>
            <Th>Offered Online</Th>
            <Th>Offered Offline</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((course, index) => {
            return (
              <Tr key={index}>
                <Td>{course.code}</Td>
                <Td>{course.course_id}</Td>
                <Td>{course.name}</Td>
                <Td>{course.is_online === 1 ? <CheckIcon /> : ""}</Td>
                <Td>{course.is_offline === 1 ? <CheckIcon /> : ""}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Container>
  );
};

export default Page;
