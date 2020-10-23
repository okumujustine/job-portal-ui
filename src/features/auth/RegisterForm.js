import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function RegisterForm({
  registerUser,
  onChangeFirstName,
  onChangeLastName,
  onChangeEmail,
  onChangePassword,
  onChangeConfirmPassword,
  onChangePhoneNumber,
  phoneNumber,
  loading,
}) {
  return (
    <div>
      <form onSubmit={registerUser} className="flex flex-col w-11/12 m-auto">
        <div className="flex flex-col mt-6">
          <label>First Name:</label>
          <input
            className="auth-form-input"
            placeholder="first name"
            password="text"
            onChange={(e) => onChangeFirstName(e.target.value)}
          />
        </div>

        <div className="flex flex-col mt-6">
          <label>Last Name:</label>
          <input
            className="auth-form-input"
            placeholder="last name"
            password="text"
            onChange={(e) => onChangeLastName(e.target.value)}
          />
        </div>

        <div className="flex flex-col mt-6">
          <label>Email Address:</label>
          <input
            className="auth-form-input"
            placeholder="email address"
            onChange={(e) => onChangeEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-6">
          <label>Phone Number:</label>
          <PhoneInput
            className="focus:outline-none PhoneInputInputDiv"
            defaultCountry="UG"
            value={phoneNumber}
            onChange={onChangePhoneNumber}
          />
        </div>

        <div className="flex flex-col mt-6">
          <label>Password</label>
          <input
            type="password"
            className="auth-form-input"
            placeholder="password"
            password="password"
            onChange={(e) => onChangePassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-6">
          <label>Confirm Password</label>
          <input
            type="password"
            className="auth-form-input"
            placeholder="confirm password"
            password="password"
            onChange={(e) => onChangeConfirmPassword(e.target.value)}
          />
        </div>
        <button className="mt-6 auth-button" type="submit">
          {loading ? "laoding ..." : "Register"}
        </button>
      </form>
    </div>
  );
}
