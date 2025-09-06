import React from 'react'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import Root from '../pages/Root'
import SignUp from "../pages/SignUp"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"

const AppRoutes = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
            <Route path='/' element={<Root/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            </>
        )
    )
  return (
    <RouterProvider router={router}/>
  )
}

export default AppRoutes