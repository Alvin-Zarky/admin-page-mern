import React, {useState, useEffect, useRef} from 'react'
import { Container, Row, Col} from 'reactstrap'
import SideBar from '../../components/Sidebar'
import TopBar from '../../components/Topbar'
import {IoSettings} from "react-icons/io5"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Table} from "reactstrap"
import {GrUpdate} from "react-icons/gr"
import {AiFillDelete} from "react-icons/ai"
import { useHistory, useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import { useAppSelector, useAppDispatch} from '../../app/hooks'
import { createCategory, DataCategory, deleteCategory, getCategory, updateCategory } from '../../features/category/categorySlice'
import './add-category.scss'
import { Routes } from '../../router'
import Pagination from '../../components/Pagination'

interface KeywordParam{
  keyword: string,
  page:string
}

export default function AddCategory() {

  const [modal, setModal]= useState(false)
  const [categoryName, setCategory] = useState('')
  const [slug, setSlug] = useState('')
  const [textSearch, setTextSearch] = useState('')
  const [isEdit, setIsEdit] = useState<{isEdited:boolean, values: DataCategory}>({ isEdited:false, values:{} })
  const {user}= useAppSelector(state => state.auth)
  const {category, isLoading, isError} = useAppSelector(state => state.category)
  const dispatch= useAppDispatch()
  const inputText= useRef<HTMLInputElement>(null)
  const history= useHistory()
  const {data, pagination, pages, allPages} = category
  const {isEdited, values} = isEdit
  const {keyword, page} = useParams<KeywordParam>()

  useEffect(() =>{
    dispatch(getCategory({keyword, page}))
  }, [dispatch, keyword, page])

  const onToggle = () =>{
    setCategory('')
    setSlug('')
    setModal(!modal)
    setIsEdit({isEdited:false, values:{}})
  }

  const onSubmit = (e:React.FormEvent) =>{
    if(!isEdited){
      const values:DataCategory={
        user: user._id,
        userName: user.name,
        name: categoryName,
        slug
      }
      dispatch(createCategory(values))
    }else{
      const value:DataCategory={
        _id: values._id,
        name: categoryName,
        slug
      }
      dispatch(updateCategory(value))
    }
    
    setModal(!modal)
    e.preventDefault()
  }

  const onSearchSubmit = (e:React.FormEvent) =>{
    if(textSearch.trim()){
      history.push(`${Routes.ADD_CATEGORY}/search/${textSearch}`)
    }else{
      history.push(`${Routes.ADD_CATEGORY}`)
    }

    e.preventDefault()
  }

  const onUpdateSubmit= (value: DataCategory) =>{
    setIsEdit({ isEdited:true, values:value })
    setCategory(`${value.categoryName}`)
    setSlug(`${value.slugUrl}`)
  }

  const onDeleteSubmit= (_id:string) =>{
    if(window.confirm("Are you sure to delete this category!")){
      dispatch(deleteCategory(_id))
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
                    <span>Add Category</span>
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
                    <ModalHeader toggle={onToggle}>Add Category</ModalHeader>
                    <ModalBody>
                      <div className="box-input-modal">
                          <div className="label">
                            <label>Category Name: </label>
                          </div>
                          <div className="input-text">
                            <input ref={inputText} type="text" value={categoryName} onChange={(e) => {setCategory(e.target.value)}} required />
                          </div>
                          <div className="label">
                            <label>Slug Name: </label>
                          </div>
                          <div className="input-text">
                            <input type="text" value={slug} onChange={(e) => {setSlug(e.target.value)}} required />
                          </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <button className="btn-submit">Submit</button>
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
                      <th>Category Name</th>
                      <th>Slug Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading && <Loading />}
                    {!isError && !isLoading && data && data.length===0 && (
                      <tr><td>Data category not found</td></tr>
                    )}
                    {!isLoading && isError && (
                      <tr><td>Data category not found</td></tr>
                    )}
                    {!isError && !isLoading && data && data.map((value:DataCategory, ind:number) =>(
                      <tr key={ind}>
                          <td>{value._id}</td>
                          <td>{value.categoryName}</td>
                          <td>{value.slugUrl}</td>
                          <td>
                            <div className="button-edit-del">
                              <div className="btn-update" onClick={() => {onUpdateSubmit(value)}}>
                                <GrUpdate onClick={onToggle} />
                              </div>
                              <div className="btn-delete" onClick={() => onDeleteSubmit(value._id)}>
                                <AiFillDelete />
                              </div>
                            </div>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <Pagination isLoading={isLoading} isError={isError} pagination={pagination} keyword={keyword} pages={allPages} pageNumber={pages} ROUTE={`${Routes.ADD_CATEGORY}`} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}
