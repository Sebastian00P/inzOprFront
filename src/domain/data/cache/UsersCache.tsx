import { Guest } from "../../../components/utils/AuthContext";
import User from "../../model/User";
import IUserCache from "./IUsersCache";

class UserCache implements IUserCache {
    private static instance: IUserCache;

    private constructor() { }

    public static getInstance(): IUserCache {
        if (!UserCache.instance) {
            UserCache.instance = new UserCache();
        }

        return UserCache.instance;
    }

    saveUser(user: User) {
        window.localStorage.setItem("user", JSON.stringify(user))
    }

    getCurrentUser(): User {
        const user: string | null = window.localStorage.getItem("user")

        if(user != null) {
            return JSON.parse(user)
        } else {
            return Guest
        }
    }
    
    clear() {
        window.localStorage.clear()
    }
}

export default UserCache;