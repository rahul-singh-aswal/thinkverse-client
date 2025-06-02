import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../Layouts/Layout';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { cancelCourseBundle } from '../../Redux/Slices/razorpaySlice';
import { getUserData } from '../../Redux/Slices/AuthSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currDate = new Date();

  const userData = useSelector((state) => state?.auth?.data);

  // function to handle the cancel subscription of course
  const handleCourseCancelSubscription = async () => {
    toast('Initiating cancellation');
    await dispatch(cancelCourseBundle());
    await dispatch(getUserData());
    toast.success('Cancellation completed');
    navigate('/');
  };

  useEffect(() => {
    // getting user details
    dispatch(getUserData());
  }, []);

  return (
    <Layout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-2 text-white  md:max-w-[70vw] shadow-[0_0_10px_white]">
          <img
            className="w-40 h-40 m-auto rounded-[50%] border border-black"
            src={userData?.avatar?.secure_url}
            alt="user profile image"
          />

          <h3 className="text-xl font-semibold text-center capitalize">{userData.fullName}</h3>

          <div className="grid grid-cols-2">
            <p>Email :</p>
            <p>{userData?.email}</p>
            <p>Role :</p>
            <p>{userData?.role === 'ADMIN' ? 'Instructor' : 'Learner'}</p>
            <p>Subscription :</p>
            <p>
              {userData?.subscription?.status === 'active' ||
              new Date(userData?.subscription?.validTill) > currDate
                ? 'Active'
                : 'Inactive'}
            </p>
            <p>
              {userData?.role === 'USER' && new Date(userData?.subscription?.validTill) > currDate
                ? 'Valid Till'
                : ''}
            </p>
            <p>
              {new Date(userData?.subscription?.validTill) > currDate
                ? ` ${new Date(userData?.subscription?.validTill).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}`
                : ''}
            </p>
          </div>

          {/* button to change the password */}
          <div className="flex items-center justify-between gap-2">
            <Link
              to={userData?.email === 'test@gmail.com' ? '/denied' : '/changepassword'}
              className="w-1/2 bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              <button>Change Password</button>
            </Link>

            <Link
              to={userData?.email === 'test@gmail.com' ? '/denied' : '/user/edit-profile'}
              className="w-1/2  bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              <button>Edit Profile</button>
            </Link>
          </div>

          {userData?.subscription?.status === 'active' && (
            <button
              onClick={handleCourseCancelSubscription}
              className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              Cancel Subscription
            </button>
          )}

          {/* {userData?.subscription?.status !== 'active' && (
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              Extend Subscription
            </button>
          )} */}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
