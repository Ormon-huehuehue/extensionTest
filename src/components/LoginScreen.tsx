import { loginWithLinkedIn } from '@src/pages/background/handleLogin';
import React from 'react';

const LoginScreen = () => {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-5 lg:px-8 border-2 border-grayBorder mx-5 my-5 rounded-xl">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-headingText">
          Login
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-3" action="" method="POST">
          <div>
            <label htmlFor="email" className="block text-[12px] text-grayText">
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blueBackground sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-[12px] text-grayText">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blueBackground sm:text-sm/6"
              />
            </div>
          </div>

          <div className='mt-6'>
            <button
              type="button"
              className="flex w-full justify-center rounded-md bg-blueBackground px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueBackground cursor-pointer"
              formAction = ""
            >
              Login
            </button>
          </div>

          {/* Forgot password section moved below the login button */}
          <div className="text-center">
            <a href="#" className="text-sm font-semibold text-grayText hover:text-headingText">
              Forgot password?
            </a>
          </div>

          {/* Horizontal rule */}
          <hr className="my-6 border-gray-300" />

          {/* Sign in with LinkedIn button */}
          <div>
            <button
              type="button"
              className="flex w-full justify-center rounded-md bg-linkedInBackground px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueBackground cursor-pointer"
              onClick ={()=>loginWithLinkedIn()}
            >
              Sign in with LinkedIn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;