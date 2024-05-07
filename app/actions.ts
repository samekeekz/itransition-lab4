"use server";

import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";


type User = {
  id: string;
  name: string;
  status: string;
};


export const deleteUsers = async (id: string, userIds: string[]) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user || user.status !== "ACTIVE") {
    deleteCookie();
    return { error: { message: "User status is not active" }, redirect: "/login" };
  }

  await Promise.all(userIds.map(userId =>
    prisma.user.delete({
      where: {
        id: userId,
      },
    }),
  ));

  if (userIds.includes(id)) {
    deleteCookie();
    return { error: { message: "User deleted" }, redirect: "/login" };
  }

  revalidatePath("/", "page");

  return {
    success: {
      message: "Users deleted",
    },
  };
};


export const blockUsers = async (id: string, userIds: string[]) => {
  const user = await prisma.user.findUnique({ where: { id } });
  console.log(user);
  if (!user || user.status !== "ACTIVE") {
    deleteCookie();
    return { error: { message: "User status is not active" }, redirect: "/login" };
  }

  await Promise.all(userIds.map(userId =>
    prisma.user.update({
      where: { id: userId },
      data: {
        status: "BLOCKED",
      },
    }),
  ));

  revalidatePath("/", "page");

  return {
    success: {
      message: "Users blocked successfully",
    },
  };
};

export const unblockUsers = async (id: string, userIds: string[]) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user || user.status !== "ACTIVE") {
    deleteCookie();
    return { error: { message: "User status is not active" }, redirect: "/login" };
  }

  await Promise.all(userIds.map(userId =>
    prisma.user.update({
      where: { id: userId },
      data: {
        status: "ACTIVE",
      },
    }),
  ));

  revalidatePath("/", "page");

  return {
    success: {
      message: "Users unblocked successfully",
    },
  };
};

const deleteCookie = () => {
  cookies().delete("userData");

};

export const logOut = async () => {
  deleteCookie();
  return {
    success: {
      message: "Logged out successfully",
    },
    redirect: "/login",
  };
};
