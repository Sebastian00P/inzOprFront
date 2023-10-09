import { useContext, useState } from 'react';
import { IAdsRepository } from '../data/repository/IAdsRepository';
import Ad from '../model/Ad';
import AdsRepository from '../../data/api/repository/AdsReposiotry';
import { AuthContext } from '../../components/utils/AuthContext';
import { BaseUrl } from '../../common/enums/ApiConfiguration';

export enum AdCreateState {
    INIT,
    SUCCESS,
    ERROR,
    LOADING
}

const useCreateAd = () => {
    const [adCreateState, setAdCreateState] = useState<AdCreateState>(AdCreateState.INIT);
    const { user } = useContext(AuthContext)

    const createAd = async (ad: Ad) => {
        setAdCreateState(AdCreateState.LOADING);
        if (user == null || user.role == "Guest") {
            setAdCreateState(AdCreateState.ERROR)
            return
        }
        
        try {
            const adsRepository: IAdsRepository = new AdsRepository(BaseUrl);
            const success = await adsRepository.createAd(ad, user);
            setAdCreateState(success ? AdCreateState.SUCCESS : AdCreateState.LOADING);
        } catch (error) {
            // Error occurred while creating the ad
            console.error(error);
            setAdCreateState(AdCreateState.ERROR)
        }
    };

    return { adCreateState, createAd };
};

export default useCreateAd;