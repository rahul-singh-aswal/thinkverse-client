import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../Layouts/Layout';
import { deleteCourse, getAllCourses } from '../../Redux/Slices/courseSlice';

const CourseDescription = () => {
  const { state } = useLocation();
  {
    console.log(state);
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role, data } = useSelector((state) => state.auth);
  const currDate = new Date();

  // function to handle the course delete
  const handleCourseDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete the course?')) {
      const res = await dispatch(deleteCourse(id));

      // fetching the new updated data for the course
      if (res.payload.success) {
        await dispatch(getAllCourses());
      }
      navigate('/courses');
    }
  };

  useEffect(() => {
    // scroll to the top on page render
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* wrapper for course description */}
      <div className="min-h-[90vh] pt-12 px-20 flex  flex-col items-center justify-center text-white ">
        {/* displaying the course details */}
        <div className="  md:grid grid-cols-2 gap-10 p-10 relative bg-zinc-700  rounded-lg hover:shadow-[0_0_10px_white]">
          {/* creating the left side of description box */}
          <div className="space-y-5">
            <img
              className=" border-white border-[1px] md:hidden w-full h-64 rounded-lg"
              src={state?.thumbnail?.secure_url}
              alt="thumbnail"
            />
            

            {/* course details */}
            <div className="space-y-4">
               <h1 className="text-3xl font-bold text-yellow-500  mb-4">{state.title}</h1>

            <p className="text-yellow-500 font-bold">Course Description :</p>

            <p>{state.description}</p>
              <div className="flex-col items-center justify-between text-xl">
                <p className="font-semibold">
                  <span className="text-yellow-500 font-bold">Total Lectures : </span>
                  {state.numberOfLectures}
                </p>
                <p className="font-semibold">
                  <span className="text-yellow-500 font-bold">Instructor : </span>
                  {state.createdBy}
                </p>
              </div>

              {role === 'ADMIN' || new Date(data?.subscription?.validTill) > currDate ? (
                <button
                  onClick={() =>
                    navigate('/courses/lectures', {
                      state: { ...state },
                    })
                  }
                  className="  btn flex bg-yellow-500 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-600 transition-all  ease-in-out duration-300 my-2"
                >
                  Watch Lectures
                </button>
              ) : (
                <button
                  onClick={() => navigate('/checkout')}
                  className="btn bg-yellow-500 text-xl rounded-md text-center font-bold px-5 py-3 w-full hover:bg-yellow-600 transition-all ease-in-out duration-300 my-2"
                >
                  Subscribe to Course
                </button>
              )}
            </div>
          </div>

          {/* creating the right section of description box */}
          <div className="space-y-2 text-xl">
            <img
              className="border-white border-[1px] hidden md:flex w-full h-64 rounded-lg"
              src={state?.thumbnail?.secure_url}
              alt="thumbnail"
            />
           
            {role === 'ADMIN' ? (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleCourseDelete(state?._id)}
                  className="btn bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-30 text-xl py-2 px-4 my-2 rounded-md font-bold"
                >
                  Delete Course
                </button>
                <button
                  onClick={() =>
                    navigate('/course/update', {
                      state: { ...state },
                    })
                  }
                  className="btn bg-blue-500 hover:bg-blue-600 transition-all ease-in-out duration-30 text-xl py-2 px-4 rounded-md font-bold my-1"
                >
                  Edit Course Details
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDescription;
