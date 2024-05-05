import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { SignupSchema } from "@/libs/signupSchema/signupSchema";

export async function POST(req: Request, res: Response) {
  const userData: SignupSchema = await req.json();
  console.log(userData);
  const isExistingUser = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  if (isExistingUser) {
    return NextResponse.json({
      status: "error",
      error: {
        message: "User already exists",
      },
    });
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ status: "success", error: {} });

}