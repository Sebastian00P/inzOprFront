import { BaseUrl } from "../../common/enums/ApiConfiguration";
import UserRepository from "../../data/api/repository/UserRepository";
import { IUserRepository } from "../data/repository/IUserRepository";

const useLogout = () => {
    const logout = async () => {
        const userRepository: IUserRepository = new UserRepository(BaseUrl);
        userRepository.logout()
    };

    return { logout };
};

export default useLogout;