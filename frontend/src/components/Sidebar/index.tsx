import React from 'react'
import {Col} from "reactstrap"
import {BsFillShieldFill} from "react-icons/bs"
import {AiFillDashboard} from "react-icons/ai"
import {IoIosArrowForward} from "react-icons/io"
import { Routes } from '../../router'
import { NavLink } from 'react-router-dom';
import {AiFillSetting} from "react-icons/ai"
import './side-bar.scss'

export default function SideBar() {
  return (
    <>
      <Col xl="2" lg="2" md="2" className="left-side-form">
            <div className="title-overview">
              <BsFillShieldFill /> 
              <span>Admin Area</span>
            </div>
            <div className="underline"></div>
            <div>
            <div className="menu-category">
                  <NavLink exact to={Routes.HOME}>
                    <div className="box-menu">
                      <AiFillDashboard />
                      <span>Dashboard</span>
                    </div>
                    <div className="right-sign">
                      <IoIosArrowForward />
                    </div>
                  </NavLink>
                </div>
              <div className="underline"></div>
            </div>
            <div>
              <div className="title-category"><span>Interface</span></div>
                <div className="menu-category">
                  <NavLink to={Routes.ADD_CATEGORY}>
                    <div className="box-menu">
                      <AiFillSetting />
                      <span>Add Category</span>
                    </div>
                    <div className="right-sign">
                      <IoIosArrowForward />
                    </div>
                  </NavLink>
                </div>
                <div className="menu-category">
                  <NavLink to={Routes.ADD_CONTENT}>
                    <div className="box-menu">
                      <AiFillSetting />
                      <span>Add Content</span>
                    </div>
                    <div className="right-sign">
                      <IoIosArrowForward />
                    </div>
                  </NavLink>
                </div>
                <div className="menu-category">
                  <NavLink to={Routes.ADD_BOX}>
                    <div className="box-menu">
                      <AiFillSetting />
                      <span>Add Box</span>
                    </div>
                    <div className="right-sign">
                      <IoIosArrowForward />
                    </div>
                  </NavLink>
                </div>
              <div className="underline"></div>
            </div>
            <div>
              <div className="title-category"><span>Add on</span></div>
                <div className="menu-category">
                  <NavLink to={Routes.SIGN_IN}>
                    <div className="box-menu">
                      <AiFillSetting />
                      <span>Components</span>
                    </div>
                    <div className="right-sign">
                      <IoIosArrowForward />
                    </div>
                  </NavLink>
                </div>
                <div className="menu-category">
                  <NavLink to={Routes.SIGN_IN}>
                    <div className="box-menu">
                      <AiFillSetting />
                      <span>Components</span>
                    </div>
                    <div className="right-sign">
                      <IoIosArrowForward />
                    </div>
                  </NavLink>
                </div>
              <div className="underline"></div>
            </div>
            <div>
              <div className="title-category"><span>Add on</span></div>
                <div className="menu-category">
                  <NavLink to={Routes.SIGN_IN}>
                    <div className="box-menu">
                      <AiFillSetting />
                      <span>Components</span>
                    </div>
                    <div className="right-sign">
                      <IoIosArrowForward />
                    </div>
                  </NavLink>
                </div>
                <div className="menu-category">
                  <NavLink to={Routes.SIGN_IN}>
                    <div className="box-menu">
                      <AiFillSetting />
                      <span>Components</span>
                    </div>
                    <div className="right-sign">
                      <IoIosArrowForward />
                    </div>
                  </NavLink>
                </div>
              <div className="underline"></div>
            </div>
          </Col>
    </>
  )
}
