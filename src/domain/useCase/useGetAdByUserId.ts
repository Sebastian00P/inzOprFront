import { useState } from "react";
import Ad from "../model/Ad";
import { IAdsRepository } from "../data/repository/IAdsRepository";
import { BaseUrl } from "../../common/enums/ApiConfiguration";
import AdsRepository from "../../data/api/repository/AdsReposiotry";

export class AdsByUserIdState {
    private constructor(private readonly key: string, public value: any) { }

    toString() { return this.key }

    static readonly INIT = new AdsByUserIdState("INIT", null)
    static readonly LOADING = new AdsByUserIdState("LOADING", null)
    static readonly SUCCESS = new AdsByUserIdState("SUCCESS", null)
    static readonly ERROR = new AdsByUserIdState("ERROR", null)
}

const useGetAdsByUserId = () => {
    const [adsByUserIdState, setAdsByUserIdState] = useState<AdsByUserIdState>(AdsByUserIdState.INIT)

    const getAdByUserId = async (id: number) => {
        setAdsByUserIdState(AdsByUserIdState.LOADING)
        try {
            const adsRepository: IAdsRepository = new AdsRepository(BaseUrl);
            const ads: Ad[] = await adsRepository.getAdsByUserId(id);
            const state = AdsByUserIdState.SUCCESS;
            state.value = ads

            setAdsByUserIdState(state)
        } catch (error) {
            // Error occurred while fetching ads
            console.error(error);
            setAdsByUserIdState(AdsByUserIdState.ERROR)
        }
    }

    return { adsByUserIdState, getAdByUserId };
};

export default useGetAdsByUserId;