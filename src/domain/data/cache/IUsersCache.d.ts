import User from "../../model/User";

export default interface IUserCache {
    /**
     * Method for saving user in cache
     * 
     * @param user User object to be saved
     */
    static saveUser(user: User)

    /**
     * Method for getting current user from cache
     * 
     * @returns current user
     */
    static getCurrentUser(): User

     /**
     * Method for clearing cache
     */
    static clear()
}