import { AdApi } from "./AdApi";
import { UserApi } from "./UserApi";

export interface CommentApi {
    commentId: number;
    content: string;
    creationTime: string;
    adsId: number;
    userId: number;
}