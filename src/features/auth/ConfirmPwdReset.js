import React, {useState} from 'react'
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";

import { axiosInstance } from "../../services/axios";
import { config } from "../../helperfuncs/token";
import AuthDialog from "./AuthDialog";

export default function ConfirmPwdReset() {
    const [openAuthDialog, setOpenAuthDialog] = React.useState(false);
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [dialogMessage, setDialogMessage] = React.useState("");
    const [loading, setLoading] = useState(false)

    const alert = useAlert();
    let { token, uidb64} = useParams();

    const onConfirmPasswordReset = (e) => {
        e.preventDefault();

        if (!password){
            alert.error("Enter password please")
            return
        }

        if(!confirmPassword){
            alert.error("Enter confirm password please")
            return
        }

        if(password !== confirmPassword){
            alert.error("Password and confirm password should match")
            return
        }

        if(!uidb64){
            alert.error("Invalid confirmation link")
            return
        }

        if(!token){
            alert.error("Invalid confirmation link")
            return
        }

        setLoading(true)
        
        axiosInstance
        .patch(`/auth/password-reset-complete/`, { password, uidb64, token }, config)
        .then(() => {
          setLoading(false);
          setOpenAuthDialog(true);
          setDialogMessage("Password successfully changed, you can now login");
        })
        .catch((error) => {
            setLoading(false);
            console.log(error.response.data)
          if(error.response.data?.error){
            alert.error(error.response.data?.error)
            return
          };
        });

    }

    const closeAuthDialog = () => {
        setOpenAuthDialog(false);
      };

    return (
        <div>
        <AuthDialog
            isOpen={openAuthDialog}
            isClose={closeAuthDialog}
            isError={false}
            content={dialogMessage}
            isLoginButton={true}
        />
        <form
        onSubmit={onConfirmPasswordReset}
        className="auth-form flex flex-col w-11/12 lg:w-5/12 m-auto"
        >
            <h1 className="font-bold self-center text-3xl">Enter new password</h1>
            <div className="flex flex-col mt-6">
          <label>Password</label>
          <input
            type="password"
            className="auth-form-input"
            placeholder="password"
            password="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-6">
          <label>Confirm Password</label>
          <input
            type="password"
            className="auth-form-input"
            placeholder="confirm password"
            password="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="mt-6 auth-button" type="submit" disabled={loading}>
          {loading ? "laoding ..." : "Comfirm"}
        </button>
        </form>
        </div>
    )
}
