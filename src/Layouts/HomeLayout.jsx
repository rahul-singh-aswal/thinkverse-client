import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillCloseCircle } from 'react-icons/ai';
import Footer from '../Components/Footer';
import { useDispatch, useSelector } from 'react-redux';

const HomeLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for checking if user is logged in
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  // for displaying the options according to role
  const role = useSelector((state) => state?.auth?.role);

  // function to hide the drawer on close button click
  const hideDrawer = () => {
    const element = document.getElementsByClassName('drawer-toggle');
    element[0].checked = false;

    // collapsing the drawer-side width to zero
    const drawerSide = document.getElementsByClassName('drawer-side');
    drawerSide[0].style.width = 0;
  };

  // function for changing the drawer width on menu button click
  const changeWidth = () => {
    const drawerSide = document.getElementsByClassName('drawer-side');
    drawerSide[0].style.width = 'auto';
  };

  // function to handle logout
  function handleLogout(e) {
    e.preventDefault();

    // const res = await dispatch(logout())
    // if (res?.payload?success)

    navigate('/');
  }
  return (
    <div className="min-h-[90vh]">
      {/* adding the daisy ui drawer */}
      <div className="drawer absolute left-0 z-50 w-fit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu onClick={changeWidth} size={'32px'} className="font-bold text-white m-4" />
          </label>
        </div>
        {/* drawer sidebar */}
        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200   text-base-content min-h-[90vh] sm:w-70 p-4 relative text-xl">
            {/* Sidebar content here */}
            <li className="w-fit">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={'24px'} />
              </button>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>

            {isLoggedIn && role === 'ADMIN' && (
              <li>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              </li>
            )}
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>

            {!isLoggedIn && (
              <div className="flex-col">
                <button className="btn btn-primary px-4 py-1 mt-2 font-semibold rounded-xl w-full text-lg">
                  <Link to={'/login'}>Login</Link>
                </button>

                <button className="btn btn-secondary px-4 py-1  mt-2 font-semibold rounded-xl w-full text-lg">
                  <Link to={'/signup'}>Signup</Link>
                </button>
              </div>
            )}

            {isLoggedIn && (
              <>
                <li>
                  <Link to="/user/profile">Profile</Link>
                </li>
                <li>
                  <Link onClick={handleLogout}>Logout</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {children}

      {/* adding the footer content */}
      <Footer />
    </div>
  );
};

export default HomeLayout;
