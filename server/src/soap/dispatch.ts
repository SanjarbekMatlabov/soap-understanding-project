import { createHandler } from "../handlers/user.create.ts"
import { deleteHandler } from "../handlers/user.delete.ts"
import { listHandler } from "../handlers/user.list.ts"
import { updateHandler } from "../handlers/user.update.ts"



export const dispatch = (operationType: any, payload:any) => {
    switch(operationType){
        case "createUserRequest":
            return createHandler(payload)
        case "listUserRequest":
            return listHandler()
        case "deleteUserRequest":
            return deleteHandler(payload)
        case "updateUserRequest":
            return updateHandler(payload)
    }
}