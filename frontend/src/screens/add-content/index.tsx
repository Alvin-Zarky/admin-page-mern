import React, {useState, useEffect} from 'react'
import { Container, Row, Col} from 'reactstrap'
import SideBar from '../../components/Sidebar'
import TopBar from '../../components/Topbar'
import { IoSettings } from 'react-icons/io5'
import { useHistory, useParams } from 'react-router-dom'
import {Modal, ModalHeader, ModalBody, ModalFooter, Table} from "reactstrap"
import {Button} from "reactstrap"
import Loading from '../../components/Loading'
import { GrUpdate } from 'react-icons/gr'
import { AiFillDelete } from 'react-icons/ai'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { createContent, DataContent, deleteContent, editContent, getContent } from '../../features/content/contentSlice'
import { DataCategory, getCategory } from '../../features/category/categorySlice'
import { Routes } from '../../router'
import Pagination from '../../components/Pagination'
import axios from 'axios'
import './add-content.scss'

export interface SearchParam{
  search:string,
  pageNumber: number | string | any
}

export default function AddContent() {
  
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [modal, setModal] = useState(false)
  const [textSearch, setTextSearch] = useState('')
  const [pathImg, setPathImg] = useState('')
  const [boxMessage, setBoxMessage]= useState<any>('')
  const [isEdit, setIsEdit] = useState<{isEdited:boolean, values: DataContent}>({isEdited:false, values:{}})
  const {category} = useAppSelector(state => state.category)
  const {content, isLoading, isError, message} = useAppSelector(state => state.content)
  const dispatch= useAppDispatch()
  const history= useHistory()
  const {data} = category
  const {data: dataContent}= content
  const {isEdited, values} = isEdit
  const {search, pageNumber} = useParams<SearchParam>()
  const {pages, allPages, pagination} = content
  const keyword=''
  const page= ''

  useEffect(() =>{
    dispatch(getCategory({keyword, page}))
    dispatch(getContent({search, pageNumber}))
  }, [dispatch, search, pageNumber])

  const onToggle = () =>{
    setModal(!modal)
    setTitle('')
    setDescription('')
    setPathImg('')
    setIsEdit({isEdited:false, values:{}})
    setBoxMessage('')
  }

  const onSearchSubmit= (e:React.FormEvent) =>{
    e.preventDefault()

    if(textSearch.trim()){
      history.push(`${Routes.ADD_CONTENT}/search/${textSearch}`)
    }else{
      history.push(`${Routes.ADD_CONTENT}`)
    }
  }

  const onSubmit = (e:React.FormEvent) =>{
    e.preventDefault()
    
    if(!isEdited){
      const value:DataContent={
        category: type,
        title,
        detail: description,
        image: pathImg
      }
      dispatch(createContent(value))
    }else{
      const data:DataContent={
        _id: values._id,
        category: type,
        title,
        detail:description,
        image: pathImg
      }
      dispatch(editContent(data))
    }
    setModal(!modal)
  }

  const onUpdate = (value:DataContent) =>{
    setModal(!modal)
    setIsEdit({ isEdited:true, values:value })
    setTitle(`${value.contentTitle}`)
    setType(`${value.category}`)
    setDescription(`${value.contentDescription}`)
    setPathImg(`${value.picture}`)
    setBoxMessage('')
  }

  const onDelete = (id:string) =>{
    if(window.confirm("Are you sure to delete this content!")){
      dispatch(deleteContent(id))
    }
  }

  const submitFileUploader = async(e:any) =>{
    e.preventDefault()

    const formData= new FormData()
    const file= e.target.files[0]
    formData.append('image', file)
    if(file){
      try{
        const URL= "/dev/flutter/api/upload/"
        const config={
          headers:{
            'Content-Type': 'multipart/form-data'
          }
        }
        const res= await axios.post(URL, formData, config)
        setPathImg(res.data)
        return res.data
      }catch(err:any){
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        setBoxMessage(message)
      }
    }else{
      setBoxMessage('Please upload the image')
    }
  } 
  
  return (
    <>
      <Container className="padd-lr0" fluid>
        <Row className="row-column">
          <SideBar />
          <Col xl="10" lg="10" md="10" className="right-side-form">
            <TopBar />
            <div className="title-overview-page">
              <Row>
                <Col xl="6" lg="6" md="6">
                  <div className="title-content-page">
                    <div className="icon-setting">
                      <IoSettings />
                    </div>
                    <span>Add Content</span>
                  </div>
                </Col>
                <Col xl="6" lg="6" md="6">
                  <div className="box-form">
                    <form onSubmit={onSearchSubmit}>
                      <div className="input-search-form">
                        <input type="text" value={textSearch} onChange={(e) => {setTextSearch(e.target.value)}} />
                        <div className="btn-search"><span>Search</span></div>
                      </div>
                    </form>
                    <Button className="button-add-on" color="dark" outline onClick={onToggle}>
                      Add On
                    </Button>
                  </div>
                  <Modal isOpen={modal} toggle={onToggle}>
                  <form onSubmit={onSubmit}>
                    <ModalHeader toggle={onToggle}>Add Content</ModalHeader>
                    <ModalBody>
                      <div className="box-input-modal">
                          <div className="label">
                            <label>Content Title:</label>
                          </div>
                          <div className="input-text">
                            <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}} required />
                          </div>
                          <div className="label">
                            <label>Category Type: </label>
                          </div>
                          <div className="input-text">
                            <select required value={type} onChange={(e) => {setType(e.target.value)}}>
                              <option value="">Select the category</option>
                              {data && data.map((val: DataCategory, ind:number) =>(
                                <option key={ind} value={val.categoryName}>{val.categoryName}</option>
                              ))}
                            </select>
                          </div>
                          {boxMessage && (
                            <div className="box-error-message">
                              <span>{boxMessage}</span>
                            </div>
                          )}
                          <div className="label">Photo</div>
                          <div className="input-text">
                            <input type="hidden" value={pathImg} onChange={(e) => {setPathImg(e.target.value)}} required />
                          </div>
                          <div className="input-text">
                            {pathImg ? <input type="file" onChange={submitFileUploader} /> : <input type="file" onChange={submitFileUploader} required />}
                          </div>
                          <div className="label">
                            <label>Content Description: </label>
                          </div>
                          <div className="input-text">
                            <textarea required value={description} onChange={(e) => {setDescription(e.target.value)}}></textarea>
                          </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <button className={`btn-submit`}>Submit</button>
                      <Button color="secondary" className="btn-close-modal" onClick={onToggle}>
                        Close
                      </Button>
                    </ModalFooter>
                  </form>
                </Modal>
                </Col>
              </Row>

              <div className="table-content">
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Category</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Author</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading && <Loading />}
                    {isError && <tr><td>{message}</td></tr>}
                    {!isError && !isLoading && dataContent && dataContent.map((value:DataContent, ind:number) =>(
                      <tr key={ind}>
                          <td>{value._id}</td>
                          <td>{value.category}</td>
                          <td>{(value.contentTitle as string).length > 30 ? `${value.contentTitle?.substring(0,30)}...` : `${value.contentTitle}`}</td>
                          <td>{(value.contentDescription as string).length > 30? `${value.contentDescription?.substring(0,30)}...`: `${value.contentDescription}`}</td>
                          <td>{value.userName}</td>
                          <td>
                            <div className="button-edit-del">
                              <div className="btn-update" onClick={() => onUpdate(value as DataContent)}>
                                <GrUpdate />
                              </div>
                              <div className="btn-delete" onClick={() => {onDelete(value._id as string)}}>
                                <AiFillDelete />
                              </div>
                            </div>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <Pagination isLoading={isLoading} isError={isError} pagination={pagination} keyword={search} pages={allPages} pageNumber={pages} ROUTE={`${Routes.ADD_CONTENT}`} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}
