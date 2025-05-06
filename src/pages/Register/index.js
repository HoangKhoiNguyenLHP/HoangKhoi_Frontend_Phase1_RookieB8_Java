import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

const Register = () => {
  const [hidePassword, setHidePassword] = useState(true);

  const handleClickPasswordIcon = () => {
    setHidePassword(!hidePassword);
  }

  return (
    <>
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Register</h2>
        <p className="text-center text-gray-600 mb-6">Create an account to continue</p>
        
        {/* {error && <p className="text-red-500 mb-4 text-sm">{error}</p>} */}

        <form 
          // onSubmit={handleSubmit} 
          className="space-y-5"
        >
          <div>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Ex: Le"
              // value={formData.firstName}
              // onChange={handleChange}
              className="w-full h-14 px-4 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Ex: Van A"
              // value={formData.lastName}
              // onChange={handleChange}
              className="w-full h-14 px-4 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Ex: leva@gmail.com"
              // value={formData.email}
              // onChange={handleChange}
              className="w-full h-14 px-4 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="password">
              Password
            </label>
            <input
              name="password"
              id="password" 
              type={hidePassword ? "password" : "text"} 
              // value={formData.password}
              // onChange={handleChange}
              className="w-full h-14 px-4 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="absolute top-[2.12222em] text-[1.33333em] right-5 text-lg text-gray-600 cursor-pointer" 
              onClick={handleClickPasswordIcon}
            >
              {hidePassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="agreement"
              name="agreement"
              // checked={formData.agreement}
              // onChange={handleChange}
              className="w-5 h-5"
            />
            <label htmlFor="agreement" className="text-gray-600 text-sm">
              I accept the terms and conditions
            </label>
          </div>

          <button type="submit" className="w-full h-14 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all">
            Register
          </button>
        </form>

        <div className="text-center mt-6">
          <span className="text-gray-600">Already have an account?</span>
          <a href="/admin/account/login" className="text-blue-500 font-bold ml-2 underline">
            Log in
          </a>
        </div>
      </div>
    </>
  );
}

export default Register;