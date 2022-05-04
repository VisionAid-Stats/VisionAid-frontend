import React, { useState, useEffect, Fragment } from "react";
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

import { SmallCloseIcon } from "@chakra-ui/icons";

import { API_PATH, useAuth } from "../../common";
import { ImageLinkWrapper, SelectInput } from "../../components";
import { Formik, Form } from "formik";
import _ from "lodash";

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

const courseListTransformer = (courses) => {
  if (!!courses) {
    return courses.map((course) => {
      return {
        label: course.name,
        value: course.course_id,
      };
    });
  }
  return [];
};

const interestTransformer = (interests) => {
  if (!!interests) {
    const map = new Map();
    interests.forEach((interest) => {
      if (map.has(interest.course_id)) {
        const course = map.get(interest.course_id);
        course.count = course.count + 1;
        map.set(interest.course_id, course);
      } else {
        map.set(interest.course_id, {
          course_code: interest.course_code,
          course_name: interest.course_name,
          count: 1,
        });
      }
    });
    const courseInterests = Array.from(map.values());
    return courseInterests.sort((a, b) => {
      return a.count < b.count ? 1 : -1;
    });
  }
  return [];
};

const Page: NextPage = () => {
  useAuth("PM");
  const [type, setType] = useState<"summary" | "student" | "course">("summary");
  const [data, setData] = useState<any>();
  const [studentList, setStudentList] = useState<any[]>([]);
  const [courseList, setCourseList] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_PATH}/student/get_all`)
      .then((response) => response.json())
      .then((json) => setStudentList(studentListTransformer(json)));
  }, []);

  useEffect(() => {
    fetch(`${API_PATH}/course/get_all`)
      .then((response) => response.json())
      .then((json) => setCourseList(courseListTransformer(json)));
  }, []);

  useEffect(() => {
    fetch(`${API_PATH}/course/interests`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <Container maxW={"90%"} maxH={"100%"} background={"white"}>
      <Box>
        <Heading size="l">Course Interests Report</Heading>
      </Box>
      <Spacer />
      <HStack>
        <Box>
          <Formik
            enableReinitialize
            initialValues={{
              student_id: undefined,
            }}
            onSubmit={(values) => {
              if (!!values.student_id) {
                const response = fetch(
                  `${API_PATH}/course/interests?student_id=${values.student_id}`
                )
                  .then((response) => response.json())
                  .then((data) => {
                    setData(data);
                    setType("student");
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
                    placeholder={"Check student interests..."}
                  />
                  <Button mt={4} colorScheme="teal" type="submit">
                    Student Interest
                  </Button>
                </HStack>
              </Form>
            )}
          </Formik>
        </Box>
        <Box>
          <Formik
            enableReinitialize
            initialValues={{
              course_id: undefined,
            }}
            onSubmit={(values) => {
              if (!!values.course_id) {
                const response = fetch(
                  `${API_PATH}/course/interests?course=${values.course_id}`
                )
                  .then((response) => response.json())
                  .then((data) => {
                    setData(data);
                    setType("course");
                  });
              }
            }}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <HStack>
                  <SelectInput
                    id="course_id"
                    label=""
                    isRequired={false}
                    options={courseList}
                    placeholder={"Check course interest..."}
                  />
                  <Button mt={4} colorScheme="teal" type="submit">
                    Course Interest
                  </Button>
                </HStack>
              </Form>
            )}
          </Formik>
        </Box>
      </HStack>
      {type === "summary" && (
        <Table>
          <Thead>
            <Tr>
              <Th>Course Code</Th>
              <Th>Name</Th>
              <Th>Interest Count</Th>
            </Tr>
          </Thead>
          <Tbody>
            {interestTransformer(data).map((course, index) => {
              return (
                <Tr key={index}>
                  <Td>{course.course_code}</Td>
                  <Td>{course.course_name}</Td>
                  <Td>{course.count}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
      {type === "student" && (
        <Table>
          <Thead>
            <Tr>
              <Th>Course Code</Th>
              <Th>Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((interest, index) => {
              return (
                <Tr key={index}>
                  <Td>{interest.course_code}</Td>
                  <Td>{interest.course_name}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
      {type === "course" && (
        <Table>
          <Thead>
            <Tr>
              <Th>Student</Th>
              <Th>Student ID</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((interest, index) => {
              return (
                <Tr key={index}>
                  <Td>{interest.student_name}</Td>
                  <Td>{interest.student_id}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </Container>
  );
};

export default Page;
