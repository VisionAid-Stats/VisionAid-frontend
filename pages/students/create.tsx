import React, { useState } from "react";
import styled from "@emotion/styled";
import type { NextPage } from "next";
import {
  Container,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  HStack,
  Radio,
  NumberInput,
  NumberInputField,
  Textarea,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Box,
  VStack,
  Spacer,
  Heading,
  Alert,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";
import { Formik } from "formik";

import { Navbar, SelectInput } from "../../components";

const Root = styled.div`
  height: 100vh;
`;

const Students: NextPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [educationDetail, setEducationDetail] = useState("");
  const [employmentDetail, setEmploymentDetail] = useState("");
  const [expectations, setExpectations] = useState("");
  const [learningObjectives, setLearningObjectives] = useState("");
  const [visualImpairment, setVisualImpairment] = useState("");
  const [usableVision, setUsableVision] = useState("");
  const [referral, setReferral] = useState("");

  return (
    <Root>
      <Navbar />
      {/* <Stack>
        <Box>
          <Heading size="l">Add student</Heading>
        </Box>
        <Spacer />
        <Formik
          initialValues={{}}
          onSubmit={(values) => {
            console.log(values);
            const response = fetch(
              "http://ec2-3-87-215-83.compute-1.amazonaws.com:8080/student/create",
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
          <Form>
            <VStack>
              <Box>
                <Field name="name">
                  {({ field }) => (
                    <FormControl isRequired>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Input id="name" {...field} />
                    </FormControl>
                  )}
                </Field>
              </Box>
            </VStack>
          </Form>
        </Formik>
      </Stack> */}
      <Container>
        <Stack>
          <Box>
            <Heading size="l">Add student</Heading>
          </Box>
          <Spacer />
          <Formik initialValues={{}} onSubmit={(values, actions) => {}}>
            <VStack spacing={10} align="flex-start">
              {showAlert && (
                <Alert status="success" variant="subtle">
                  <AlertIcon />
                  Student successfully created
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
                <FormControl isRequired>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input id="name" placeholder="Name" />
                </FormControl>
              </Box>

              <Box>
                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email address</FormLabel>
                  <Input id="email" type="email" />
                </FormControl>
              </Box>

              <Box>
                <FormControl as="fieldset" isRequired>
                  <FormLabel as="legend">Gender</FormLabel>
                  <RadioGroup>
                    <HStack spacing="24px">
                      <Radio value="male">Male</Radio>
                      <Radio value="female">Female</Radio>
                      <Radio value="other">Other</Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box>
                <FormControl as="fieldset" isRequired>
                  <FormLabel as="legend">Visual Acuity</FormLabel>
                  <RadioGroup>
                    <HStack spacing="24px">
                      <Radio value="male">Fully blind</Radio>
                      <Radio value="female">Low vision</Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box>
                <FormControl isRequired>
                  <FormLabel htmlFor="mobile">Mobile Number</FormLabel>
                  <NumberInput>
                    <NumberInputField id="mobile" />
                  </NumberInput>
                </FormControl>
              </Box>

              <Box>
                <FormControl>
                  <FormLabel htmlFor="whatsapp">What&apos;s App</FormLabel>
                  <NumberInput>
                    <NumberInputField id="whatsapp" />
                  </NumberInput>
                </FormControl>
              </Box>

              <Box>
                <FormControl as="fieldset">
                  <FormLabel as="legend">Highest Education Received</FormLabel>
                  <RadioGroup>
                    <HStack spacing="24px">
                      <Radio value="graduate">Graduate</Radio>
                      <Radio value="intermediate">Intermediate</Radio>
                      <Radio value="class">Class</Radio>
                      <Radio value="other">Other</Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box>
                <FormLabel>Education Detail</FormLabel>
                <Textarea
                  value={educationDetail}
                  onChange={(event) => {
                    setEducationDetail(event.target.value);
                  }}
                  size="sm"
                />
              </Box>

              <SelectInput
                id="mother_tongue"
                label="Mother Tongue"
                isRequired={false}
                placeholder="Select mother tongue..."
                options={[
                  {
                    value: "Assamese",
                    label: "Assamese",
                  },
                  {
                    value: "Bengali",
                    label: "Bengali",
                  },
                  {
                    value: "English",
                    label: "English",
                  },
                  {
                    value: "Gujarati",
                    label: "Gujarati",
                  },
                  {
                    value: "Hindi",
                    label: "Hindi",
                  },
                  {
                    value: "Kannada",
                    label: "Kannada",
                  },
                  {
                    value: "Kashmiri",
                    label: "Kashmiri",
                  },
                  {
                    value: "Konkani",
                    label: "Konkani",
                  },
                  {
                    value: "Malayalam",
                    label: "Malayalam",
                  },
                  {
                    value: "Marathi",
                    label: "Marathi",
                  },
                  {
                    value: "Nepalese",
                    label: "Nepalese",
                  },
                  {
                    value: "Oriya",
                    label: "Oriya",
                  },
                  {
                    value: "Punjabi",
                    label: "Punjabi",
                  },
                  {
                    value: "Sanskrit",
                    label: "Sanskrit",
                  },
                  {
                    value: "Sindhi",
                    label: "Sindhi",
                  },
                  {
                    value: "Tamil",
                    label: "Tamil",
                  },
                  {
                    value: "Telugu",
                    label: "Telugu",
                  },
                  {
                    value: "Urdu",
                    label: "Urdu",
                  },
                ]}
              />

              <SelectInput
                id="education_tongue"
                label="Education Tongue"
                isRequired={false}
                placeholder="Select education tongue..."
                options={[
                  {
                    value: "Assamese",
                    label: "Assamese",
                  },
                  {
                    value: "Bengali",
                    label: "Bengali",
                  },
                  {
                    value: "English",
                    label: "English",
                  },
                  {
                    value: "Gujarati",
                    label: "Gujarati",
                  },
                  {
                    value: "Hindi",
                    label: "Hindi",
                  },
                  {
                    value: "Kannada",
                    label: "Kannada",
                  },
                  {
                    value: "Kashmiri",
                    label: "Kashmiri",
                  },
                  {
                    value: "Konkani",
                    label: "Konkani",
                  },
                  {
                    value: "Malayalam",
                    label: "Malayalam",
                  },
                  {
                    value: "Marathi",
                    label: "Marathi",
                  },
                  {
                    value: "Nepalese",
                    label: "Nepalese",
                  },
                  {
                    value: "Oriya",
                    label: "Oriya",
                  },
                  {
                    value: "Punjabi",
                    label: "Punjabi",
                  },
                  {
                    value: "Sanskrit",
                    label: "Sanskrit",
                  },
                  {
                    value: "Sindhi",
                    label: "Sindhi",
                  },
                  {
                    value: "Tamil",
                    label: "Tamil",
                  },
                  {
                    value: "Telugu",
                    label: "Telugu",
                  },
                  {
                    value: "Urdu",
                    label: "Urdu",
                  },
                ]}
              />

              <Box>
                <FormLabel>Employment Detail</FormLabel>
                <Textarea
                  value={employmentDetail}
                  onChange={(event) => {
                    setEmploymentDetail(event.target.value);
                  }}
                  size="sm"
                />
              </Box>
              <Box>
                <FormControl as="fieldset">
                  <FormLabel as="legend">Computer experience</FormLabel>
                  <RadioGroup>
                    <HStack spacing="24px">
                      <Radio value="yes_comp_exp">Yes</Radio>
                      <Radio value="no_comp_exp">No</Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box>
                <FormLabel>Expectations for the program</FormLabel>
                <Textarea
                  value={expectations}
                  onChange={(event) => {
                    setExpectations(event.target.value);
                  }}
                  size="sm"
                />
              </Box>

              <Box>
                <FormControl as="fieldset">
                  <FormLabel as="legend">
                    Permission to share your information
                  </FormLabel>
                  <RadioGroup>
                    <HStack spacing="24px">
                      <Radio value="yes_share_perm">Yes</Radio>
                      <Radio value="no_share_perm">No</Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box>
                <FormLabel>Learning objectives</FormLabel>
                <Textarea
                  value={learningObjectives}
                  onChange={(event) => {
                    setLearningObjectives(event.target.value);
                  }}
                  size="sm"
                />
              </Box>

              <Box>
                <FormLabel>Describe your visual impairment</FormLabel>
                <Textarea
                  value={visualImpairment}
                  onChange={(event) => {
                    setVisualImpairment(event.target.value);
                  }}
                  size="sm"
                />
              </Box>

              <Box>
                <FormLabel>Describe your usable vision</FormLabel>
                <Textarea
                  value={usableVision}
                  onChange={(event) => {
                    setUsableVision(event.target.value);
                  }}
                  size="sm"
                />
              </Box>

              <Box>
                <FormControl>
                  <FormLabel htmlFor="pct_vision_loss">
                    Percent vision loss
                  </FormLabel>
                  <NumberInput max={100} min={0} keepWithinRange>
                    <NumberInputField id="pct_vision_loss" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </Box>

              <Box>
                <FormLabel>How did you hear about us?</FormLabel>
                <Textarea
                  value={referral}
                  onChange={(event) => {
                    setReferral(event.target.value);
                  }}
                  size="sm"
                />
              </Box>

              <Button
                mt={4}
                colorScheme="teal"
                isLoading={submitting}
                onClick={() => {
                  setSubmitting(true);
                  setTimeout(() => {
                    setSubmitting(false);
                    window.scrollTo(0, 0);
                    setShowAlert(true);
                  }, 300);
                }}
                type="submit"
              >
                Submit
              </Button>
              <Spacer />
            </VStack>
          </Formik>
        </Stack>
      </Container>
    </Root>
  );
};

export default Students;
