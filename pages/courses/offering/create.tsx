import React, { useState } from "react";
import type { NextPage } from "next";
import { Formik, Form } from "formik";
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
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberDecrementStepper,
  Alert,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";

import { Navbar, BasicInput, SelectInput } from "../../../components";
import { API_PATH } from "../../../routes";

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
  const [endDate, setEndDate] = useState(new Date());

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
            initialValues={{
              start_date: `${startDate.getFullYear()}-${
                startDate.getMonth() + 1
              }-${startDate.getDate()}`,
              end_date: `${startDate.getFullYear()}-${
                startDate.getMonth() + 1
              }-${startDate.getDate()}`,
            }}
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
                  <BasicInput id="course_id" label="Course ID" isRequired />
                  <BasicInput
                    id="pm_user_id"
                    label="Program Manager ID"
                    isRequired
                  />
                  <BasicInput id="trainer_id" label="Trainer ID" isRequired />

                  <BasicInput id="centre_id" label="Centre ID" isRequired />

                  <BasicInput
                    id="checklist_id"
                    label="Checklist ID"
                    isRequired
                  />

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

                  <Box>
                    <FormControl>
                      <FormLabel htmlFor="end_date">End Date</FormLabel>
                      <Input />
                      <DateSelectorWrapper>
                        <DatePicker
                          selected={endDate}
                          onChange={(date: Date) => {
                            setEndDate(date);
                            setFieldValue(
                              "end_date",
                              `${date.getFullYear()}-${
                                date.getMonth() + 1
                              }-${date.getDate()}`
                            );
                          }}
                        />
                      </DateSelectorWrapper>
                    </FormControl>
                  </Box>

                  <BasicInput id="frequency" label="Frequency" isRequired />

                  <BasicInput id="duration" label="Duration" isRequired />

                  <BasicInput
                    id="checklist_id"
                    label="Checklist ID"
                    isRequired
                  />

                  <Box>
                    <FormControl>
                      <FormLabel htmlFor="deposit">Deposit</FormLabel>
                      <NumberInput
                        min={0}
                        precision={2}
                        step={0.01}
                        keepWithinRange
                        isRequired
                      >
                        <NumberInputField id="deposit" />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </Box>

                  <Box>
                    <FormControl>
                      <FormLabel htmlFor="max_students">Max Students</FormLabel>
                      <NumberInput min={0} step={1} keepWithinRange isRequired>
                        <NumberInputField id="max_students" />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
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
