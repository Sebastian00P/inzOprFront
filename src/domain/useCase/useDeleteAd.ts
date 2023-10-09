import { useContext, useState } from 'react';
import { IAdsRepository } from '../data/repository/IAdsRepository';
import AdsRepository from '../../data/api/repository/AdsReposiotry';
import { AuthContext } from '../../components/utils/AuthContext';
import { BaseUrl } from '../../common/enums/ApiConfiguration';

export enum AdDeleteState {
    INIT,
    SUCCESS,
    ERROR,
    LOADING
}

const useDeleteAd = () => {
    const [adDeleteState, setAdDeleteState] = useState<AdDeleteState>(AdDeleteState.INIT);
    const { user } = useContext(AuthContext)

    const deleteAd = async (adId: number) => {
        setAdDeleteState(AdDeleteState.LOADING);
        if (user == null || user.role == "Guest") {
            setAdDeleteState(AdDeleteState.ERROR)
            return
        }
        
        try {
            const adsRepository: IAdsRepository = new AdsRepository(BaseUrl);
            await adsRepository.deleteAd(adId);
        } catch (error) {
            // Error occurred while creating the ad
            console.error(error);
            setAdDeleteState(AdDeleteState.ERROR)
        }
    };

    return { adDeleteState, deleteAd };
};

export default useDeleteAd;