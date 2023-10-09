import Ad from "../../../domain/model/Ad";
import User from "../../../domain/model/User";
import { AdApi } from "../model/AdApi";
import { mapUserToUserApi } from "./UserMapper";

export const mapAdsApiToAd = (adsApi: AdApi): Ad => {
    const { adsId, title, description, isbn, creationTime, expiredTime, userId } = adsApi;
    return {
      adId: adsId,
      title,
      description,
      isbn,
      creationTime,
      expiredTime,
      userId
    };
  };
  
  export const mapAdToAdsApi = (ad: Ad): AdApi => {
    return {
      adsId: ad.adId,
      title: ad.title,
      description: ad.description,
      isbn: ad.isbn,
      creationTime: ad.creationTime,
      expiredTime: ad.expiredTime,
      userId: ad.userId,
    };
  };