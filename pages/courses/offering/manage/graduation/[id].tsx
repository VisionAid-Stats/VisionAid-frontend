import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Checkbox,
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

import { API_PATH, useAuth } from "../../../../../common";
import { ImageLinkWrapper, SelectInput } from "../../../../../components";
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
  const [graduated, setGraduated] = useState<number[]>([]);

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
    if (data) {
      setGraduated(data.map((student) => student.student_id));
    }
  }, [data]);

  return (
    <Container maxW={"90%"} maxH={"100%"} background={"white"}>
      <Box>
        <Heading size="l">
          Graduation for{" "}
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
            graduated_student_ids: graduated,
          }}
          onSubmit={(values) => {
            const response = fetch(`${API_PATH}/course_offering/close`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            })
              .then((response) => response.json())
              .then((value) => {
                window.location.href = "/courses/offering/manage";
              });
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <Button mt={4} colorScheme="teal" type="submit">
                Graduate
              </Button>
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
            <Th>Eligible to graduate</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((student, index) => {
            return (
              <Tr key={index}>
                <Td>{student.name}</Td>
                <Td>{student.email}</Td>
                <Td>
                  <Checkbox
                    name={student.student_id + "_graduated"}
                    isChecked={graduated.includes(student.student_id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        if (!graduated.includes(student.student_id)) {
                          setGraduated(graduated.concat([student.student_id]));
                        }
                      } else {
                        setGraduated(
                          graduated.filter((id) => id !== student.student_id)
                        );
                      }
                    }}
                  />
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
