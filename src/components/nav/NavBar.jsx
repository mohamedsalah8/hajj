import React from 'react'
import profile from "../../assets/images/profile.svg";
import { useSBSDispatch, useSBSState } from 'context/global';




export default function NavBar() {
  const { userInfo } = useSBSState();
  const dispatch = useSBSDispatch();


  function logoutUser() {
    dispatch({
      type: "logout",
    });
    window.location.href = ("/login")
  }
  return (
    <>
      <header className="header">
        <nav className="navbar">
          <div className="dropdown">
            <button className="btn p-0" type="button" id="profile-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <div className="profile d-flex align-items-center">
                <div className="flex-shrink-0">
                  <img src={profile} alt="profile..." />
                </div>
                <div className="title flex-grow-1 ms-3 ">
                  <h4>{userInfo?.name}</h4>
                  <p>{userInfo?.is_admin ? "Admin" : ""}</p>
                </div>
              </div>
            </button>
            <ul className="dropdown-menu px-2" aria-labelledby="profile-dropdown">
              <li> <button className="btn" onClick={logoutUser}> تسجيل خروج</button></li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  )
}
