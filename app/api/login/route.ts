import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";
import { SignInSchema } from "@/libs/signinSchema/signInSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const userData: SignInSchema = await req.json();
  console.log(userData);
  const user = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  if (!user) {
    return NextResponse.json({
      status: "error",
      error: {
        message: "User not found",
      },
    });
  }

  if (user.status === "BLOCKED") {
    return NextResponse.json({
      status: "error",
      error: {
        message: "User is blocked",
      },
    });
  }

  const passwordMatch = await bcrypt.compare(userData.password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({
      status: "error",
      error: {
        message: "Password does not match",
      },
    });
  }

  const date = new Date();
  date.setDate(date.getDate() + 2);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      last_login: date,
    },
  });

  const storedData = {
    id: user.id,
    name: user.name,
    status: user.status,
  };

  return NextResponse.json({ status: "success", error: {}, data: storedData });

}