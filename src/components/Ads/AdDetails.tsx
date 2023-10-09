import { useParams } from "react-router-dom";
import useGetAdById, { AdByIdState } from "../../domain/useCase/useGetAdById";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Spinner from "../common/Spinner";
import Ad from "../../domain/model/Ad";
import CommentsList from "../Comments/CommentsList";
import { AuthContext } from "../utils/AuthContext";
import CommentAdd from "../Comments/CommentAdd";

const AdDetails: React.FC = () => {
    const { id } = useParams()
    const idNumber = useMemo(() => Number(id), [id])
    const { adByIdState, getAdById } = useGetAdById()
    const ad = useMemo<Ad | null>(() => adByIdState.value, [adByIdState.value])
    const { user } = useContext(AuthContext);

    const isUserLoggedIn = useCallback(() => {
        return user.role == "User" || user.role == "Admin"
    }, [user])

    useEffect(() => {
        getAdById(idNumber)
    }, [idNumber])

    return (
        <div className="bg-gray-50 min-h-screen flex justify-center px-16">
            <div className="relative w-full">
                <div className="m-8 relative space-y-4">
                    {adByIdState == AdByIdState.LOADING && (<Spinner />)}
                    {ad != null && (
                        <div className="bg-gray-100 rounded flex flex-col px-16 py-10">
                            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
                                {ad.title}
                            </h1>

                            <div>
                                <b>ISBN: </b>
                                {ad.isbn}
                            </div>

                            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight mt-10 text-gray-900">
                                Description
                            </h1>
                            <div>
                                {ad.description}
                            </div>
                            <p className="pt-10 text-gray-400">
                                <i>
                                    Created {new Date(ad.creationTime).toDateString()}
                                </i>
                            </p>
                        </div>
                    )}
                </div>
                <div className="m-8 relative space-y-4">
                    {ad != null && (
                        <CommentsList adId={ad.adId} />
                    )}
                    {ad != null && isUserLoggedIn() && <CommentAdd adId={ad.adId} />}
                </div>
            </div>
        </div>
    );
};

export default AdDetails;