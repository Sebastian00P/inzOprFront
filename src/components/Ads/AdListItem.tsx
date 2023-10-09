import { useNavigate } from "react-router-dom";
import Ad from "../../domain/model/Ad";
import { useCallback } from "react";
import useDeleteAd from "../../domain/useCase/useDeleteAd";

export interface IAdListItem {
    ad: Ad,
    isDeleteAvaliable: boolean
}

const AdListItem: React.FC<IAdListItem> = ({
    ad,
    isDeleteAvaliable
}: IAdListItem) => {
    const navigate = useNavigate()
    const { deleteAd } = useDeleteAd()

    const handleGoToAdDetails = useCallback(() => {
        navigate(`/ad/${ad.adId}`)
    }, [ad])

    const handleDelete = useCallback(() => {
        deleteAd(ad.adId)
        window.location.reload();
    }, [ad])

    return (
        <div className="p-8 bg-gray-100 rounded-lg flex items-center justify-between space-x-8">
            <div className="flex-1 flex justify-between items-center">
                <div className="flex flex-col">
                    <div className="w-48 bg-gray-300 rounded font-bold p-1">{ad.title}</div>
                    <div className="font-semi-bold py-2">
                        <p>{ad.description}</p>
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="p-3 rounded-lg bg-purple-300 cursor-pointer" onClick={handleGoToAdDetails}>Show more</div>
                    {isDeleteAvaliable && (
                        <div className="p-3 rounded-lg bg-red-500 cursor-pointer" onClick={handleDelete}>Delete</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdListItem;