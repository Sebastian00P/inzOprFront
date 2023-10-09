import { useEffect, useMemo } from "react";
import useGetCommentsByAdId, { CommentsByAdIdState } from "../../domain/useCase/useGetCommentsByAdId";
import Spinner from "../common/Spinner";
import Comment from "../../domain/model/Comment";

export interface IComment {
    adId: number
}

const CommentsList: React.FC<IComment> = (
    { adId }: IComment
) => {
    const { commentsByAdIdState, getCommentByAdId } = useGetCommentsByAdId()
    const comments = useMemo<Comment[] | null>(() => commentsByAdIdState.value, [adId, commentsByAdIdState.value])

    useEffect(() => {
        getCommentByAdId(adId)
    }, [])

    return (
        <div className="p-8 bg-gray-100 rounded-lg flex flex-col items-center justify-between space-x-8">
            <p className="self-start font-semibold">Comments:</p>
            <div className="flex flex-col w-full gap-2">
                {commentsByAdIdState == CommentsByAdIdState.LOADING && (<Spinner />)}
                {comments != null && !!comments.length && comments.map((comment: Comment) => (
                    <div className="font-semi-bold py-4 px-2 bg-gray-300 rounded w-full">
                        <p>{comment.content}</p>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default CommentsList;