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
} from "@chakra-ui/react";

import { Navbar, BasicInput } from "../../../components";

const Root = styled.div`
  height: 100vh;
`;

const DateSelectorWrapper = styled.div`
  position: absolute;
  top: 40px;
  padding-left: 5px;
`;

const Students: NextPage = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <Root>
      <Navbar />
      <Container>
        <Stack>
          <Box>
            <Heading size="l">Add a course offering</Heading>
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
                "http://ec2-52-90-191-246.compute-1.amazonaws.com:8080/course_offering/create",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                }
              );
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <VStack spacing={10} align="flex-start">
                  <BasicInput id="course_id" label="Course ID" isRequired />

                  <Box>
                    <Field name="pm_user_id">
                      {({ field }) => (
                        <FormControl isRequired>
                          <FormLabel htmlFor="pm_user_id">
                            Program Manager ID
                          </FormLabel>
                          <Input id="pm_user_id" {...field} />
                        </FormControl>
                      )}
                    </Field>
                  </Box>

                  <Box>
                    <Field name="trainer_id">
                      {({ field }) => (
                        <FormControl isRequired>
                          <FormLabel htmlFor="trainer_id">Trainer ID</FormLabel>
                          <Input id="trainer_id" {...field} />
                        </FormControl>
                      )}
                    </Field>
                  </Box>

                  <Box>
                    <Field name="centre_id">
                      {({ field }) => (
                        <FormControl isRequired>
                          <FormLabel htmlFor="centre_id">Centre ID</FormLabel>
                          <Input id="centre_id" {...field} />
                        </FormControl>
                      )}
                    </Field>
                  </Box>

                  <Box>
                    <Field name="mode">
                      {({ field }) => (
                        <FormControl isRequired>
                          <FormLabel htmlFor="mode">Education Mode</FormLabel>
                          <Select
                            placeholder="Select option..."
                            id="mode"
                            {...field}
                          >
                            <option value="Virtual">Virtual</option>
                            <option value="Classroom">Classroom</option>
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                  </Box>

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
