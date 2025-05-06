import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

import { loginAccount } from "../../services/accountAdminService";

import { setCookie } from "../../helpers/cookie";

const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);

  const handleClickPasswordIcon = () => {
    setHidePassword(!hidePassword);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    const dataSubmit = {
      email: email,
      password: password
    };

    const dataFromBE = await loginAccount(dataSubmit);
    console.log(dataFromBE);

    if(dataFromBE.code == 200)
    {
      const token = dataFromBE.data.token;
      const expireAt = new Date(dataFromBE.data.expireAt);

      setCookie("token", token, expireAt);

      // looking from API : API companies
      // setCookie("id", data[0].id, expiredDays);
      // setCookie("companyName", data[0].companyName, expiredDays);
      // setCookie("email", data[0].email, expiredDays);
      // setCookie("token", data[0].token, expiredDays);


      // not care about true, false
      // only cares about changing state
      // because need to change UI of Header
      // dispatch(checkAuthen(true));


      // login successfully
      // then navgiate back to Home page
      // this code only navigates
      // this code does not help to reload page or else
      // navigate("/");
    }
    else {
      alert("Email or password incorrect!");
    }
  }

  return (
    <>
      <div className="max-w-lg bg-white mx-auto rounded-2xl p-12">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-4">Login</h2>
        <p className="text-center text-base font-semibold text-gray-700 mb-8">
          Vui lòng nhập email và mật khẩu để tiếp tục
        </p>

        <form 
          className="mb-8 space-y-6" 
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Ví dụ: levana@gmail.com"
              className="w-full h-14 bg-gray-100 border border-gray-300 rounded-lg px-4 text-sm font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Mật khẩu
            </label>
            <input
              type={hidePassword ? "password" : "text"} 
              id="password"
              className="w-full h-14 bg-gray-100 border border-gray-300 rounded-lg px-4 text-sm font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="absolute top-[2.12222em] text-[1.33333em] right-5 text-lg text-gray-600 cursor-pointer" 
              onClick={handleClickPasswordIcon}
            >
              {hidePassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                id="remember-password"
                type="checkbox"
                className="w-6 h-6"
                // checked={rememberPassword}
                // onChange={(e) => setRememberPassword(e.target.checked)}
              />
              <label htmlFor="remember-password" className="text-sm font-semibold text-gray-600">
                Nhớ mật khẩu
              </label>
            </div>
            <a href="/account/forgot-password" className="text-sm font-semibold text-gray-600 hover:text-blue-600">
              Quên mật khẩu?
            </a>
          </div>

          {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}

          <button
            type="submit"
            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
          >
            Đăng nhập
          </button>
        </form>

        <div className="text-center">
          <span className="text-sm font-semibold text-gray-600">Bạn chưa có tài khoản?</span>
          <a href="/account/register" className="ml-2 text-sm font-bold text-blue-600 underline">
            Tạo tài khoản
          </a>
        </div>
      </div>
    </>
  );
}

export default Login;