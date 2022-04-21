import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  CloseButton,
  Container,
  Heading,
  Spacer,
  Stack,
  VStack,
} from "@chakra-ui/react";

import { API_PATH, useAuth } from "../../../common";
import { Formik, Form } from "formik";

const Page: NextPage = () => {
  useAuth("ALL");
  const router = useRouter();
  const { id } = router.query;

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_PATH}/course/get_all`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  return (
    <Container>
      <Stack>
        {showAlert && (
          <Alert
            status={
              alertMessage === "Student interest form successfully submitted"
                ? "success"
                : "error"
            }
            variant="subtle"
          >
            <AlertIcon />
            {alertMessage}
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => {
                setShowAlert(false);
              }}
            />
          </Alert>
        )}
        <Box>
          <Heading size="l">Student Interest Form</Heading>
        </Box>
        <Spacer />

        <Formik
          enableReinitialize
          initialValues={{ student_id: id, course_ids: [] }}
          onSubmit={(values) => {
            const response = fetch(`${API_PATH}/student/add_interests`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            })
              .then((response) => response.json())
              .then((value) => {
                console.log(value);
                if (value.success) {
                  setAlertMessage(
                    "Student interest form successfully submitted"
                  );
                } else {
                  setAlertMessage("An error occurred, please try again later");
                }
                window.scrollTo(0, 0);
                setShowAlert(true);
              });
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <VStack spacing={10} align="flex-start">
                <Box>
                  <b>Please select courses that you are interested in</b>
                </Box>
                {data.map((course, index) => {
                  return (
                    <Checkbox
                      name={course.course_id}
                      isChecked={values.course_ids.includes(course.course_id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFieldValue(
                            "course_ids",
                            values.course_ids.concat([course.course_id])
                          );
                        } else {
                          setFieldValue(
                            "course_ids",
                            values.course_ids.filter(
                              (id) => id !== course.course_id
                            )
                          );
                        }
                      }}
                      key={index}
                    >
                      {course.name}
                    </Checkbox>
                  );
                })}
                <Button mt={4} colorScheme="teal" type="submit">
                  Submit
                </Button>
                <Spacer />
              </VStack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Container>
  );
};

export default Page;
