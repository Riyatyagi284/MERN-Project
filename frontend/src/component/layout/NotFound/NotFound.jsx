import React from 'react'
import "./NotFound.css"
import { MdOutlineErrorOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <MdOutlineErrorOutline />

      <p>Page Not Found</p>
      <Link to="/about">About</Link>
    </div>
  )
}

export default NotFound