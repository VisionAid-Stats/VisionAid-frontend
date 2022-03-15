import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import {
  Flex,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
  Button,
} from "@chakra-ui/react";
import bannerImage from "../public/banner.webp";

const ImageWrapper = styled.div`
  img {
    cursor: pointer;
  }
`;

export const Navbar = () => {
  return (
    <Flex as="nav" align="center">
      <Box>
        <ImageWrapper>
          <Image
            src={bannerImage}
            height={60}
            width={300}
            onClick={() => {
              window.location.href = "/";
            }}
          />
        </ImageWrapper>
      </Box>
      <Box>
        <Button
          variant="ghost"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Home
        </Button>
        <Menu autoSelect={false}>
          <MenuButton as={Button} variant="ghost">
            Students
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                window.location.href = "/students";
              }}
            >
              List students
            </MenuItem>
            <MenuItem
              onClick={() => {
                window.location.href = "/students/create";
              }}
            >
              Add a student
            </MenuItem>
          </MenuList>
        </Menu>
        <Menu autoSelect={false}>
          <MenuButton as={Button} variant="ghost">
            Courses
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                window.location.href = "/courses";
              }}
            >
              List courses
            </MenuItem>
            <MenuItem
              onClick={() => {
                window.location.href = "/courses/offering";
              }}
            >
              List course offerings
            </MenuItem>
            <MenuItem
              onClick={() => {
                window.location.href = "/courses/create";
              }}
            >
              Add a course
            </MenuItem>
            <MenuItem
              onClick={() => {
                window.location.href = "/courses/offering/create";
              }}
            >
              Add a course offering
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Spacer />
      <Menu autoSelect={false}>
        <MenuButton as={Button} variant="ghost">
          My Account
        </MenuButton>
        <MenuList>
          <MenuItem>Account settings</MenuItem>
          <MenuItem>Log out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
