import { useState } from 'react';
import { IUserRepository } from '../data/repository/IUserRepository';
import UserRepository from '../../data/api/repository/UserRepository';
import { BaseUrl } from '../../common/enums/ApiConfiguration';
import User from '../model/User';

export class LoginState {
    private constructor(private readonly key: string, public value: any) { }

    toString() { return this.key }

    static readonly INIT = new LoginState("INIT", null)
    static readonly LOADING = new LoginState("LOADING", null)
    static readonly SUCCESS = new LoginState("SUCCESS", null)
    static readonly ERROR = new LoginState("ERROR", null)
}

const useLogin = () => {
    const [loginState, setLoginState] = useState<LoginState>(LoginState.INIT)

    const tryLogin = async (username: string, password: string) => {
        setLoginState(LoginState.LOADING)
        try {
            const userRepository: IUserRepository = new UserRepository(BaseUrl);
            const user: User | null = await userRepository.tryLogin(username, password);
            const isSuccess = user != null
            const successState = LoginState.SUCCESS
            successState.value = user
            
            setLoginState(isSuccess ? LoginState.SUCCESS : LoginState.ERROR)
        } catch (error) {
            // Error occurred while making the request
            setLoginState(LoginState.ERROR)
        } 
    };

    return { loginState, tryLogin };
};

export default useLogin;