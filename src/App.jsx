import './App.css';

import { Routes, Route } from 'react-router-dom';

import React from 'react';
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import NotFound from './Pages/NotFound';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Courses from './Pages/Course/CourseList';
import Contact from './Pages/Contact';
import Denied from './Pages/Denied';
import CourseDescription from './Pages/Course/CourseDescription';
import RequireAuth from './Components/RequireAuth';
import CreateCourse from './Pages/Course/CreateCourse';
import Profile from './Pages/User/Profile';
import EditProfile from './Pages/User/EditProfile';
import Checkout from './Pages/Payment/Checkout';
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess';
import CheckoutFail from './Pages/Payment/CheckoutFail';
import DisplayLectures from './Pages/Dashboard/DisplayLectures';
import AddLecture from './Pages/Dashboard/AddLecture';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/courses/description" element={<CourseDescription />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
          <Route path="/courses/create" element={<CreateCourse />} />
           <Route path="/course/addlecture" element={<AddLecture />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['ADMIN', 'USER']} />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/edit-profile" element={<EditProfile />} />
           <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess/>} />
          <Route path="/checkout/fail" element={<CheckoutFail />} />
           <Route path="/courses/lectures" element={<DisplayLectures />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
