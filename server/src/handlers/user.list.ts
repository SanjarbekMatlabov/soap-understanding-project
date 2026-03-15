import dbService from "../services/user.service.ts";

export const listHandler = async () => {
    const users = await dbService.user.listUsers();
    return users;
}