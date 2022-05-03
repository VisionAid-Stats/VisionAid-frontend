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

import { EditIcon, InfoOutlineIcon } from "@chakra-ui/icons";

import { API_PATH, useAuth, useSession } from "../../../../common";
import { ImageLinkWrapper } from "../../../../components";

const Page: NextPage = () => {
  useAuth("PM");
  const [data, setData] = useState<any[]>([]);
  const { userId } = useSession();

  useEffect(() => {
    fetch(`${API_PATH}/course_offering/get_by_pm?pm_user_id=${userId}`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  return (
    <Container maxW={"90%"} maxH={"100%"} background={"white"}>
      <Box>
        <Heading size="l">List of my course batches</Heading>
      </Box>

      <Table>
        <Thead>
          <Tr>
            <Th>Batch</Th>
            <Th>Course Name</Th>
            <Th>Trainer</Th>
            <Th>Centre</Th>
            <Th>Start Date</Th>
            <Th>Edit</Th>
            <Th>List students</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((course, index) => {
            return (
              <Tr key={index}>
                <Td>{course.batch}</Td>
                <Td>{course.course_name}</Td>
                <Td>{course.trainer_name}</Td>
                <Td>{course.centre_location}</Td>
                <Td>{course.start_date}</Td>
                <Td>
                  <ImageLinkWrapper>
                    <EditIcon
                      onClick={() => {
                        window.location.href = `/courses/offering/edit/${course.course_offering_id}`;
                      }}
                    />
                  </ImageLinkWrapper>
                </Td>
                <Td>
                  <ImageLinkWrapper>
                    <InfoOutlineIcon
                      onClick={() => {
                        window.location.href = `/courses/offering/manage/${course.course_offering_id}`;
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
