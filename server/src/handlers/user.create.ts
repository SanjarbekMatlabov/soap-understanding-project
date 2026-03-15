import dbService from "../services/user.service.ts";

export const createHandler = async (payload: { name: string; email: string; password: string }) => {
    const user = await dbService.user.createUser(payload);
    return user;
}