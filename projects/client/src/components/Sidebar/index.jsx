/*eslint-disable*/
// chakra imports
import {
  Box, useColorModeValue
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import SidebarContent from "./SidebarContent";
import axios from "axios";
import './customSidebar.css';

function Sidebar(props) {
  const mainPanel = React.useRef();
  let variantChange = "0.2s linear";

  const { logoText, routes, sidebarVariant } = props;
  let sidebarBg = "none";
  let sidebarRadius = "0px";
  let sidebarMargins = "0px";
  if (sidebarVariant === "opaque") {
    sidebarBg = useColorModeValue("white", "gray.700");
    sidebarRadius = "16px";
    sidebarMargins = "16px 0px 16px 16px";
  }

  const [dataUser, setDataUser] = useState(null);
  let titlePage = '';
  if (dataUser?.roleId === 1) {
    titlePage = 'TUPO | ADMIN';
  }

  if (dataUser?.roleId === 2) {
    titlePage = 'TUPO | CASHIER';
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const result = await axios("http://localhost:3000/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataUser(result.data);
    };
    fetchData();
  }, []);

  return (
    <Box ref={mainPanel}>
      <Box display={{ sm: "none", xl: "block" }} position="fixed">
        <Box
          bg={sidebarBg}
          transition={variantChange}
          w="260px"
          maxW="260px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          h="calc(100vh - 32px)"
          ps="20px"
          pe="20px"
          m={sidebarMargins}
          borderRadius={sidebarRadius}
        >
        <SidebarContent routes={routes}
          logoText={titlePage}
          display="none"
          sidebarVariant={sidebarVariant}
        />
        </Box>
      </Box>
    </Box>
  );
}




export default Sidebar;