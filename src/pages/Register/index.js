import { useEffect, useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { registerAccount } from "../../services/accountAdminService";

import { useNavigate } from "react-router-dom";

import JustValidate from "just-validate";

const Register = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const navigate = useNavigate();

  const handleClickPasswordIcon = () => {
    setHidePassword(!hidePassword);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const firstName = event.target.elements.firstName.value;
    const lastName = event.target.elements.lastName.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const agreement = event.target.agreement.checked;
    // console.log(firstName);
    // console.log(lastName);
    // console.log(email);
    // console.log(password);
    // console.log(agreement);

    const dataSubmit = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };

    if(agreement)
    {
      const dataFromBE = await registerAccount(dataSubmit);

      if(dataFromBE.code == 201)
      {
        alert("Tài khoản đã được khởi tạo. Vui lòng chờ phê duyệt của quản trị viên!");

        // this code only navigates
        // this code does not help to reload page or else
        navigate("/admin333/account/login");
      }
      else {
        alert(dataFromBE.message);
      }
    }
  }

  useEffect(() => {
    const validation = new JustValidate('#register-form');

    validation
      .addField('#firstName', [
        {
          rule: 'required',
          errorMessage: 'Vui lòng nhập firstName!'
        },
        {
          rule: 'maxLength',
          value: 50,
          errorMessage: 'Họ tên không được vượt quá 50 ký tự!'
        }
      ])
      .addField('#lastName', [
        {
          rule: 'required',
          errorMessage: 'Vui lòng nhập lastName!'
        },
        {
          rule: 'minLength',
          value: 3,
          errorMessage: 'Họ tên phải có ít nhất 3 ký tự!'
        },
        {
          rule: 'maxLength',
          value: 50,
          errorMessage: 'Họ tên không được vượt quá 50 ký tự!'
        }
      ])
      .addField('#email', [
        {
          rule: 'required',
          errorMessage: 'Vui lòng nhập email của bạn!',
        },
        {
          rule: 'email',
          errorMessage: 'Email không đúng định dạng!',
        },
      ])
      .addField('#password', [
        {
          rule: 'required',
          errorMessage: 'Vui lòng nhập mật khẩu!',
        },
        {
          validator: (value) => value.length >= 8, // arrow function
          errorMessage: 'Mật khẩu phải chứa ít nhất 8 ký tự!',
        },
        {
          validator: (value) => /[A-Z]/.test(value),
          errorMessage: 'Mật khẩu phải chứ ít nhất một chữ cái in hoa!',
        },
        {
          validator: (value) => /[a-z]/.test(value),
          errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái thường!',
        },
        {
          validator: (value) => /\d/.test(value),
          errorMessage: 'Mật khẩu phải chứa ít nhất một chữ số!',
        },
        {
          validator: (value) => /[@$!%*?&]/.test(value),
          errorMessage: 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt!',
        },
      ])
      .addField('#agreement', [
        {
          rule: 'required',
          errorMessage: 'Bạn phải đồng ý với các điều khoản và điều kiện!',
        },
      ])
      .onSuccess(async (event) => {
        await handleSubmit(event);
      })
  }, []);

  return (
    <>
      <div className="form-account">
        <h2 className="inner-title">Đăng ký</h2>
        <p className="inner-description">Tạo một tài khoản để tiếp tục</p>

        <form 
          className="inner-form" 
          id="register-form"
          // onSubmit={handleSubmit}
        >
          <div className="inner-group">
            <label htmlFor="firstName" className="inner-label">
              First Name <span className="field-required">*</span>
            </label>
            <input
              className="inner-control"
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Example: A"
            />
          </div>

          <div className="inner-group">
            <label htmlFor="lastName" className="inner-label">
              Last Name <span className="field-required">*</span>
            </label>
            <input
              className="inner-control"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Example: Le Van"
            />
          </div>

          <div className="inner-group">
            <label htmlFor="email" className="inner-label">
              Email <span className="field-required">*</span>
            </label>
            <input
              className="inner-control"
              type="email"
              name="email"
              id="email"
              placeholder="Example: levana@gmail.com"
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

          <div className="inner-meta">
            <div className="inner-confirm">
              <input
                className="inner-check"
                type="checkbox"
                name="agreement"
                id="agreement"
              />
              <label htmlFor="agreement" className="inner-label">
                Tôi chấp nhận các điều khoản và điều kiện <span className="field-required">*</span>
              </label>
            </div>
          </div>

          <button className="inner-button" type="submit">
            Đăng ký
          </button>
        </form>

        <div className="inner-more">
          <span>Bạn đã có tài khoản?</span>
          <Link to={`/admin333/account/login`}>
            Đăng nhập
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;