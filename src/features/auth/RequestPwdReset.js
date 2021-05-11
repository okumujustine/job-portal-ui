import React, {useState} from 'react'
import { useAlert } from "react-alert";
import Loader from "react-loader-spinner";

import { axiosInstance } from "../../services/axios";
import { config } from "../../helperfuncs/token";

export default function RequestPwdReset() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const alert = useAlert();

    const onSubmitEmail = (e) => {
        e.preventDefault();

        if(!email) {
            alert.error("Enter email address please")
            return
        }
        setLoading(true)
        
        axiosInstance
        .post(`/auth/request-reset-email/`, { email }, config)
        .then(() => {
          alert.success("Password reset link sent to your email address");
          setLoading(false);
        })
        .catch((error) => {
          
          if(error.response.data?.error){
            alert.error(error.response.data?.error)
          };
          setLoading(false);
        });
    }
    return (
        <form
        onSubmit={onSubmitEmail}
        className="auth-form flex flex-col w-11/12 lg:w-5/12 m-auto"
        >
        <h1 className="font-bold self-center text-3xl">Request password reset</h1>
        <div className="flex flex-col mt-6">
          <label>Email Address:</label>
          <input
            className="auth-form-input"
            placeholder="email address"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="mt-6 auth-button" type="submit" disabled={loading}>
          {!loading ? "Confirm"
          : <Loader
              type="Puff"
              color="#FFFFFF"
              height={25}
              width={25}
              timeout={30000}
            />}
        </button>
        </form>
    )
}
