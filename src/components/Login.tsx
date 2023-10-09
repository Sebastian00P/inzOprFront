import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import useLogin, { LoginState } from '../domain/useCase/useLogin';
import { AuthContext } from './utils/AuthContext';
import Spinner from './common/Spinner';
import Input, { InputType } from './common/Input';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginState, tryLogin } = useLogin()
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)

  const handleUsernameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }, [])

  const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, [])

  const handleSubmit = useCallback(() => {
    tryLogin(username, password);
  }, [username, password])

  useEffect(() => {
    if (loginState == LoginState.SUCCESS) {
      setUser(loginState.value);
      navigate("/");
    }
  }, [loginState, history]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 w-1/3 text-left bg-white shadow-lg rounded">
        <h3 className="text-2xl font-bold text-center">
          Login to account
        </h3>
        <div className="mt-4">
          <Input
            type={InputType.TEXT}
            label='Username'
            onChange={handleUsernameChange}
            value={username}
          />
          <div className="mt-4">
            <Input
              type={InputType.PASSWORD}
              label='Password'
              onChange={handlePasswordChange}
              value={password}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="flex items-center justify-center w-full px-4 py-2 mt-4 text-white bg-purple-300 rounded-lg hover:bg-purple-400"
          >
            {
              loginState == LoginState.LOADING ?
                <Spinner />
                :
                <p>Login</p>
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;