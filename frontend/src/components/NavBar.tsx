import { HStack } from "@chakra-ui/react";
import DarkMode from "./DarkMode";

const Navbar = () => {
  return (
    <HStack justifyContent="end" padding={"5px"}>
      <DarkMode></DarkMode>
    </HStack>
  );
};

export default Navbar;
