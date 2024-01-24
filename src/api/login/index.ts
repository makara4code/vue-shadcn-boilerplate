import type { UserType } from "./types"
import request from "@/axios";

interface RoleParams {
    roleName: string
}

export const loginApi = (data: UserType): Promise<IResponse<UserType>> => {
    return request.post({ url: '/mock/user/login', data });
}