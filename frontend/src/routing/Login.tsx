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
import axios from "axios";

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
    setError,
  } = useForm<LoginFormData>({ resolver: zodResolver(schema) });

  const handleLogin = async (data: FieldValues) => {
    try {
      const response = await axios.post("/api/login", data);

      // just for debugging lolllll🤣🤣
      console.log("Login Response:", response.data);

      if (!response.data.success) {
        setError("password", {
          type: "manual",
          message: "Invalid email or password.",
        });
        return;
      }
      const token = response.data.token;
      localStorage.setItem("token", token);

      // console.log("Login successful!");

      navigate("/");
    } catch (error) {
      console.error("An error occurred:", error);
    }
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
            <PasswordInput {...register("password")} size="lg" />

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
