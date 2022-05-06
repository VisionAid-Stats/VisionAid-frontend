import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Table,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";

import { API_PATH, useAuth } from "../../../common";

const Page: NextPage = () => {
  useAuth("PM");
  const router = useRouter();
  const { id } = router.query;

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
      <Box>
        <HStack>
          <Heading size="l">Details for {data.name}</Heading>
          <Button
            mt={4}
            colorScheme="teal"
            onClick={() => {
              window.location.href = `/students/edit/${id}`;
            }}
          >
            Edit
          </Button>
        </HStack>
      </Box>
      <Table>
        <Tbody>
          <Tr>
            <Td>Student ID</Td>
            <Td>{data.student_id}</Td>
          </Tr>
          <Tr>
            <Td>Email</Td>
            <Td>{data.email}</Td>
          </Tr>
          <Tr>
            <Td>Age</Td>
            <Td>{data.age}</Td>
          </Tr>
          <Tr>
            <Td>Gender</Td>
            <Td>{data.gender}</Td>
          </Tr>
          <Tr>
            <Td>Visual Acuity</Td>
            <Td>{data.visual_acuity}</Td>
          </Tr>
          <Tr>
            <Td>Mobile #</Td>
            <Td>{data.mobile}</Td>
          </Tr>
          <Tr>
            <Td>What&apos;s App</Td>
            <Td>{data.whatsapp}</Td>
          </Tr>
          <Tr>
            <Td>Sharepoint URL</Td>
            <Td>
              <a href={data.sharepoint_url} target="_blank" rel="noreferrer">
                {data.sharepoint_url}
              </a>
            </Td>
          </Tr>
          <Tr>
            <Td>Address</Td>
            <Td>{data.address}</Td>
          </Tr>
          <Tr>
            <Td>Highest Education Received</Td>
            <Td>{data.education_qual}</Td>
          </Tr>
          <Tr>
            <Td>Education Details</Td>
            <Td>{data.education_detail}</Td>
          </Tr>
          <Tr>
            <Td>Mother Tongue</Td>
            <Td>{data.mother_tongue}</Td>
          </Tr>
          <Tr>
            <Td>Education Tongue</Td>
            <Td>{data.education_tongue}</Td>
          </Tr>
          <Tr>
            <Td>Computer Experience</Td>
            <Td>{data.computer_experience}</Td>
          </Tr>
          <Tr>
            <Td>Expectations</Td>
            <Td>{data.expectations}</Td>
          </Tr>
          <Tr>
            <Td>Permission to Share Info</Td>
            <Td>{data.share_permission}</Td>
          </Tr>
          <Tr>
            <Td>Bank Account</Td>
            <Td>{data.bank_account}</Td>
          </Tr>
          <Tr>
            <Td>Learning Objectives</Td>
            <Td>{data.learning_objectives}</Td>
          </Tr>
          <Tr>
            <Td>Visual Impairment</Td>
            <Td>{data.visual_impairment}</Td>
          </Tr>
          <Tr>
            <Td>Usable Vision</Td>
            <Td>{data.usable_vision}</Td>
          </Tr>
          <Tr>
            <Td>Percent Vision Loss</Td>
            <Td>
              {data.pct_vision_loss !== null ? `${data.pct_vision_loss}%` : ""}
            </Td>
          </Tr>
          <Tr>
            <Td>How did you hear about us</Td>
            <Td>{data.hear_about}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Container>
  );
};

export default Page;
