import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Spacer,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { CheckIcon } from "@chakra-ui/icons";

import { API_PATH, useAuth } from "../../common";
import { ImageLinkWrapper, SelectInput } from "../../components";
import { Formik, Form } from "formik";

const studentListTransformer = (students) => {
  if (!!students) {
    return students.map((student) => {
      return {
        label: student.name,
        value: student.student_id,
      };
    });
  }
  return [];
};

const Page: NextPage = () => {
  useAuth("PM");
  const [data, setData] = useState<any[]>([]);
  const [studentList, setStudentList] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_PATH}/student/get_all`)
      .then((response) => response.json())
      .then((json) => setStudentList(studentListTransformer(json)));
  }, []);

  return (
    <Container maxW={"90%"} maxH={"100%"} background={"white"}>
      <Box>
        <Heading size="l">Student Report</Heading>
      </Box>
      <Spacer />
      <Box>
        <Formik
          enableReinitialize
          initialValues={{
            student_id: undefined,
          }}
          onSubmit={(values) => {
            if (!!values.student_id) {
              const response = fetch(
                `${API_PATH}/student/enrollments?student_id=${values.student_id}`
              )
                .then((response) => response.json())
                .then((data) => {
                  setData(data);
                });
            }
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <HStack>
                <SelectInput
                  id="student_id"
                  label=""
                  isRequired={false}
                  options={studentList}
                  placeholder={"Select student to generate report..."}
                />
                <Button mt={4} colorScheme="teal" type="submit">
                  Generate report
                </Button>
              </HStack>
            </Form>
          )}
        </Formik>
      </Box>
      <Spacer />
      <Table>
        <Thead>
          <Tr>
            <Th>Course Code</Th>
            <Th>Course Name</Th>
            <Th>Batch</Th>
            <Th>Start Date</Th>
            <Th>In Progress</Th>
            <Th>Graduated</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((course, index) => {
            return (
              <Tr key={index}>
                <Td>{course.course_code}</Td>
                <Td>{course.course_name}</Td>
                <Td>{course.course_batch}</Td>
                <Td>{course.start_date}</Td>
                <Td>{course.in_progress === 1 && <CheckIcon />}</Td>
                <Td>{course.graduated === 1 && <CheckIcon />}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Container>
  );
};

export default Page;
