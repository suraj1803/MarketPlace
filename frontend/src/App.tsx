import { Link } from "react-router";
import { Text } from "@chakra-ui/react";

const App = () => {
  return (
    <>
      <Text>Home</Text>
      <Text as={"u"} color={"teal"} ml={"7px"}>
        <Link to="/login">Login</Link>
      </Text>
      <Text as={"u"} color={"teal"} ml={"7px"}>
        <Link to="/signup">Signup</Link>
      </Text>
    </>
  );
};

export default App;
