import { useEffect, useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { loginAccount } from "../../services/accountAdminService";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuthen } from "../../actions/authen";

import JustValidate from "just-validate";

const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickPasswordIcon = () => {
    setHidePassword(!hidePassword);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    // console.log(email);
    // console.log(password);

    const dataSubmit = {
      email: email,
      password: password
    };

    const dataFromBE = await loginAccount(dataSubmit);

    if(dataFromBE.code == 200)
    {
      // not care about true, false
      // only cares about changing state
      // because need to change UI of Header
      dispatch(checkAuthen(true));

      // login successfully
      // then navgiate back to Home page
      // this code only navigates
      // this code does not help to reload page or else
      navigate("/admin333/dashboard");
    }
    else {
      alert("Email or password incorrect!");
    }
  }

  useEffect(() => {
    const validation = new JustValidate("#login-form");

    validation
      .addField("#email", [
        {
          rule: "required",
          errorMessage: "Vui lòng nhập email của bạn!",
        },
        {
          rule: "email",
          errorMessage: "Email không đúng định dạng!",
        },
      ])
      .addField("#password", [
        {
          rule: "required",
          errorMessage: "Vui lòng nhập mật khẩu!",
        },
      ])
      .onSuccess(async (event) => {
        await handleSubmit(event);
      })
  }, []);

  return (
    <>
      <div className="form-account">
        <h2 className="inner-title">Đăng nhập</h2>
        <p className="inner-description">
          Vui lòng nhập email và mật khẩu để tiếp tục
        </p>

        <form 
          className="inner-form" 
          id="login-form"
          // onSubmit={handleSubmit}
        >
          <div className="inner-group">
            <label htmlFor="email" className="inner-label">
              Email <span className="field-required">*</span>
            </label>
            <input
              className="inner-control"
              type="email"
              name="email"
              id="email"
              placeholder="Ví dụ: levana@gmail.com"
            />
          </div>

          <div className="inner-group password-form">
            <label htmlFor="password" className="inner-label">
              Mật khẩu <span className="field-required">*</span>
            </label>
            <input
              className="inner-control"
              type={hidePassword ? "password" : "text"} 
              name="password"
              id="password"
            />
            <div className="password-icon" onClick={handleClickPasswordIcon}>
              {hidePassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>

          <button className="inner-button" type="submit">
            Đăng nhập
          </button>
        </form>

        <div className="inner-more">
          <span>Bạn chưa có tài khoản?</span>
          <Link to={`/admin333/account/register`}>
            Tạo tài khoản
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;