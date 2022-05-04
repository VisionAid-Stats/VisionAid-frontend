import React, { Fragment, useCallback } from "react";
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
import { useCookies } from "react-cookie";
import { TOKEN_NAME, useSession } from "../common";

const ImageWrapper = styled.div`
  img {
    cursor: pointer;
  }
`;

export const Navbar = () => {
  const [_cookie, _setCookie, removeCookie] = useCookies([TOKEN_NAME]);
  const { authenticated, isAdmin, userId } = useSession();

  const logout = useCallback(() => {
    removeCookie(TOKEN_NAME, { path: "/" });
    window.location.href = "/";
  }, [removeCookie]);

  return (
    <Flex
      as="nav"
      align="center"
      borderBottom={"1px solid lightgrey"}
      borderRadius={"20px"}
    >
      <Box>
        <ImageWrapper>
          <Image
            src={bannerImage}
            height={60}
            width={300}
            onClick={() => {
              window.location.href = "/";
            }}
            alt="Vision-Aid Logo"
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
            {authenticated && (
              <MenuItem
                onClick={() => {
                  window.location.href = "/students";
                }}
              >
                List students
              </MenuItem>
            )}
            <MenuItem
              onClick={() => {
                window.location.href = "/students/create";
              }}
            >
              Student Application Form
            </MenuItem>
          </MenuList>
        </Menu>
        {authenticated && (
          <Fragment>
            <Menu autoSelect={false}>
              <MenuButton as={Button} variant="ghost">
                Courses
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    window.location.href = "/courses/offering";
                  }}
                >
                  List course batches
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    window.location.href = "/courses/offering/create";
                  }}
                >
                  Add a course batch
                </MenuItem>
                {isAdmin && (
                  <Fragment>
                    <MenuItem
                      onClick={() => {
                        window.location.href = "/courses";
                      }}
                    >
                      List courses
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        window.location.href = "/courses/create";
                      }}
                    >
                      Add a course
                    </MenuItem>
                  </Fragment>
                )}
              </MenuList>
            </Menu>
            <Menu autoSelect={false}>
              <MenuButton as={Button} variant="ghost">
                Reports
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    window.location.href = "/reports/student";
                  }}
                >
                  Student Enrollment
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    window.location.href = "/reports/interests";
                  }}
                >
                  Course Interests
                </MenuItem>
              </MenuList>
            </Menu>
          </Fragment>
        )}
      </Box>
      <Spacer />
      <Fragment>
        {authenticated ? (
          <Fragment>
            {isAdmin ? (
              <Menu autoSelect={false}>
                <MenuButton as={Button} variant="ghost">
                  Admin
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      window.location.href = "/admin";
                    }}
                  >
                    Manage users
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      window.location.href = "/admin/createuser";
                    }}
                  >
                    Create user
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      window.location.href = "/trainers";
                    }}
                  >
                    List trainers
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      window.location.href = "/trainers/create";
                    }}
                  >
                    Add a trainer
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      window.location.href = "/centres";
                    }}
                  >
                    List centres
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      window.location.href = "/centres/create";
                    }}
                  >
                    Add a centre
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Menu autoSelect={false}>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  onClick={() => {
                    window.location.href = "/courses/offering/manage";
                  }}
                >
                  My courses
                </MenuButton>
              </Menu>
            )}

            <Menu autoSelect={false}>
              <MenuButton as={Button} variant="ghost">
                My Account
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    window.location.href = "/account";
                  }}
                >
                  Account settings
                </MenuItem>
                <MenuItem onClick={logout}>Log out</MenuItem>
              </MenuList>
            </Menu>
          </Fragment>
        ) : (
          <Menu autoSelect={false}>
            <MenuButton as={Button} variant="ghost">
              My Account
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  window.location.href = "/login";
                }}
              >
                Log In
              </MenuItem>
              <MenuItem
                onClick={() => {
                  window.location.href = "/signup";
                }}
              >
                Sign Up
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Fragment>
    </Flex>
  );
};
