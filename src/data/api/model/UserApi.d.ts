import { AdApi } from "./AdApi";
import { CommentApi } from "./CommentApi";

export interface UserApi {
    userId: number;
    userName: string;
    password: string;
    email: string;
    role: string;
    isActive: boolean;
}