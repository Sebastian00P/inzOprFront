import { useState } from "react";
import { BaseUrl } from "../../common/enums/ApiConfiguration";
import { ICommentRepository } from "../data/repository/ICommentRepository";
import CommentRepository from "../../data/api/repository/CommentRepository";
import Comment from "../model/Comment";

export class CommentsByAdIdState {
    private constructor(private readonly key: string, public value: any) { }

    toString() { return this.key }

    static readonly INIT = new CommentsByAdIdState("INIT", null)
    static readonly LOADING = new CommentsByAdIdState("LOADING", null)
    static readonly SUCCESS = new CommentsByAdIdState("SUCCESS", null)
    static readonly ERROR = new CommentsByAdIdState("ERROR", null)
}

const useGetCommentsByAdId = () => {
    const [commentsByAdIdState, setCommentsByAdIdState] = useState<CommentsByAdIdState>(CommentsByAdIdState.INIT)

    const getCommentByAdId = async (id: number) => {
        setCommentsByAdIdState(CommentsByAdIdState.LOADING)
        try {
            const commentRepository: ICommentRepository = new CommentRepository(BaseUrl);
            const comments: Comment[] = await commentRepository.getCommentsByAdId(id);
            const state = CommentsByAdIdState.SUCCESS;
            state.value = comments

            setCommentsByAdIdState(state)
        } catch (error) {
            // Error occurred while fetching ads
            console.error(error);
            setCommentsByAdIdState(CommentsByAdIdState.ERROR)
        }
    }

    return { commentsByAdIdState, getCommentByAdId };
};

export default useGetCommentsByAdId;