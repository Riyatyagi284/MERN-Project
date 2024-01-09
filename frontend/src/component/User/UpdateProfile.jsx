import React, { useState, useEffect } from 'react'
// import toast from
import { useDispatch, useSelector } from "react-redux"
import "./UpdateProfile.css"
import Loader from "../layout/Loader/Loader"
// import { clearErrors, updateProfile, loadUser } from "../../actions"
// import updateProfileReset
import MetaData from "../layout/MetaData"


import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";


const UpdateProfile = () => {

    const dispatch = useDispatch();

    const { error, isUpdated, loading } = useSelector((state) => state.profile)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("")
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png")

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avater", avatar);
        dispatch(updateProfile(myForm));
    }


    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success("Profile Updated Successfully!!");
            dispatch(loadUser());

            history.pushState("/account");

            dispatch({
                updateProfileReset,
            })
        }
    }, [dispatch, error, toast, history, user, isUpdated]);


    return (
        <>
            {
                loading ? (<Loader />) : (<>
                    <MetaData title="Update Profile" />
                    <div className="updateProfileContainer">
                        <div className="updateProfileBox">
                            <h2 className="updateProfileHeading">Update Profile</h2>

                            <form className="updateProfileForm" encType='multipart/form-data' onSubmit={updateProfileSubmit} >
                                <div className="updateProfileName">
                                    <FaceIcon />
                                    <input type="text" placeholder="Name" required name="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>

                                <div className="updateProfileEmail">
                                    <MailOutlineIcon />
                                    <input type="email" placeholder="Email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <div className="updateProfileImage">
                                    <img src={avatarPreview} alt="Avatar-Preview" />
                                    <input type="file" name="avatar" accept="image/*" onChange={updateProfileDataChange} />
                                </div>

                                <input type="submit" value="Update" className='updateProfileBtn' />
                            </form>
                        </div>
                    </div>
                </>)
            }
        </>
    )
}

export default UpdateProfile