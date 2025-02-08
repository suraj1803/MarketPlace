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
import { FieldValues, useForm } from "react-hook-form";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const handleSignUp = (data: FieldValues) => {
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
            Signup
          </Heading>
          <Field.Root>
            <Field.Label fontSize="lg" mb="2">
              Name
            </Field.Label>
            <Input
              {...register("name")}
              id="name"
              placeholder="John Doe"
              size="lg"
              mb="4"
            />
            <Field.Label fontSize="lg" mb="2">
              Email
            </Field.Label>
            <Input
              {...register("email")}
              id="email"
              placeholder="johndoe@gmail.com"
              size="lg"
              mb="4"
            />
            <Field.Label fontSize="lg" mb="2">
              Password
            </Field.Label>
            <PasswordInput {...register("password")} id="password" size="lg" />
            <Button
              onClick={handleSubmit(handleSignUp)}
              fontSize={"md"}
              mt={7}
              paddingX={7}
              width={"100%"}
            >
              SIGN UP
            </Button>
          </Field.Root>
          <Text fontSize={"14px"} mt="5">
            Already have an account ?{" "}
            <Link
              paddingX={"3px"}
              variant="underline"
              href="/"
              colorPalette="teal"
            >
              Login Now
            </Link>
          </Text>
        </VStack>
      </Flex>
    </>
  );
};

export default Signup;
