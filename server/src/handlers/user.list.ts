import prisma from "../db/prisma.ts"
import { listUsers } from "../services/user.service.ts"

export const listHandler = async () => {
    const users = await listUsers();
    return users;
}