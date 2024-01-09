import React, {useEffect} from 'react'
import {DataGrid} from "@material-ui/data-grid"
import "./productList.css"
import {useSelector, useDispatch} from "react-redux"
import {Link} from "react-router-dom"
// import toast from 
import MetaData from "../layout/MetaData"
import Sidebar from "./Sidebar"

// import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
// import { DELETE_USER_RESET } from "../../constants/userConstants";

import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const UserList = ({ history }) => {

const dispatch = useDispatch();
const { error, users } = useSelector((state) => state.allUsers);

const {error: deleteError, isDeleted, message} = useSelector((state) => state.profile);

const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
};

useEffect(() => {
    if(error) {
        toast.error(error);
        dispatch(clearErrors());
    }

    if(deleteError) {
        toast.error(deleteError);
        dispatch(clearErrors());
    }

    if(isDeleted) {
        toast.success(message);
        history.push("/admin/users");
        // dispatch(deleteUserReset())
    }

    dispatch(getAllUsers());
}, [dispatch, toast, error, deleteError, history, isDeleted, message])

const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.5 },
    { field: "role", headerName: "Role",type:"number", minWidth: 150, flex: 0.3, cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin" ? "greenColor" : "redColor";
    } },
    { field: "actions", headerName: "Actions", minWidth: 150,type:"number", sortable: false,  flex: 0.3, renderCell: (params) => {
        return (
            <>
             <Link to={`/admin/user/${params.getValue(params.id, "id")}`}> <EditIcon /></Link>

             <Button onClick={() => deleteUserHandler(params.getValue(params.id, "id"))}>
                <DeleteIcon />
             </Button>
            </>
        )
    } },
];

const rows = [];

users && users.forEach((item) => {
    rows.push({
        id: item._id,
        role: item.role,
        email:item.email,
        name: item.name,
    });
});

  return (
    <>
     <MetaData title={`ALL USERS - Admin`} /> 

     <div className="dashboard">
        <Sidebar />
        <div className="prductListContainer">
            <h1 id="prductListHeading">ALL USERS</h1>

            <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionClick className="productListTable" autoHeight  />
        </div>
     </div>
    </>
  )
}

export default UserList;