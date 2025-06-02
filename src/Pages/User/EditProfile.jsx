import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUserData, updateProfile } from '../../Redux/Slices/AuthSlice';
import Layout from '../../Layouts/Layout';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewImage, setImagePreview] = useState('');

  const [data, setData] = useState({
    fullName: '',
    avatar: null, // file object
  });

  const getImage = (event) => {
    event.preventDefault();
    const uploadedImage = event.target.files[0];
    if (uploadedImage) {
      setData((prev) => ({
        ...prev,
        avatar: uploadedImage,
      }));
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.onload = () => {
        setImagePreview(fileReader.result);
      };
    }
  };

  const setName = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadToCloudinary = async (file) => {
    try {
      const cloudData = new FormData();
      cloudData.append('file', file);
      cloudData.append('upload_preset', 'thinkverse_uploads'); 
      cloudData.append('cloud_name', 'djfymii3c'); 
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/djfymii3c/image/upload',
        cloudData
      );

      return response.data.url; // Only return URL
    } catch (error) {
      toast.error('Image upload failed');
      throw error;
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!data.fullName || data.fullName.length < 5) {
      toast.error('Name should be at least 5 characters long');
      return;
    }

    let cloudImageURL = '';
    if (data.avatar) {
      cloudImageURL = await uploadToCloudinary(data.avatar);
    }

    const updatedUser = {
      fullName: data.fullName,
      avatar: cloudImageURL || '', // Send empty if no new image
    };

    // dispatch redux action with clean object
    await dispatch(updateProfile(updatedUser));
    await dispatch(getUserData());

    navigate('/user/profile');
  };

  return (
    <Layout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 h-[26rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Edit Profile Page</h1>

          <label className="cursor-pointer" htmlFor="image_uploads">
            {previewImage ? (
              <img
                className="w-28 h-28 rounded-full m-auto"
                src={previewImage}
                alt="preview"
              />
            ) : (
              <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
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

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="fullName">
              Full Name
            </label>
            <input
              required
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter your full name"
              className="bg-transparent px-2 py-1 border"
              value={data.fullName}
              onChange={setName}
            />
          </div>

          <Link to="/user/profile">
            <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
              <AiOutlineArrowLeft /> Back to Profile
            </p>
          </Link>

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Update Profile
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditProfile;
