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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name should be atleast of 3 characters." }),
  email: z.string().email("Enter a valid email."),
  password: z
    .string()
    .min(6, { message: "Password should be at least of 6 characters." }),
});

type SignUpFormData = z.infer<typeof schema>;

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({ resolver: zodResolver(schema) });
  const handleSignUp = (data: FieldValues) => {
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
            />
            {errors.name && (
              <Text color={"red"} fontSize="sm">
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
            />
            {errors.email && (
              <Text color={"red"} fontSize="sm">
                {errors.email.message}
              </Text>
            )}
            <Field.Label fontSize="lg" mb="2">
              Password
            </Field.Label>
            <PasswordInput {...register("password")} id="password" size="lg" />
            {errors.password && (
              <Text color={"red"} fontSize="sm">
                {errors.password.message}
              </Text>
            )}

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
