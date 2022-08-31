import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import {ToastContainer} from "react-toastify"
import { Routes } from './router';
import Dashboard from './screens/dashboard';
import SignUp from './screens/sign-up';
import SignIn from './screens/sign-in';
import NotFound from './screens/not-found';
import { useAppSelector } from './app/hooks';
import "../node_modules/react-toastify/dist/ReactToastify.css"
import './App.css';
import AddCategory from './screens/add-category';
import AddContent from './screens/add-content';
import AddBox from './screens/add-box';

function App() {

  const {user} = useAppSelector(state => state.auth)
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path={Routes.HOME}>
            {user && <Dashboard />}
            {!user && <Redirect to={Routes.SIGN_IN} />}
          </Route>
          <Route path={Routes.SIGN_UP}>
            {!user && <SignUp />}
            {user && <Redirect to={Routes.HOME} />}
          </Route>
          <Route path={Routes.SIGN_IN}>
            {!user && <SignIn />}
            {user && <Redirect to={Routes.HOME} />}
          </Route>
          <Route exact path={Routes.ADD_CATEGORY}>
            {user && <AddCategory />}
            {!user && <Redirect to={Routes.SIGN_IN} />}
          </Route>
          <Route exact path={`${Routes.ADD_CATEGORY}/search/:keyword`}>
            {user && <AddCategory />}
            {!user && <Redirect to={Routes.SIGN_IN} />}
          </Route>
          <Route path={`${Routes.ADD_CATEGORY}/page/:page`}>
            {user && <AddCategory />}
            {!user && <Redirect to={Routes.SIGN_IN} />}
          </Route>
          <Route path={`${Routes.ADD_CATEGORY}/search/:keyword/page/:page`}>
            {user && <AddCategory />}
            {!user && <Redirect to={Routes.SIGN_IN} />}
          </Route>
          <Route exact path={Routes.ADD_CONTENT}>
            {user && <AddContent />}
            {!user && <Redirect to={Routes.SIGN_IN} />}
          </Route>
          <Route exact path={`${Routes.ADD_CONTENT}/search/:search`}>
            {user && <AddContent />}
            {!user && <Redirect to={Routes.SIGN_IN} />}
          </Route>
          <Route path={`${Routes.ADD_CONTENT}/page/:pageNumber`}>
            {user && <AddContent />}
            {!user && <Redirect to={Routes.SIGN_IN} />}
          </Route>
          <Route path={`${Routes.ADD_CONTENT}/search/:search/page/:pageNumber`}>
            {user && <AddContent />}
            {!user && <Redirect to={Routes.SIGN_IN} />}
          </Route>
          <Route path={Routes.ADD_BOX}>
            {user && <AddBox />}
            {!user && <Redirect to={Routes.SIGN_IN} />}
          </Route>
          <Route path={Routes.NOT_FOUND}>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </>
  ); 
}

export default App;
