import Ad from "../../model/Ad";
import User from "../../model/User";

export interface IAdsRepository {
    /**
     * Method for getting all avaliable ads
     * 
     * @returns list of Ads
     */
    getAllAds() : Promise<Ad[]>

    /**
     * Method for creating ad
     * 
     * @param ads new ad to be created
     * 
     * @returns true if creation was succesful, false otherwise
     */
    createAd(ads: Ad, user: User) : Promise<boolean>

    /**
     * Method for editing an ad
     * 
     * @param asd ad to be edited TODO check if addId is not necessary!
     * 
     * @returns true if edit was sucessful, false otherwise
     */
    editAd(asd: Ad): Promise<boolean>

    /**
     * Method for retrieving ads by user Id
     * 
     * @param userId user id to apply filter
     * 
     * @returns list of ads
     */
    getAdsByUserId(userId: number): Promise<Ad[]>

    /**
     * Method for retrieving ads by ad id
     * 
     * @param id id of ad
     * 
     * @returns list of ads
     */
    getAdById(id: number): Promise<Ad>

    /**
     * Method for deleting ad
     * 
     * @param id id of ad
     */
    deleteAd(id: number): Promise<void>
}