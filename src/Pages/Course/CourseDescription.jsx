import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../Layouts/Layout';

const CourseDescription = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { role, data } = useSelector((state) => state.auth);
  const currDate = new Date();

  useEffect(() => {
    // scroll to the top on page render
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* wrapper for course description */}
      <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white ">
        {/* displaying the course details */}
        <div className="grid grid-cols-2 gap-10 p-10 relative bg-zinc-700  rounded-lg hover:shadow-[0_0_10px_white]">
          {/* creating the left side of description box */}
          <div className="space-y-5">
            <img
              className="w-full h-64 rounded-lg"
              src={state?.thumbnail?.secure_url}
              alt="thumbnail"
            />

            {/* course details */}
            <div className="space-y-4">
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
                  className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
                >
                  Watch Lectures
                </button>
              ) : (
                <button
                  onClick={() => navigate('/checkout')}
                  className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
                >
                  Subscribe to Course
                </button>
              )}
            </div>
          </div>

          {/* creating the right section of description box */}
          <div className="space-y-2 text-xl">
            <h1 className="text-3xl font-bold text-yellow-500  mb-4">{state.title}</h1>

            <p className="text-yellow-500 font-bold">Course Description :</p>

            <p>{state.description}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDescription;
