import React, { useState } from 'react';
import useRegister, { RegistrationState } from '../domain/useCase/useRegister';
import User from '../domain/model/User';
import Spinner from './common/Spinner';
import Input, { InputType } from './common/Input';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { registrationState, registerUser } = useRegister()
  const navigate = useNavigate()

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    var user: User = {
      userId: 0,
      userName: username,
      password: password,
      email: email,
      role: "User"
    }

    await registerUser(user)

    navigate("/login")
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 w-1/3 text-left bg-white shadow-lg rounded">
        <h3 className="text-2xl font-bold text-center">
          Register
        </h3>
        <div className="mt-4">
          <div className="mt-4">
            <Input
              type={InputType.TEXT}
              label='Username'
              onChange={handleUsernameChange}
              value={username}
            />
          </div>
          <div className="mt-4">
            <Input
              type={InputType.TEXT}
              label='Email'
              onChange={handleEmailChange}
              value={email}
            />
          </div>
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
              registrationState == RegistrationState.LOADING ? (
                <Spinner />
              ) : (
                <p>Register</p>
              )
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;