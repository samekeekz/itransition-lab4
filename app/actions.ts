"use server";

import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export const getUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

export const deleteUsers = async (id: string, userIds: string[]) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user || user.status !== "ACTIVE") {
    return { error: { message: "User status is not active" } };
  }

  await Promise.all(userIds.map(userId =>
    prisma.user.delete({
      where: {
        id: userId,
      },
    }),
  ));

  revalidatePath("/");

  return {
    success: {
      message: "Users deleted",
    },
  };
};


export const blockUsers = async (id: string, userIds: string[]) => {
  console.log(id, userIds);
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user || user.status !== "ACTIVE") {
    return { error: { message: "User status is not active" } };
  }

  await Promise.all(userIds.map(userId =>
    prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        status: "BLOCKED",
      },
    }),
  ));

  revalidatePath("/");

  return {
    success: {
      message: "Users blocked successfully",
    },
  };
};

export const unblockUsers = async (id: string, userIds: string[]) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user || user.status !== "ACTIVE") {
    return { error: { message: "User status is not active" } };
  }

  await Promise.all(userIds.map(userId =>
    prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        status: "ACTIVE",
      },
    }),
  ));

  revalidatePath("/");

  return {
    success: {
      message: "Users unblocked successfully",
    },
  };
};