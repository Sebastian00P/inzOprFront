import { useCallback, useContext, useState } from "react"
import useCreateComment, { CommentCreateState } from "../../domain/useCase/useCreateComment"
import Spinner from "../common/Spinner"
import { AuthContext } from "../utils/AuthContext"
import Comment from "../../domain/model/Comment"

export interface ICommentAdd {
    adId: number
}

const CommentAdd: React.FC<ICommentAdd> = ({
    adId
}: ICommentAdd) => {
    const { user } = useContext(AuthContext);
    const [content, setContent] = useState<string>("")
    const { commentCreateState, createComment } = useCreateComment()
    const handleCommentChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value)
    }, [content])

    const handlePostComment = useCallback(() => {
        const comment: Comment = {
            commentId: 0,
            content,
            adsId: adId,
            userId: user.userId,
            creationTime: new Date().toJSON()
        }
        createComment(comment)
    }, [content, user])

    return (
        <div className="p-8 bg-gray-100 rounded-lg flex items-center justify-between space-x-8">
            <div className="flex-1 flex flex-col justify-between">
                <label>Write comment:</label>
                <textarea
                    value={content}
                    onChange={handleCommentChange}
                    className="bg-transparent my-3 ring-1 ring-purple-300 p-2 focus:outline-none rounded w-full h-full"
                />

                <button
                    className="w-1/3 text-white p-3 bg-purple-300 rounded-lg hover:bg-purple-400 self-end"
                    onClick={handlePostComment}
                >
                    {commentCreateState == CommentCreateState.LOADING ? (
                        <Spinner />
                    ) : (
                        <p>Post</p>
                    )}
                </button>
            </div>
        </div>
    )
}

export default CommentAdd;