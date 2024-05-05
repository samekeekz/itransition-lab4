"use server";

import prisma from "@/prisma/prisma";
import { SignupSchema } from "@/libs/signupSchema/signupSchema";
import bcrypt from "bcrypt";
import { SignInSchema } from "@/libs/signinSchema/signInSchema";
import { redirect } from "next/navigation";

export const signup = async (formData: SignupSchema) => {

  const isExistingUser = await prisma.user.findUnique({
    where: {
      email: formData.email,
    },
  });

  if (isExistingUser) {
    return {
      error: {
        message: "User already exists",
      },
    };
  }

  const hashedPassword = await bcrypt.hash(formData.password, 10);

  await prisma.user.create({
    data: {
      name: formData.name,
      email: formData.email,
      password: hashedPassword,
    },
  });

  redirect("/login");

};

export const login = async (formData: SignInSchema) => {

  const user = await prisma.user.findUnique({
    where: {
      email: formData.email,
    },
  });

  if (!user) {
    return {
      error: {
        message: "User not found",
      },
    };
  }

  const passwordMatch = await bcrypt.compare(formData.password, user.password);
  if (!passwordMatch) {
    return {
      error: {
        message: "Password incorrect",
      },
    };
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      last_login: new Date(),
    },
  });

  redirect("/");
};