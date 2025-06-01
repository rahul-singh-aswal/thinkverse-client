import React, { useState, useEffect } from 'react';
import Layout from '../../Layouts/Layout';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
import toast from 'react-hot-toast';
import { updateCourse } from '../../Redux/Slices/courseSlice.js';

const EditCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const courseDetails = location?.state;

  // Extract the actual course data from the nested structure
  const courseData = courseDetails?.initialCourseData || courseDetails;

  console.log('Raw location state:', courseDetails);
  console.log('Extracted course data:', courseData);

  // for storing the user input
  const [userInput, setUserInput] = useState({
    title: '',
    category: '',
    createdBy: '',
    description: '',
    thumbnail: undefined,
    previewImage: '',
  });

  // Pre-fill form data when component mounts
  useEffect(() => {
    if (courseData) {
      console.log('Pre-filling form with:', courseData);

      setUserInput((prevState) => ({
        ...prevState,
        title: courseData?.title || '',
        category: courseData?.category || '',
        createdBy: courseData?.createdBy || '',
        description: courseData?.description || '',
        thumbnail: {
          secure_url: courseData?.thumbnail?.secure_url,
          public_id: courseData?.thumbnail?.public_id,
        },
        previewImage:
          courseData?.thumbnail?.secure_url ||
          courseData?.thumbnail?.url ||
          courseData?.thumbnail ||
          '',
      }));
    }
  }, [courseData]);

  // function to handle the image upload
  const getImage = (event) => {
    event.preventDefault();
    // getting the image
    const uploadedImage = event.target.files[0];

    // if image exists then getting the url link of it
    if (uploadedImage) {
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

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'thinkverse_uploads');
    data.append('cloud_name', 'djfymii3c');

    const res = await axios.post('https://api.cloudinary.com/v1_1/djfymii3c/image/upload', data);
    return res;
  };

  // function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if we have courseData (course ID is needed for update)
    if (!courseData?._id && !courseData?.id) {
      toast.error('Course ID is missing. Cannot update course.');
      return;
    }

    // Validation - only require fields that user wants to update
    if (!userInput.title || !userInput.category || !userInput.createdBy || !userInput.description) {
      toast.error('All text fields are mandatory');
      return;
    }

    try {
      let updateData = {
        courseId: courseData._id || courseData.id, // Include course ID for backend
        title: userInput.title,
        category: userInput.category,
        createdBy: userInput.createdBy,
        description: userInput.description,
        thumbnail: userInput.thumbnail,
      };

      if (!userInput?.thumbnail?.secure_url) {
        toast.loading('Uploading new image to Cloudinary...');
        const cloudUrl = await uploadToCloudinary(userInput.thumbnail);
        toast.dismiss();
        toast.success('Image uploaded to Cloudinary');

        // Add the new thumbnail URL to update data
        updateData.thumbnail = {
          secure_url: cloudUrl.data.secure_url,
          public_id: cloudUrl.data.public_id,
        };
      }
      console.log(updateData);
      // Dispatch update action
      //   const res = await dispatch(updateCourse(updateData));

      const res = await dispatch(updateCourse(updateData));

      if (res?.payload?.success) {
        toast.success('Course updated successfully!');
        navigate('/courses');
      } else {
        toast.error('Failed to update course');
      }
    } catch (err) {
      toast.dismiss();
      toast.error('Update failed');
      console.error(err);
    }
  };

  // Show error if no course details
  if (!courseData) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[90vh]">
          <div className="text-white text-center">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p>No course data found. Please go back and try again.</p>
            <Link to="/courses" className="text-yellow-500 underline mt-4 block">
              Back to Courses
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[90vh]">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center items-center gap-5 rounded-lg p-4 text-white min-w-[60vw] min-h-[60vh] my-10 shadow-[0_0_10px_white]"
        >
          {/* heading */}
          <h1 className="text-center text-2xl font-bold">Update the Course</h1>

          <main className="md:grid grid-cols-2 gap-x-16 p-10">
            {/* for course basic details */}
            <div className="space-y-6">
              <div>
                {/* input for image file */}
                <label className="cursor-pointer" htmlFor="image_uploads">
                  {userInput.previewImage ? (
                    <img
                      className="w-full h-44 m-auto border rounded-lg object-cover"
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
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter the course title"
                  className="bg-transparent px-2 py-1 border rounded"
                  value={userInput.title}
                  onChange={handleUserInput}
                />
              </div>
            </div>

            {/* for course description and other fields */}
            <div className="flex flex-col gap-4">
              {/* adding the instructor */}
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="createdBy">
                  Instructor Name
                </label>
                <input
                  required
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter the instructor name"
                  className="bg-transparent px-2 py-1 border rounded"
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
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Enter the category name"
                  className="bg-transparent px-2 py-1 border rounded"
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
                  name="description"
                  id="description"
                  placeholder="Enter the course description"
                  className="bg-transparent px-2 py-1 border rounded h-24 overflow-y-scroll resize-none"
                  value={userInput.description}
                  onChange={handleUserInput}
                />
              </div>
            </div>
          </main>

          {/* Submit Button */}
          <button
            className="w-fit bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 px-10 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Update Course
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditCourse;
