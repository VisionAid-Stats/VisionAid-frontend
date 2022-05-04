import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Table,
  Tbody,
  Td,
  Tr,
  VStack,
} from "@chakra-ui/react";

import { API_PATH, useAuth } from "../../../common";
import { Formik, Form, Field } from "formik";
import { BasicInput, SelectInput } from "../../../components";

const Page: NextPage = () => {
  useAuth("PM");
  const router = useRouter();
  const { id } = router.query;

  const [showAlert, setShowAlert] = useState(false);
  const [data, setData] = useState<any>({});
  useEffect(() => {
    if (id !== undefined) {
      fetch(`${API_PATH}/student/get_by_id?student_id=${id}`)
        .then((response) => response.json())
        .then((json) => setData(json[0]));
    }
  }, [id]);
  return (
    <Container maxW={"90%"} maxH={"100%"} background={"white"}>
      {showAlert && (
        <Alert status="error" variant="subtle">
          <AlertIcon />
          An error has occurred
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
        <Heading size="l">Edit details for {data.name}</Heading>
      </Box>
      <Spacer />
      <Formik
        enableReinitialize
        initialValues={data}
        onSubmit={(values) => {
          const response = fetch(`${API_PATH}/student/update`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          })
            .then((response) => response.json())
            .then((value) => {
              if (value.success) {
                window.location.href = `/students/details/${id}`;
              } else {
                window.scrollTo(0, 0);
                setShowAlert(true);
              }
            });
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <VStack spacing={10} align="flex-start">
              <BasicInput id="email" label="Email" isRequired={false} />
              <BasicInput id="name" label="Name" isRequired={false} />
              <BasicInput
                id="mobile"
                label="Mobile Number"
                isRequired={false}
              />
              <BasicInput id="whatsapp" label="What's App" isRequired={false} />
              <BasicInput
                id="sharepoint_url"
                label="Sharepoint URL"
                isRequired={false}
              />
              <SelectInput
                id="gender"
                label="Gender"
                placeholder="Select gender..."
                isRequired={false}
                options={[
                  {
                    value: "male",
                    label: "Male",
                  },
                  {
                    value: "female",
                    label: "Female",
                  },
                  {
                    value: "other",
                    label: "Other",
                  },
                ]}
              />
              <Box>
                <Field name="age">
                  {({ field }) => (
                    <FormControl isRequired={false}>
                      <FormLabel htmlFor="age">Age</FormLabel>
                      <Input
                        id="age"
                        {...field}
                        type="number"
                        min={1}
                        value={values.age}
                      />
                    </FormControl>
                  )}
                </Field>
              </Box>
              <BasicInput
                id="address"
                label="What city and state are you from?"
                isRequired={false}
              />
              <BasicInput
                id="learning_objectives"
                label="What are your long term learning objectives?"
                isRequired={false}
              />
              <BasicInput
                id="visual_impairment"
                label="Provide a brief history of your vision impairment"
                isRequired={false}
              />
              <BasicInput
                id="usable_vision"
                label="What is your usable vision in terms of acuity and field?"
                isRequired={false}
              />
              <Field name="pct_vision_loss">
                {({ field }) => (
                  <FormControl isRequired={false}>
                    <FormLabel htmlFor="pct_vision_loss">
                      What is the percentage of vision loss?
                    </FormLabel>
                    <NumberInput
                      step={10}
                      id="pct_vision_loss"
                      width={100}
                      min={0}
                      max={100}
                      clampValueOnBlur
                      value={
                        values.pct_vision_loss
                          ? values.pct_vision_loss
                          : undefined
                      }
                    >
                      <NumberInputField {...field} />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                )}
              </Field>
              <BasicInput
                id="hear_about"
                label="How did you hear about us?"
                isRequired={false}
              />
              <BasicInput
                id="education_qual"
                label="Highest education received"
                isRequired={false}
              />
              <BasicInput
                id="education_detail"
                label="Education details"
                isRequired={false}
              />{" "}
              <BasicInput
                id="education_tongue"
                label="Education Tongue"
                isRequired={false}
              />
              <BasicInput
                id="mother_tongue"
                label="Mother Tongue"
                isRequired={false}
              />
              <BasicInput
                id="computer_experience"
                label="Computer Experience"
                isRequired={false}
              />
              <BasicInput
                id="expectations"
                label="Expectations"
                isRequired={false}
              />
              <BasicInput
                id="share_permission"
                label="Permission to share info"
                isRequired={false}
              />
              <BasicInput
                id="bank_account"
                label="Bank Account"
                isRequired={false}
              />
              <Button mt={4} colorScheme="teal" type="submit">
                Submit
              </Button>
              <Spacer />
            </VStack>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Page;
