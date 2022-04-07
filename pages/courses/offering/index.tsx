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

import { API_PATH } from "../../../common";

const Page: NextPage = () => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    fetch(`${API_PATH}/course_offering/get_all`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  return (
    <Container>
      <Box>
        <Heading size="l">List of course offerings</Heading>
      </Box>

      <Table>
        <Thead>
          <Tr>
            <Th>Centre Location</Th>
            <Th>Course Code</Th>
            <Th>Course Name</Th>
            <Th>Program Manager</Th>
            <Th>Trainer</Th>
            <Th>Start Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((course_offering, index) => {
            return (
              <Tr key={index}>
                <Td>{course_offering.centre_location}</Td>
                <Td>{course_offering.course_code}</Td>
                <Td>{course_offering.course_name}</Td>
                <Td>{course_offering.pm_name}</Td>
                <Td>{course_offering.trainer_name}</Td>
                <Td>{course_offering.start_date}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Container>
  );
};

export default Page;
