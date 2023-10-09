import { CommentApi } from "../model/CommentApi";
import Comment from "../../../domain/model/Comment";

export const mapToComment = (commentApi: CommentApi): Comment => {
  const { commentId, content, creationTime, adsId, userId } = commentApi;
  
  return {
    commentId,
    content,
    creationTime,
    adsId,
    userId,
  };
};

export const mapToCommentApi = (comment: Comment): CommentApi => {
  const { commentId, content, creationTime, adsId, userId } = comment;

  return {
    commentId,
    content,
    creationTime,
    adsId,
    userId,
  };
};