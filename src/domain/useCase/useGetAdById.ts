import { useState } from "react";
import Ad from "../model/Ad";
import { IAdsRepository } from "../data/repository/IAdsRepository";
import { BaseUrl } from "../../common/enums/ApiConfiguration";
import AdsRepository from "../../data/api/repository/AdsReposiotry";

export class AdByIdState {
    private constructor(private readonly key: string, public value: any) { }

    toString() { return this.key }

    static readonly INIT = new AdByIdState("INIT", null)
    static readonly LOADING = new AdByIdState("LOADING", null)
    static readonly SUCCESS = new AdByIdState("SUCCESS", null)
    static readonly ERROR = new AdByIdState("ERROR", null)
}

const useGetAdById = () => {
    const [adByIdState, setAdByIdState] = useState<AdByIdState>(AdByIdState.INIT)

    const getAdById = async (id: number) => {
        setAdByIdState(AdByIdState.LOADING)
        try {
            const adsRepository: IAdsRepository = new AdsRepository(BaseUrl);
            const ad: Ad = await adsRepository.getAdById(id);
            const state = AdByIdState.SUCCESS;
            state.value = ad

            setAdByIdState(state)
        } catch (error) {
            // Error occurred while fetching ads
            console.error(error);
            setAdByIdState(AdByIdState.ERROR)
        }
    }

    return { adByIdState, getAdById };
};

export default useGetAdById;