import { useEffect, useState } from "react";
import Ad from "../model/Ad";
import { IAdsRepository } from "../data/repository/IAdsRepository";
import { BaseUrl } from "../../common/enums/ApiConfiguration";
import AdsRepository from "../../data/api/repository/AdsReposiotry";

export class AdsState {
    private constructor(private readonly key: string, public value: any) { }

    toString() { return this.key }

    static readonly INIT = new AdsState("INIT", null)
    static readonly LOADING = new AdsState("LOADING", null)
    static readonly SUCCESS = new AdsState("SUCCESS", null)
    static readonly ERROR = new AdsState("ERROR", null)
}

const useGetAllAds = () => {
    const [adsState, setAdsState] = useState<AdsState>(AdsState.INIT)
  
    useEffect(() => {
      const fetchAllAds = async () => {
        try {
          const adsRepository: IAdsRepository = new AdsRepository(BaseUrl);
          const allAds: Ad[] = await adsRepository.getAllAds();
          const state = AdsState.SUCCESS;
          state.value = allAds
          
          setAdsState(state)
        } catch (error) {
          // Error occurred while fetching ads
          console.error(error);
          setAdsState(AdsState.ERROR)
        }
      };
  
      setAdsState(AdsState.LOADING)
      fetchAllAds();
    }, []);
  
    return { adsState };
  };

  export default useGetAllAds;