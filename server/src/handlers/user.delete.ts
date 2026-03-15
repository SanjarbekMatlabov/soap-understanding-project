import dbService from "../services/user.service.ts";

export const deleteHandler = async (payload: { id: string }) => {
    const user = await dbService.user.deleteUser(payload);
    return user;
}