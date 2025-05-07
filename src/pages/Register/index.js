import variables from "../../config/variables";

import { useEffect, useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { registerAccount } from "../../services/accountAdminService";

import { useNavigate } from "react-router-dom";

// --- JustValidate
import JustValidate from "just-validate";
// --- End JustValidate

const Register = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const navigate = useNavigate();

  // ----- Handle passowrd icon ----- //
  const handleClickPasswordIcon = () => {
    setHidePassword(!hidePassword);
  }
  // ----- End handle passowrd icon ----- //

  // ----- Handle submit form ----- //
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
        alert("Account has been created. Please wait for admin approval!");

        // this code only navigates
        // this code does not help to reload page or else
        navigate(`/${variables.pathAdmin}/account/login`);
      }
      else {
        alert(dataFromBE.message);
      }
    }
  }
  // ----- End handle submit form ----- //

  // ----- JustValidate ----- //
  useEffect(() => {
    const validation = new JustValidate('#register-form');

    validation
      .addField('#firstName', [
        {
          rule: 'required',
          errorMessage: 'Please enter your first name!'
        },
        {
          rule: 'maxLength',
          value: 50,
          errorMessage: 'Name must not exceed 50 characters!'
        }
      ])
      .addField('#lastName', [
        {
          rule: 'required',
          errorMessage: 'Please enter your last name!'
        },
        {
          rule: 'minLength',
          value: 3,
          errorMessage: 'Name must be at least 3 characters long!'
        },
        {
          rule: 'maxLength',
          value: 50,
          errorMessage: 'Name must not exceed 50 characters!'
        }
      ])
      .addField('#email', [
        {
          rule: 'required',
          errorMessage: 'Please enter your email!',
        },
        {
          rule: 'email',
          errorMessage: 'Invalid email format!',
        },
      ])
      .addField('#password', [
        {
          rule: 'required',
          errorMessage: 'Please enter your password!',
        },
        {
          validator: (value) => value.length >= 8, // arrow function
          errorMessage: 'Password must be at least 8 characters!',
        },
        {
          validator: (value) => /[A-Z]/.test(value),
          errorMessage: 'Password must contain at least one uppercase letter!',
        },
        {
          validator: (value) => /[a-z]/.test(value),
          errorMessage: 'Password must contain at least one lowercase letter!',
        },
        {
          validator: (value) => /\d/.test(value),
          errorMessage: 'Password must contain at least one digit!',
        },
        {
          validator: (value) => /[@$!%*?&]/.test(value),
          errorMessage: 'Password must contain at least one special character!',
        },
      ])
      .addField('#agreement', [
        {
          rule: 'required',
          errorMessage: 'You must agree to the terms and conditions!',
        },
      ])
      .onSuccess(async (event) => {
        await handleSubmit(event);
      })
  }, []);
  // ----- End JustValidate ----- //

  return (
    <>
      <div className="form-account">
        <h2 className="inner-title">Register</h2>
        <p className="inner-description">Create an account to continue</p>

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
              Password <span className="field-required">*</span>
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
                I accept the terms and conditions <span className="field-required">*</span>
              </label>
            </div>
          </div>

          <button className="inner-button" type="submit">
            Register
          </button>
        </form>

        <div className="inner-more">
          <span>Already have an account?</span>
          <Link to={`/${variables.pathAdmin}/account/login`}>
            Login
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;