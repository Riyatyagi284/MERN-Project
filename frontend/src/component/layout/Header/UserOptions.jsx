import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import { FaUser, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

import { useHistory } from "react-router-dom";
// import toast 
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const UserOptions = () => {

    //  const { cartItems } = useSelector((state) => state.cart);
     const [open, setOpen] = useState(false);
  
     const history = useHistory();
     const dispatch = useDispatch()

    const actions = [
        // { icon: </> , name: "Orders", func: orders },
        { icon: <FaUser />, name: "Profile", func: account },
        // { icon: <FaShoppingCart/> , name: `Cart(${cartItems.length})`, func: cart },
        { icon: <FaSignOutAlt />, name: "Logout", func: logoutUser },
    ];

    if (user.role === "admin") {
        actions.unshift({
            icon: <MdDashboard />,
            name: "Dashboard",
            func: dashboard,
        });
    }

    function dashboard() {
        history.push("/admin/dashboard");
    }

    function orders() {
        history.push("/orders");
    }

    function account() {
        history.push("/account");
    }

    function cart() {
        history.push("/cart");
    }

    function logoutUser() {
        dispatch(logout());
        // toast.success("Logout Successfully")
    }

    return (
        <>
            <Backdrop
                style={{ zIndex: "10" }}
                open={open}
            >
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    style={{ zIndex: "11" }}
                    open={open}
                    direction="down"
                    className="speedDial"
                    // icon={ <img clasName="speedDialIcon" src={user.avatar} alt="Profile" />}
                    icon={<img clasName="speedDialIcon" src={"../../../images/Profile.png"} alt="Profile" />}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={action.func}
                            tooltipOpen={window.innerWidth <= 600 ? true : false}
                        />
                    ))}
                </SpeedDial>
            </Backdrop>
        </>
    )
}

export default UserOptions