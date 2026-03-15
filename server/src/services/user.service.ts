import prisma from "../db/prisma.ts";



const dbService = {
    user:{
        listUsers: async () => {
            const users = await prisma.user.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            });
            return users;
        },
        createUser: async (payload: { name: string; email: string; password: string }) => {
            const user = await prisma.user.create({
                data: {
                    name: payload.name,
                    email: payload.email,
                    password: payload.password,
                }
            });
            return user;
        },
        deleteUser: async (payload: { id: string }) => {
            const user = await prisma.user.delete({
                where: { id: payload.id }
            });
            return user;
        },
        updateUser: async (payload: { id: string; name?: string; email?: string; password?: string }) => {
            const user = await prisma.user.update({
                where: { id: payload.id },
                data: {
                    ...(payload.name && { name: payload.name }),
                    ...(payload.email && { email: payload.email }),
                    ...(payload.password && { password: payload.password }),
                }
            });
            return user;
        }
    }
}

export default dbService;

