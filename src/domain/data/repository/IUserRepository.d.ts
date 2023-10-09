import { UserApi } from "../../../data/api/model/UserApi"

export interface IUserRepository {
    /**
     * Method for performing login
     * 
     * @param username user login
     * @param password user password
     * 
     * @returns true if user logged in succesfully, false otherwise
     */
    tryLogin(username: string, password: string) : Promise<User | null>

    /**
     * Method for registering new user to website
     * 
     * @param username user login
     * @param password user password
     * @param email email to be assigned to user
     * 
     * @returns true if register completed succesfully, false otherwise
     */
    register(user: User) : Promise<boolean>

     /**
     * Method for logging out
     * 
     * @returns true if completed succesfully, false otherwise
     */
    logout(): boolean
}