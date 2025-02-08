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
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router";
import { FieldValues, useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const handleLogin = (data: FieldValues) => {
    // Perform login logic here
    // On success:

    console.log(data);
  };
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
            <Input
              {...register("email")}
              id="email"
              placeholder="me@example.com"
              size="lg"
              mb="4"
            />
            <Field.Label fontSize="lg" mb="2">
              Password
            </Field.Label>
            <PasswordInput {...register("password")} id="password" size="lg" />
            <Button
              type="submit"
              fontSize={"md"}
              mt={7}
              paddingX={7}
              width={"100%"}
              onClick={handleSubmit(handleLogin)}
            >
              Login
            </Button>
          </Field.Root>
          <Text fontSize={"14px"} mt="5">
            Not a member?{" "}
            <Link variant="underline" href="/signup" colorPalette="teal">
              Sign up now
            </Link>
          </Text>
        </VStack>
      </Flex>
    </>
  );
};

export default Login;
