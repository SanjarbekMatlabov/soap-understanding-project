import dbService from "../services/user.service.ts";

export const updateHandler = async (payload: { id: string; name?: string; email?: string; password?: string }) => {
    const user = await dbService.user.updateUser(payload);
    return user;
}