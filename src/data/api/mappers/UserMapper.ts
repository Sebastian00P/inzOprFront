import User from "../../../domain/model/User";
import { UserApi } from "../model/UserApi";

const mapUserToUserApi = (user: User): UserApi => {
    const { userId, userName, password, email, role } = user;
    return {
        userId,
        userName,
        password,
        email,
        role,
        isActive: true,
    };
};

const mapUserApiToUser = (userApi: UserApi): User => {
    const { userId, userName, password, email, role } = userApi;
    return {
        userId,
        userName,
        password,
        email,
        role
    };
};

export { mapUserToUserApi, mapUserApiToUser };