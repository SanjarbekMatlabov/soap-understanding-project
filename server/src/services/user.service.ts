import prisma from "../db/prisma.ts";

export const listUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}