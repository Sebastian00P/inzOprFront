import Endpoint from "../../../common/enums/ApiConfiguration";
import { ICommentRepository } from "../../../domain/data/repository/ICommentRepository"; // TODO get rid of ../../ xd
import { mapToComment, mapToCommentApi } from "../mappers/CommentMapper";
import { CommentApi } from "../model/CommentApi";
import Comment from "../../../domain/model/Comment";

class CommentRepository implements ICommentRepository {
    private baseUrl = "";

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    async createComment(comment: Comment): Promise<boolean> {
        const commentApi = mapToCommentApi(comment);

        const response = await fetch(`${this.baseUrl}${Endpoint.COMMENTS_ENDPOINT}/CreateComment`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentApi),
        });

        return response.ok
    }

    async getCommentsByAdId(adId: number): Promise<Comment[]> {
        if(adId == undefined) {
            console.error(adId)
        }
        const response = await fetch(`${this.baseUrl}${Endpoint.COMMENTS_ENDPOINT}/GetAllByAdsId?adsId=${adId}`);
        const data = await response.json();
        const commentsApi = data as CommentApi[];

        return commentsApi.map(mapToComment)
    }
}

export default CommentRepository