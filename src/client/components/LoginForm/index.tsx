import React, { useState } from 'react';

interface Message {
  userName: string;
  password: string;
}
interface LoginFormProps {
  onSubmit: any;
  errorMessage: Message;
  isSubmitting: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  errorMessage,
  isSubmitting
}) => {
  interface MockLogin {
    userName: string;
    password: string;
  }
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUserNameChange = (value: string) => {
    setUserName(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };
  const handleOnSubmit = ({ userName, password }: MockLogin) => {
    onSubmit({ userName, password });
  };

  // sample error message styling logic, may not be using it in the future
  return (
    <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='username'
        >
          Email
        </label>
        <input
          className={`shadow appearance-none border ${
            errorMessage.userName ? 'border-red-500' : ''
          } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
          id='username'
          type='text'
          value={userName}
          placeholder='Username'
          onChange={e => handleUserNameChange(e.target.value)}
        />
      </div>
      <p className='text-red-500 text-xs italic'>{errorMessage.userName}</p>
      <div className='mb-6'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='password'
        >
          Password
        </label>
        <input
          //   className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
          className={`shadow appearance-none border ${
            errorMessage.password ? 'border-red-500' : ''
          } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
          id='password'
          type='password'
          value={password}
          placeholder='******************'
          onChange={e => handlePasswordChange(e.target.value)}
        />
        <p className='text-red-500 text-xs italic'>{errorMessage.password}</p>
      </div>
      <div className='flex items-center justify-between'>
        {isSubmitting ? (
          <button
            className='bg-gray-300 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='button'
            onClick={() => {}}
            //   onClick={() => console.log("test")}
          >
            Signin in..
          </button>
        ) : (
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='button'
            onClick={() => handleOnSubmit({ userName, password })}
            //   onClick={() => console.log("test")}
          >
            Sign In
          </button>
        )}
        <a
          className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
          href='#'
        >
          Forgot Password?
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
