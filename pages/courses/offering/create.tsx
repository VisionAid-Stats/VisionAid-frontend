import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Formik, Form } from "formik";
import "react-datepicker/dist/react-datepicker.css";

import styled from "@emotion/styled";
import {
  Container,
  Heading,
  Stack,
  Button,
  Box,
  VStack,
  Spacer,
  Alert,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";

import { Navbar, SelectInput } from "../../../components";
import { API_PATH } from "../../../common";

const Root = styled.div`
  height: 100vh;
`;

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

const trainerListTransformer = (trainers) => {
  if (!!trainers) {
    return trainers.map((trainer) => {
      return {
        label: trainer.name,
        value: trainer.trainer_id,
      };
    });
  }
  return [];
};

const pmListTransformer = (pms) => {
  if (!!pms) {
    return pms.map((pm) => {
      return {
        label: pm.name,
        value: pm.user_id,
      };
    });
  }
  return [];
};

const centreListTransformer = (centres) => {
  if (!!centres) {
    return centres.map((centre) => {
      return {
        label: centre.location,
        value: centre.centre_id,
      };
    });
  }
  return [];
};

const Students: NextPage = () => {
  const [showAlert, setShowAlert] = useState(false);

  const [courseList, setCourseList] = useState();
  const [trainerList, setTrainerList] = useState();
  const [pmList, setPMList] = useState();
  const [centreList, setCentreList] = useState();

  useEffect(() => {
    fetch(`${API_PATH}/course/get_all`)
      .then((response) => response.json())
      .then((json) => setCourseList(courseListTransformer(json)));
  }, []);

  useEffect(() => {
    fetch(`${API_PATH}/trainer/get_all`)
      .then((response) => response.json())
      .then((json) => setTrainerList(trainerListTransformer(json)));
  }, []);

  useEffect(() => {
    fetch(`${API_PATH}/user/get_pms`)
      .then((response) => response.json())
      .then((json) => setPMList(pmListTransformer(json)));
  }, []);

  useEffect(() => {
    fetch(`${API_PATH}/centre/get_all`)
      .then((response) => response.json())
      .then((json) => setCentreList(centreListTransformer(json)));
  }, []);

  return (
    <Root>
      <Navbar />
      <Container>
        <Stack>
          {showAlert && (
            <Alert status="success" variant="subtle">
              <AlertIcon />
              Course offering successfully created
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
            <Heading size="l">Add a course offering</Heading>
          </Box>
          <Spacer />
          <Formik
            initialValues={{}}
            onSubmit={(values) => {
              const response = fetch(`${API_PATH}/course_offering/create`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              }).then((value) => {
                window.scrollTo(0, 0);
                setShowAlert(true);
              });
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <VStack spacing={10} align="flex-start">
                  <SelectInput
                    id="course_id"
                    label="Course"
                    placeholder="Select course to offer..."
                    isRequired
                    options={courseList}
                  />

                  <SelectInput
                    id="trainer_id"
                    label="Trainer"
                    placeholder="Select trainer..."
                    isRequired
                    options={trainerList}
                  />

                  <SelectInput
                    id="pm_user_id"
                    label="Program Manager"
                    placeholder="Select program manager..."
                    isRequired
                    options={pmList}
                  />

                  <SelectInput
                    id="centre_id"
                    label="Centre"
                    placeholder="Select centre..."
                    isRequired
                    options={centreList}
                  />

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
    </Root>
  );
};

export default Students;
