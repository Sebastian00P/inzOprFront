import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import Ad from '../../domain/model/Ad';
import AdListItem from './AdListItem';
import useGetAdsByUserId from '../../domain/useCase/useGetAdByUserId';
import { AuthContext } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserAdsList: React.FC = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    const { adsByUserIdState, getAdByUserId } = useGetAdsByUserId();
    const ads = useMemo<Array<Ad>>(() => adsByUserIdState.value, [adsByUserIdState.value]);

    const handleAdd = useCallback(() => {
        navigate("/createAd")
    }, [])

    useEffect(() => {
        getAdByUserId(user.userId)
    }, [])

    return (
        <div className="bg-gray-50 min-h-screen flex justify-center px-16">
            <div className="relative w-full">
                <div className="py-5 w-full flex items-cente justify-center">
                    <button
                        onClick={handleAdd}
                        className="bg-purple-300 hover:bg-purple-400 rounded-lg font-bold m-2 p-4"
                    >
                        Add book for sale
                    </button>
                </div>


                <div className="m-8 relative space-y-4">
                    {ads && ads.length ? (
                        ads.map((ad: Ad) => <AdListItem ad={ad} key={ad.isbn} isDeleteAvaliable={true}/>)
                    ) : (
                        <p className="w-48 bg-gray-300 rounded font-bold p-1">No books to display</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserAdsList;