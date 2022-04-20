import React, { useState, useEffect } from "react";
import type { NextPage } from "next";

import {
  Box,
  Container,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";

import { API_PATH, useAuth } from "../../common";
import { ImageLinkWrapper } from "../../components";

const Page: NextPage = () => {
  useAuth("ADMIN");
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    fetch(`${API_PATH}/user/get_all`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  return (
    <Container>
      <Box>
        <Heading size="l">List of courses</Heading>
      </Box>

      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Admin</Th>
            <Th>Enabled</Th>
            <Th>Edit</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((user, index) => {
            return (
              <Tr key={index}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.is_admin === 1 ? <CheckIcon /> : ""}</Td>
                <Td>{user.enabled === 1 ? <CheckIcon /> : ""}</Td>
                <Td>
                  <ImageLinkWrapper>
                    <EditIcon
                      onClick={() => {
                        window.location.href = `/admin/edit/${user.user_id}`;
                      }}
                    />
                  </ImageLinkWrapper>
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
