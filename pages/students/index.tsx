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

const Root = styled.div`
  height: 100vh;
`;

const ImageLinkWrapper = styled.div`
  svg {
    cursor: pointer;
  }
`;

const Courses: NextPage = () => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    fetch("https://ec2-52-90-191-246.compute-1.amazonaws.com/student/get_all")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  return (
    <Root>
      <Navbar />
      <Container>
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
    </Root>
  );
};

export default Courses;
