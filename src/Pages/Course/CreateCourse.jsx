import React, { useState } from 'react';
import Layout from '../../Layouts/Layout';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createNewCourse } from '../../Redux/Slices/courseSlice';

const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for storing the user input
  const [userInput, setUserInput] = useState({
    title: '',
    category: '',
    createdBy: '',
    description: '',
    thumbnail: null,
    previewImage: '',
  });

  // function to handle the image upload
  const getImage = (event) => {
    event.preventDefault();
    // getting the image
    const uploadedImage = event.target.files[0];
    // console.log(uploadedImage);

    // if image exists then getting the url link of it
    if (uploadedImage) {
      // setUserInput({ ...userInput, thumbnail: uploadedImage });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener('load', function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadedImage,
        });
      });
    }
  };

  // function to handle user input
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  // function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // for creating a new course
    if (
      !userInput.title ||
      !userInput.category ||
      !userInput.createdBy ||
      !userInput.description ||
      !userInput.thumbnail
    ) {
      toast.error('All fields are mandatory');
      return;
    }

    // calling the api
    const res = await dispatch(createNewCourse(userInput));

    // clearing the input fields
    if (res?.payload?.success) {
      setUserInput({
        title: '',
        category: '',
        createdBy: '',
        description: '',
        thumbnail: undefined,
        previewImage: '',
      });

      // redirecting the user to all courses
      navigate('/courses');
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[90vh]">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center items-center gap-5 rounded-lg p-4 text-white min-w-[60vw] min-h-[60vh] my-10 shadow-[0_0_10px_white] "
          
        >
          {/* <Link
            to={'/admin/dashboard'}
            className="absolute top-8 text-2xl link text-accent cursor-pointer"
          >
            <AiOutlineArrowLeft />
          </Link> */}

          {/* heading */}
          <h1 className="text-center text-2xl font-bold">Create a New Course</h1>

          <main className="grid grid-cols-2 gap-x-16 p-10">
            {/* for course basic details */}
            <div className="space-y-6">
              <div>
                {/* input for image file */}
                <label className="cursor-pointer" htmlFor="image_uploads">
                  {userInput.previewImage ? (
                    <img
                      className="w-full h-44 m-auto border rounded-lg"
                      src={userInput.previewImage}
                      alt="preview image"
                    />
                  ) : (
                    <div className="w-full h-44 m-auto flex items-center justify-center border rounded-lg p-2">
                      <h1 className="font-bold text-lg">Upload your course thumbnail</h1>
                    </div>
                  )}
                </label>
                <input
                required
                  onChange={getImage}
                  className="hidden"
                  type="file"
                  id="image_uploads"
                  name="image_uploads"
                  accept=".jpg, .jpeg, .png"
                />
              </div>

              {/* adding the title section */}
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="title">
                  Course Title
                </label>
                <input
                  required
                  type="name"
                  name="title"
                  id="title"
                  placeholder="Enter the course title"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.title}
                  onChange={handleUserInput}
                />
              </div>
            </div>

            {/* for course description and go to profile button */}

            {/* adding the course description */}
            <div className="flex flex-col gap-1">
              {/* adding the instructor */}
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="createdBy">
                  Instructor Name
                </label>
                <input
                  required
                  type="name"
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter the instructure name"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.createdBy}
                  onChange={handleUserInput}
                />
              </div>

              {/* adding the category */}
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="category">
                  Course Category
                </label>
                <input
                  required
                  type="name"
                  name="category"
                  id="category"
                  placeholder="Enter the category name"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.category}
                  onChange={handleUserInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="description">
                  Course Description
                </label>
                <textarea
                  required
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter the course description"
                  className="bg-transparent px-2 py-1 border h-24 overflow-y-scroll resize-none"
                  value={userInput.description}
                  onChange={handleUserInput}
                />
              </div>
            </div>
          </main>

          {/* Submit Button */}
          <button
            className="w-fit bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2  px-10 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Create Course
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateCourse;
