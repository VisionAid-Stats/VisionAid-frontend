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

import { SmallCloseIcon } from "@chakra-ui/icons";

import { API_PATH, useAuth } from "../../../../common";
import { ImageLinkWrapper, SelectInput } from "../../../../components";
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
  const router = useRouter();
  const { id } = router.query;
  const [courseOffering, setCourseOffering] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [studentList, setStudentList] = useState<any[]>([]);

  useEffect(() => {
    if (!!id) {
      fetch(`${API_PATH}/course_offering/get_by_id?course_offering_id=${id}`)
        .then((response) => response.json())
        .then((json) => setCourseOffering(json));
    }
  }, [id]);

  useEffect(() => {
    if (!!id) {
      fetch(`${API_PATH}/course_offering/get_students?course_offering_id=${id}`)
        .then((response) => response.json())
        .then((json) => setData(json));
    }
  }, [id]);

  useEffect(() => {
    if (!!id) {
      fetch(`${API_PATH}/student/get_all`)
        .then((response) => response.json())
        .then((json) => setStudentList(studentListTransformer(json)));
    }
  }, [id]);

  return (
    <Container>
      <Box>
        <Heading size="l">
          List of students{" "}
          {courseOffering.length !== 0
            ? `for ${courseOffering[0].course_name}`
            : ""}
        </Heading>
      </Box>
      <Spacer />
      <Box>
        <Formik
          enableReinitialize
          initialValues={{
            course_offering_id: id,
          }}
          onSubmit={(values) => {
            const response = fetch(`${API_PATH}/course_offering/add_student`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            }).then((value) => {
              window.location.reload();
            });
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
                />
                <Button mt={4} colorScheme="teal" type="submit">
                  Add
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
            <Th>Student Name</Th>
            <Th>Email</Th>
            <Th>Mobile</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((student, index) => {
            return (
              <Tr key={index}>
                <Td>{student.name}</Td>
                <Td>{student.email}</Td>
                <Td>{student.mobile}</Td>
                <Td>
                  <ImageLinkWrapper>
                    <SmallCloseIcon
                      onClick={() => {
                        fetch(`${API_PATH}/course_offering/remove_student`, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            course_offering_id: id,
                            student_id: student.student_id,
                          }),
                        }).then((value) => {
                          window.location.reload();
                        });
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
