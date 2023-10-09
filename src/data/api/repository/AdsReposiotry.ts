import Endpoint from "../../../common/enums/ApiConfiguration";
import { IAdsRepository } from "../../../domain/data/repository/IAdsRepository";
import Ad from "../../../domain/model/Ad";
import { AdApi } from "../model/AdApi";
import { mapAdsApiToAd as mapAdApiToAd, mapAdToAdsApi as mapAdToAdApi } from "../mappers/AdMapper";

class AdsRepository implements IAdsRepository {
    private baseUrl = "";

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    async deleteAd(id: number): Promise<void> {
        await fetch(`${this.baseUrl}${Endpoint.ADS_ENDPOINT}/DeleteAdd?adsId=${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    async getAllAds(): Promise<Ad[]> {
        const response = await fetch(`${this.baseUrl}${Endpoint.ADS_ENDPOINT}/GetAll`);
        const data = await response.json();
        const adsApi = data as AdApi[];
        return adsApi.map(mapAdApiToAd)
    }

    async createAd(ad: Ad): Promise<boolean> {
        const adApi = mapAdToAdApi(ad);

        const response = await fetch(`${this.baseUrl}${Endpoint.ADS_ENDPOINT}/Create`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(adApi),
        });

        return response.ok;
    }

    async getAdsByUserId(userId: number): Promise<Ad[]> {
        const response = await fetch(`${this.baseUrl}${Endpoint.ADS_ENDPOINT}/GetAllByUserId?userId=${userId}`);
        const data = await response.json();
        return (data as AdApi[]).map(mapAdApiToAd);
    }

    async getAdById(adsId: number): Promise<Ad> {
        const response = await fetch(`${this.baseUrl}${Endpoint.ADS_ENDPOINT}/GetAdsById?adsId=${adsId}`);
        const data = await response.json();
        return mapAdApiToAd(data as AdApi);
    }

    async editAd(ads: Ad): Promise<boolean> {
        const response = await fetch(`${this.baseUrl}${Endpoint.ADS_ENDPOINT}/EditAdd`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ads),
        });

        return response.ok
    }
}

export default AdsRepository