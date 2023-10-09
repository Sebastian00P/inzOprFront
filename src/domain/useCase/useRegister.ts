import { useState } from 'react';
import User from '../model/User';
import { IUserRepository } from '../data/repository/IUserRepository';
import UserRepository from '../../data/api/repository/UserRepository';
import { BaseUrl } from '../../common/enums/ApiConfiguration';

export enum RegistrationState {
    LOADING,
    ERROR,
    SUCCESS,
    INIT
}

const useRegister = () => {
    const [registrationState, setRegistrationState] = useState<RegistrationState>(RegistrationState.INIT);

    const registerUser = async (user: User) => {
        setRegistrationState(RegistrationState.LOADING)
        try {
            const userRepository: IUserRepository = new UserRepository(BaseUrl);
            const isSuccess = await userRepository.register(user);

            setRegistrationState(isSuccess ? RegistrationState.SUCCESS : RegistrationState.ERROR)
        } catch (error) {
            // Error occurred while registering user
            console.error('Error registering user:', error);
            setRegistrationState(RegistrationState.ERROR)
        } finally {
            setRegistrationState(RegistrationState.INIT)
        }
    };

    return { registrationState, registerUser };
};

export default useRegister;