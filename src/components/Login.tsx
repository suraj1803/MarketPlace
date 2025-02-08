import {
  Text,
  Link,
  VStack,
  Field,
  Input,
  Flex,
  Heading,
  Button,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import Navbar from "./NavBar";

const Login = () => {
  return (
    <>
      <Navbar></Navbar>
      <Flex height="100vh" align="center" justify="center">
        <VStack p="12" boxShadow="lg" borderRadius="lg" width="400px">
          <Heading mb={7} textStyle={"3xl"}>
            Welcome
          </Heading>
          <Field.Root>
            <Field.Label fontSize="lg" mb="2">
              Email
            </Field.Label>
            <Input id="email" placeholder="me@example.com" size="lg" mb="4" />
            <Field.Label fontSize="lg" mb="2">
              Password
            </Field.Label>
            <PasswordInput id="password" size="lg" />
          </Field.Root>
          <Button fontSize={"md"} mt={7} paddingX={7} width={"100%"}>
            Login
          </Button>
          <Text fontSize={"14px"} mt="5">
            Not a member?{" "}
            <Link variant="underline" colorPalette="teal">
              Sign up now
            </Link>
          </Text>
        </VStack>
      </Flex>
    </>
  );
};

export default Login;
