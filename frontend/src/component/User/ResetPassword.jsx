import React, { useState, useEffect } from 'react'
import "./ResetPassword.css"
import Loader from "../layout/Loader/Loader"
import { useDispatch, useSelector } from "react-redux"
// import { clearErrors, resetPassword } from "../../actions"
// import toast
import MetaData from "../layout/MetaData"
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";

const ResetPassword = ({ history, match }) => {
    const dispatch = useDispatch()
    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        // what is this new form data
        const myForm = new FormData();
        myForm.set("password", password); 
        myForm.set("confirmPassword", confirmPassword)

        dispatch(resetPassword(match.params.token, myForm));
    }

    useEffect(() => {
        if(error) {
            toast.error(error);
            dispatch(clearErrors());
        } 

        if (success) {
            toast.success("Password Updated Successfully!!")
            history.push("/login")
        }
    }, [dispatch, error, toast, history, success]);   

    return (
        <>
            {
                loading ? <Loader /> : (
                    <>
                        <MetaData title="Change Password" />
                        <div className="resetPasswordContainer">
                            <div className="resetPasswordBo">
                                <h2 className='resetPasswordHeading'>Update Profile</h2>

                                <form className="resetPasswordForm" onSubmit={resetPasswordSubmit} >
                                    <div>
                                        <LockOpenIcon />
                                        <input type="password" placeholder="New Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="loginPassword">
                                        <LockIcon />
                                        <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>
                                    <input type="submit" value="Update" className='resetPasswordBtn' />
                                </form>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default ResetPassword