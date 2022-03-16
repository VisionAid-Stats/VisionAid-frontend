import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Navbar } from "../../../components/Navbar";
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

import { API_PATH } from "../../../routes";

const Root = styled.div`
  height: 100vh;
`;

const Courses: NextPage = () => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    fetch(`${API_PATH}/course_offering/get_all`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  return (
    <Root>
      <Navbar />
      <Container>
        <Box>
          <Heading size="l">List of course offerings</Heading>
        </Box>

        <Table>
          <Thead>
            <Tr>
              <Th>Centre ID</Th>
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
                  <Td>{course_offering.centre_id}</Td>
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
    </Root>
  );
};

export default Courses;
