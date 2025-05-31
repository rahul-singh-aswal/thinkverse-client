import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addCourseLecture } from "../../Redux/Slices/lectureSlices";
import Layout from "../../Layouts/Layout";
import axios from "axios";

const AddLecture = () => {
  const location = useLocation();
  const courseDetails = location?.state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    id: courseDetails?._id,
    title: "",
    description: "",
    videoSrc: "",
    lecture: undefined,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  const getVideo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const src = URL.createObjectURL(file);
    setUserInput((prev) => ({ ...prev, videoSrc: src, lecture: file }));
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "thinkverse_uploads"); // 🔁 change this
    data.append("cloud_name", "djfymii3c");       // 🔁 change this

    const res = await axios.post("https://api.cloudinary.com/v1_1/djfymii3c/video/upload", data); // 🔁 change this if image/audio
   
    return res;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { title, description, lecture } = userInput;
    if (!title || !description || !lecture) {
      toast.error("All fields are mandatory");
      return;
    }

    try {
      toast.loading("Uploading video to Cloudinary...");
      const cloudUrl = await uploadToCloudinary(lecture);
      toast.dismiss();
      toast.success("Uploaded to Cloudinary");

      const res = await dispatch(
        addCourseLecture({
          id: userInput.id,
          title,
          description,
          lecture: cloudUrl,
        })
      );

      if (res?.payload?.success) {
        setUserInput({
          id: courseDetails?._id,
          title: "",
          description: "",
          videoSrc: "",
          lecture: undefined,
        });
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Upload failed");
      console.error(err);
    }
  };

  if (!courseDetails) {
    return <Layout><div className="text-white">Invalid course. Go back.</div></Layout>;
  }

  return (
    <Layout>
      <div className="text-white flex flex-col items-center justify-center gap-10 mx-16 min-h-[90vh]">
        <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
          <header className="flex items-center justify-center relative">
            <button onClick={() => navigate(-1)} className="absolute left-2 text-xl text-green-500">
              <AiOutlineArrowLeft />
            </button>
            <h1 className="text-xl text-yellow-500 font-semibold">Add your new lecture</h1>
          </header>
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              value={userInput.title}
              onChange={handleInputChange}
              placeholder="Enter the title for lecture"
              className="bg-transparent px-3 py-1 border"
            />
            <textarea
              name="description"
              value={userInput.description}
              onChange={handleInputChange}
              placeholder="Enter the description for lecture"
              className="resize-none overflow-y-scroll h-24 bg-transparent px-3 py-1 border"
            />
            {userInput.videoSrc ? (
              <video
                src={userInput.videoSrc}
                muted
                controls
                className="object-fill rounded-lg w-full"
              />
            ) : (
              <div className="h-48 border flex items-center justify-center cursor-pointer">
                <label htmlFor="lecture" className="font-semibold text-xl cursor-pointer">
                  Choose your video
                </label>
                <input
                  type="file"
                  name="lecture"
                  id="lecture"
                  onChange={getVideo}
                  accept="video/mp4,video/*"
                  className="hidden"
                />
              </div>
            )}
            <button type="submit" className="btn btn-primary py-1 font-semibold text-lg">
              Add Lecture
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddLecture;
