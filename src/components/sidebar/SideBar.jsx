import React from 'react'
import logo from "../../assets/images/logo.svg"
import { Link, NavLink } from 'react-router-dom'
import { HomeIcon, ParticipantIcon, SurveyIcon, TeamIcon } from '../icons/SharedIcons'
export default function SideBar() {
  return (
    <aside className="side-nav">
      <div className="side-nav-header">
        <img src={logo} alt="logo" className="logo" />
        <h3>وزارة السياحة و الأثار</h3>
      </div>
      <div className="side-nav-body">
        <ul className="nav">
          <li className="nav-item">
            <NavLink
              className={({ isActive, isPending }) => isPending ? "pending  nav-link  " : isActive ? "nav-link active" : "nav-link"}
              aria-current="page" to="/">
              <span>
                <HomeIcon />
              </span>
              الرئيسية</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive, isPending }) => isPending ? "pending  nav-link  " : isActive ? "nav-link active" : "nav-link"} to="/survey">
              <span>
                <SurveyIcon />
              </span>
              الاستطلاع
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive, isPending }) => isPending ? "pending  nav-link  " : isActive ? "nav-link active" : "nav-link"}
              to="/participant">
              <span>
                <ParticipantIcon />
              </span>
              المشاركين
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive, isPending }) => isPending ? "pending  nav-link  " : isActive ? "nav-link active" : "nav-link"}
              to="/team">
              <span>
                <TeamIcon />
              </span>
              فريق العمل</NavLink>
          </li>
        </ul>
      </div>

    </aside>
  )
}
