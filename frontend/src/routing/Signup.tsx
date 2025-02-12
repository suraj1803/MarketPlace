import {
  Text,
  VStack,
  Field,
  Input,
  Flex,
  Heading,
  Button,
} from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { PasswordInput } from "@/components/ui/password-input";
import Navbar from "../components/NavBar";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Link, useNavigate } from "react-router";
import axios from "axios";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name should be at least of 3 characters." }),
  email: z.string().email("Enter a valid email."),
  password: z
    .string()
    .min(6, { message: "Password should be at least of 6 characters." }),
});

type SignUpFormData = z.infer<typeof schema>;

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<SignUpFormData>({ resolver: zodResolver(schema) });

  const handleSignUp = async (data: FieldValues) => {
    try {
      const response = await axios.post("/api/signup", data, {
        headers: { "Content-Type": "application/json" },
      });

      if (!response.data.success) {
        setError("email", {
          type: "manual",
          message: response.data.message,
        });
        return;
      }

      console.log("User created successfully:", response.data);
      navigate("/");
    } catch (error: any) {
      reset();

      toaster.create({
        description: "Network error or server unreachable",
        type: "error",
        duration: 2000,
      });
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
            Signup
          </Heading>

          <Field.Root as={Form} onSubmit={handleSubmit(handleSignUp)}>
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
            {errors.name && (
              <Text color={"red"} fontSize="sm" mb="4">
                {errors.name.message}
              </Text>
            )}
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
              <Text color={"red"} fontSize="sm">
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
              SIGN UP
            </Button>
          </Field.Root>
          <Text fontSize={"14px"} mt="5">
            Already have an account ?
            <Text as={"u"} color={"teal"} ml={"7px"}>
              <Link to="/login">Login now</Link>
            </Text>
          </Text>
          <Toaster />
        </VStack>
      </Flex>
    </>
  );
};

export default Signup;
