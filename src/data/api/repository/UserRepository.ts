import Endpoint from "../../../common/enums/ApiConfiguration";
import { IUserRepository } from "../../../domain/data/repository/IUserRepository"
import User from "../../../domain/model/User";
import IUserCache from "../../../domain/data/cache/IUsersCache";
import UserCache from "../../../domain/data/cache/UsersCache";
import { mapUserApiToUser, mapUserToUserApi } from "../mappers/UserMapper";

class UserRepository implements IUserRepository {
    private baseUrl = "";

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    logout(): boolean {
        UserCache.getInstance().clear()
        return true
    }

    async tryLogin(username: string, password: string): Promise<User | null> {
        try {
            const response = await fetch(`${this.baseUrl}${Endpoint.USERS_ENDPOINT}/TryAuth?login=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
            
            if (response.ok) {
                // Login successful
                const user = await response.json();
                UserCache.getInstance().saveUser(user)
                return mapUserApiToUser(user);
            } else {
                // Login failed
                return null;
            }
        } catch (error) {
            // Error occurred while making the request
            console.error('Error during login:', error);
            return null;
        }
    }

    async register(user: User): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}${Endpoint.USERS_ENDPOINT}/Register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mapUserToUserApi(user))
            });

            if (response.ok) {
                // Registration successful
                return true;
            } else {
                // Registration failed
                return false;
            }
        } catch (error) {
            // Error occurred while making the request
            console.error('Error registering user:', error);
            return false;
        }
    }
}

export default UserRepository;