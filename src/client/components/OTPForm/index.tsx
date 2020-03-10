import React, { useState } from 'react';

interface Message {
  userName: string,
  password: string,
  otp: string
}

interface OTPFormProps {
  onSubmit: any,
  errorMessage: Message,
  isSubmitting: boolean,
  otpCode: string
}

const OTPForm: React.FC<OTPFormProps> = ({ onSubmit, errorMessage, isSubmitting, otpCode }) => {
  const handleOnSubmit = (otpInput: string) => {
    onSubmit(otpInput, otpCode)
}
  const [otpInput, setOtpInput] = useState<string>('');
  return (
    <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex-column align-center'>
      <div className='mb-4'>
      <label
        className='block text-gray-700 text-sm font-bold my-10 mt-5 text-center'
      >
          Enter OTP
      </label>
      <label
        className='block text-gray-700 text-sm font-bold my-5 text-center'
      >
        Please enter OTP sent to +65*****81
      </label>
        <input
        className={`w-full text-center shadow-inner py-2`}
        maxLength={6}
        type="text"
        placeholder={'XXXXXX'}
        value={otpInput} 
        onChange={e => setOtpInput(e.target.value)}

        />
      </div>
      <p className='text-red-500 text-xs italic'>
        {errorMessage.otp}
      </p>
      <div className="w-full flex my-5">  
        {isSubmitting ? (
          <button
            className='bg-gray-300 m-auto hover:bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='button'
            onClick={() => { }}
          //   onClick={() => console.log("test")}
          >
            Submitting...
              </button>
        ) : (
            <button
              className='bg-black m-auto text-white hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
              onClick={() => handleOnSubmit(otpInput)}
            >
              Verify
                </button>
          )}
        </div>
        <div className="w-full flex justify-center">
          <button className='font-bold hover:text-gray-700'>
            Resend
          </button>
          {/* in {60} seconds */}
        </div>
    </form>
  )
}

export default OTPForm;
