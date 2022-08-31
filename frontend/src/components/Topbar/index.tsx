import React from 'react'
import {Row, Col} from "reactstrap"
import {AiFillBell} from "react-icons/ai"
import {MdMail} from "react-icons/md"
import {FaUserCircle} from "react-icons/fa"
import {AiOutlineSearch} from "react-icons/ai"
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { authLogOut } from '../../features/auth/authSlice'
import './top-bar.scss'

export default function TopBar() {

  const {user} = useAppSelector(state => state.auth)
  const dispatch= useAppDispatch()
  const onSubmit= (e:React.FormEvent) =>{
    e.preventDefault()

    dispatch(authLogOut())
  }
  const onSubmitSearch = (e:React.FormEvent) =>{
    e.preventDefault()
  }

  return (
    <>
      <div className="top-bar-overview">
      <Row>
        <Col xl="6" lg="6" md="6">
          <div className="form-box-search">
            <form onSubmit={onSubmitSearch}>
              <input type="text" placeholder='Search For...' />
            </form>
            <div className="button-search">
              <AiOutlineSearch />
            </div>
          </div>
        </Col>
        <Col xl="6" lg="6" md="6">
          <div className="tooltip-profile">
            <div className="icon-notification">
              <AiFillBell />
            </div>
            <div className="icon-mail">
              <MdMail />
            </div>
            <div className="profile-review">
              <div className="username">
                <span>{user && user.name}</span>
              </div>
              <div className="icon-user">
                <FaUserCircle />
              </div>
            </div>
            <div className="box-dropdown" onClick={onSubmit}>
              <span>Logout</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
    </>
  )
}
