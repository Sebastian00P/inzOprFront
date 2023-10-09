import Comment from "../../../domain/model/Comment";

export interface ICommentRepository {
    /**
     * Method for retrieving comments by ad id
     * 
     * @param adId id of ad to filter comments
     * 
     * @returns list of comments
     */
    getCommentsByAdId(adId: number): Promise<Comment[]>

     /**
     * Method for creating comments
     * 
     * @param adId id of ad to filter comments
     * 
     * @returns list of comments
     */
     createComment(comment: Comment): Promise<boolean>
}