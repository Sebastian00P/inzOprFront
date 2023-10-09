import { UserApi } from "./UserApi";
import { CommentApi } from "./CommentApi";

export interface AdApi {
    adsId: number;
    title: string;
    description: string;
    isbn: string;
    creationTime: string;
    expiredTime: string;
    userId: number;
}