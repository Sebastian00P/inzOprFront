import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Spinner from "../common/Spinner";
import { AuthContext } from "../utils/AuthContext";
import Input, { InputType } from "../common/Input";
import useCreateAd, { AdCreateState } from "../../domain/useCase/useCreateAd";
import Ad from "../../domain/model/Ad";
import { useNavigate } from "react-router-dom";

const CreateAd: React.FC = () => {
    const { user } = useContext(AuthContext);

    const [title, setTitle] = useState("")
    const [isbn, setIsbn] = useState("")
    const [description, setDescription] = useState("")
    const { adCreateState, createAd } = useCreateAd()
    const navigate = useNavigate()

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleIsbnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsbn(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleSubmit = useCallback(() => {
        const ad: Ad = {
            adId: 0,
            title,
            isbn,
            description,
            creationTime: new Date().toJSON(),
            userId: user.userId,
            expiredTime: new Date(Date.now() + 12096e5).toJSON()
        }

        createAd(ad)
        navigate("/myBooks")
    }, [title, description, isbn, user])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 w-1/3 text-left bg-white shadow-lg rounded">
                <h3 className="text-2xl font-bold text-center">
                    Create new book advertisement
                </h3>
                <div className="mt-4">
                    <div className="mt-4">
                        <Input
                            type={InputType.TEXT}
                            label='Title'
                            onChange={handleTitleChange}
                            value={title}
                        />
                    </div>
                    <div className="mt-4">
                        <Input
                            type={InputType.TEXT}
                            label='ISBN'
                            onChange={handleIsbnChange}
                            value={isbn}
                        />
                    </div>
                    <div className="mt-4">
                        <Input
                            type={InputType.TEXT}
                            label='Description'
                            onChange={handleDescriptionChange}
                            value={description}
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="flex items-center justify-center w-full px-4 py-2 mt-4 text-white bg-purple-300 rounded-lg hover:bg-purple-400"
                    >
                        {
                            adCreateState == AdCreateState.LOADING ? (
                                <Spinner />
                            ) : (
                                <p>Create</p>
                            )
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateAd;