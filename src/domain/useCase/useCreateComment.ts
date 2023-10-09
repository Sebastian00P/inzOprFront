import { useContext, useState } from 'react';
import { AuthContext } from '../../components/utils/AuthContext';
import { BaseUrl } from '../../common/enums/ApiConfiguration';
import CommentRepository from '../../data/api/repository/CommentRepository';
import { ICommentRepository } from '../data/repository/ICommentRepository';
import Comment from '../model/Comment';

export enum CommentCreateState {
    INIT,
    SUCCESS,
    ERROR,
    LOADING
}

const useCreateComment = () => {
    const [commentCreateState, setCommentCreateState] = useState<CommentCreateState>(CommentCreateState.INIT);
    const { user } = useContext(AuthContext)

    const createComment = async (comment: Comment) => {
        setCommentCreateState(CommentCreateState.LOADING);
        if (user == null || user.role == "Guest") {
            setCommentCreateState(CommentCreateState.ERROR)
            return
        }
        
        try {
            const adsRepository: ICommentRepository = new CommentRepository(BaseUrl);
            const success = await adsRepository.createComment(comment);
            setCommentCreateState(success ? CommentCreateState.SUCCESS : CommentCreateState.LOADING);
        } catch (error) {
            // Error occurred while creating the ad
            console.error(error);
            setCommentCreateState(CommentCreateState.ERROR)
        }
    };

    return { commentCreateState, createComment };
};

export default useCreateComment;