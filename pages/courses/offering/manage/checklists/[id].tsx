import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Spacer,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { API_PATH, useAuth } from "../../../../../common";
import { Formik, Form, Field } from "formik";
import { BasicInput, SelectInput } from "../../../../../components";

const Page: NextPage = () => {
  useAuth("PM");
  const router = useRouter();
  const { id } = router.query;
  const [courseOffering, setCourseOffering] = useState<any[]>([]);
  const [checklistData, setChecklistData] = useState<any>();

  useEffect(() => {
    if (!!id) {
      fetch(`${API_PATH}/course_offering/get_by_id?course_offering_id=${id}`)
        .then((response) => response.json())
        .then((json) => setCourseOffering(json));
    }
  }, [id]);

  useEffect(() => {
    if (!!id) {
      fetch(
        `${API_PATH}/course_offering/get_checklist?course_offering_id=${id}`
      )
        .then((response) => response.json())
        .then((json) => setChecklistData(json));
    }
  }, [id]);

  console.log(checklistData);

  const checklistRow = (name, item) => {
    return (
      <Tr>
        <Td>{name}</Td>
        <Td>
          <Field name={item + "_remarks"}>
            {({ field }) => (
              <FormControl isRequired={false}>
                <Input id={item + "_remarks"} {...field} />
              </FormControl>
            )}
          </Field>
        </Td>
        <Td>
          <Box>
            <Field name={item + "_completion"}>
              {({ field }) => (
                <FormControl isRequired={false}>
                  <Input id={item + "_completion"} {...field} type="date" />
                </FormControl>
              )}
            </Field>
          </Box>
        </Td>
      </Tr>
    );
  };

  return (
    <Container maxW={"90%"} maxH={"100%"} background={"white"}>
      <Box>
        <Heading size="l">
          Pre-Training Checklist{" "}
          {courseOffering.length !== 0
            ? `for ${courseOffering[0].course_name}`
            : ""}
        </Heading>
      </Box>
      <Formik
        enableReinitialize
        initialValues={checklistData}
        onSubmit={(values) => {
          const { checklist_id, ...rest } = values;
          const response = fetch(
            `${API_PATH}/course_offering/update_checklist`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(rest),
            }
          )
            .then((response) => response.json())
            .then((value) => {
              console.log(value);
              window.location.reload();
            });
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Table>
              <Thead>
                <Tr>
                  <Th>Completed</Th>
                  <Th>Remarks</Th>
                  <Th>Completion Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {checklistRow(
                  "Item 1 - Training Program Announcement",
                  "item_1"
                )}
                {checklistRow(
                  "Item 2 - Trainer / PM / TA Identified",
                  "item_2"
                )}
                {checklistRow("Item 3 - First Level Screening", "item_3")}
                {checklistRow(
                  "Item 4 - Second Level Screening (If Required)",
                  "item_4"
                )}
                {checklistRow(
                  "Item 5 - Finalize the List of Students Admitted",
                  "item_5"
                )}
                {checklistRow(
                  "Item 6 - Student Intimation on Admission",
                  "item_6"
                )}
                {checklistRow(
                  "Item 7 - Collect all necessary documents",
                  "item_7"
                )}
                {checklistRow(
                  "Item 8 - Collect Security Deposit from Students",
                  "item_8"
                )}
                {checklistRow(
                  "Item 9 - Regret Intimation Communicated to the applicants not selected",
                  "item_9"
                )}
                {checklistRow(
                  "Item 10 - Student details added to the DB",
                  "item_10"
                )}
                {checklistRow(
                  "Item 11 - Create a folder on SharePoint Central Repository for the program",
                  "item_11"
                )}
                {checklistRow(
                  "Item 12 - Create a WhatsApp group with students",
                  "item_12"
                )}
              </Tbody>
            </Table>
            <Button mt={4} colorScheme="teal" type="submit">
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Page;
