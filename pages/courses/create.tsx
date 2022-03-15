import React, { useState } from "react";
import type { NextPage } from "next";
import { Formik, Form, Field } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styled from "@emotion/styled";
import {
  Container,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  VStack,
  Spacer,
  Select,
  Alert,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";

import { Navbar, BasicInput, SelectInput } from "../../components";

const Root = styled.div`
  height: 100vh;
`;

const DateSelectorWrapper = styled.div`
  position: absolute;
  top: 40px;
  padding-left: 5px;
`;

const Students: NextPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  return (
    <Root>
      <Navbar />
      <Container>
        <Stack>
          {showAlert && (
            <Alert status="success" variant="subtle">
              <AlertIcon />
              Course successfully created
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
            <Heading size="l">Add a course</Heading>
          </Box>
          <Spacer />
          <Formik
            initialValues={{
              start_date: `${startDate.getFullYear()}-${
                startDate.getMonth() + 1
              }-${startDate.getDate()}`,
            }}
            onSubmit={(values) => {
              const response = fetch(
                "https://ec2-52-90-191-246.compute-1.amazonaws.com/course/create",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                }
              ).then((value) => {
                window.scrollTo(0, 0);
                setShowAlert(true);
              });
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <VStack spacing={10} align="flex-start">
                  <BasicInput id="course_id" label="Course ID" isRequired />
                  <BasicInput
                    id="pm_user_id"
                    label="Program Manager ID"
                    isRequired
                  />
                  <BasicInput id="trainer_id" label="Trainer ID" isRequired />

                  <BasicInput id="centre_id" label="Centre ID" isRequired />

                  <SelectInput
                    id="mode"
                    label="Education Mode"
                    placeholder="Select education mode..."
                    isRequired
                    options={[
                      {
                        value: "Virtual",
                        label: "Virtual",
                      },
                      {
                        value: "Classroom",
                        label: "Classroom",
                      },
                      { value: "E-Learning", label: "E-Learning" },
                    ]}
                  />

                  <Box>
                    <FormControl>
                      <FormLabel htmlFor="start_date">Start Date</FormLabel>
                      <Input />
                      <DateSelectorWrapper>
                        <DatePicker
                          selected={startDate}
                          onChange={(date: Date) => {
                            setStartDate(date);
                            setFieldValue(
                              "start_date",
                              `${date.getFullYear()}-${
                                date.getMonth() + 1
                              }-${date.getDate()}`
                            );
                          }}
                        />
                      </DateSelectorWrapper>
                    </FormControl>
                  </Box>

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
