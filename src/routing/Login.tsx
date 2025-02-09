import {
  Text,
  VStack,
  Field,
  Input,
  Flex,
  Heading,
  Button,
} from "@chakra-ui/react";

import { Link } from "react-router";

import { PasswordInput } from "@/components/ui/password-input";
import Navbar from "../components/NavBar";
import { Form, useNavigate } from "react-router";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Enter a valid email."),
  password: z
    .string()
    .min(6, { message: "Password should be at least of 6 characters." }),
});

type LoginFormData = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(schema) });

  const handleLogin = (data: FieldValues) => {
    // Perform login logic here
    // On success:

    console.log(data);
  };
  return (
    <>
      <Navbar></Navbar>
      <Flex height="100vh" align="center" justify="center">
        <VStack
          p="10"
          boxShadow="lg"
          borderRadius="lg"
          width={{ base: "90%", sm: "400px" }}
        >
          <Heading mb={7} textStyle={"3xl"}>
            Welcome
          </Heading>

          <Field.Root as={Form} onSubmit={handleSubmit(handleLogin)}>
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
            {errors.email && (
              <Text color={"red"} fontSize="sm" mb="4">
                {errors.email.message}
              </Text>
            )}
            <Field.Label fontSize="lg" mb="2">
              Password
            </Field.Label>
            <PasswordInput
              {...register("password")}
              id="password"
              size="lg"
              mb="4"
            />
            {errors.password && (
              <Text color={"red"} fontSize="sm" mb="4">
                {errors.password.message}
              </Text>
            )}
            <Button
              type="submit"
              fontSize={"md"}
              mt={7}
              paddingX={7}
              width={"100%"}
            >
              Login
            </Button>
          </Field.Root>
          <Text fontSize={"14px"} mt="5">
            Not a member?{" "}
            <Text as={"u"} color={"teal"} ml={"7px"}>
              <Link to="/signup">Sign up now</Link>
            </Text>
          </Text>
        </VStack>
      </Flex>
    </>
  );
};

export default Login;
