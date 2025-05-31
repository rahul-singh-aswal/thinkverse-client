import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosInstance';

const initialState = {
  lectures: [],
};

// function to get all the lectures
// function to get all the lectures
export const getCourseLecture = createAsyncThunk('/course/lecture/get', async (courseId) => {
  try {
    const resPromise = axiosInstance.get(`/courses/${courseId}`);

    toast.promise(resPromise, {
      loading: 'Fetching the lectures...',
      success: 'Lectures fetched successfully',
      error: 'Failed to fetch lectures',
    });

    const response = await resPromise;
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong');
    throw error; // rethrow to ensure thunk handles it correctly
  }
});


// function to add new lecture to the course
// export const addCourseLecture = createAsyncThunk('/course/lecture/add', async (data) => {
//   const formData = new FormData();
//   formData.append('lecture', data.lecture);
//   formData.append('title', data.title);
//   formData.append('description', data.description);

//   try {
//     const res = axiosInstance.post(`/courses/${data.id}`, formData);

//     toast.promise(res, {
//       loading: 'Adding the lecture...',
//       success: 'Lecture added successfully',
//       error: 'Failed to add lecture',
//     });

//     const response = await res;

//     return response.data;
//   } catch (error) {
//     toast.error(error?.response?.data?.message);
//   }
// });

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "thinkverse_uploads"); // 🔁 Replace this
  formData.append("cloud_name", "djfymii3c");        // 🔁 Replace this

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/djfymii3c/video/upload",
    formData
  );

  return {
    public_id: res.data.public_id,
    secure_url: res.data.secure_url,
  };
};

export const addCourseLecture = createAsyncThunk(
  "/course/addlecture",
  async (data) => {
    try {
     {console.log(data)}

      // end metadata to backend
      const res = axiosInstance.post(`/courses/${data.id}`, {
        title: data.title,
        description: data.description,
        lecture: {public_id: data.lecture.data.public_id, secure_url: data.lecture.data.secure_url},
      });

      toast.promise(res, {
        loading: "Adding the lecture...",
        success: "Lecture added successfully",
        error: "Failed to add lecture",
      });

      const response = await res;
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      throw error;
    }
  }
);

// function to delete the lecture from the course
export const deleteCourseLecture = createAsyncThunk('/course/lecture/delete', async (data) => {
  console.log(data);
  try {
    const res = axiosInstance.delete(
      `/courses/?courseId=${data.courseId}&lectureId=${data.lectureId}`
    );

    toast.promise(res, {
      loading: 'Deleting the lecture...',
      success: 'Lecture deleted successfully',
      error: 'Failed to delete lecture',
    });

    const response = await res;
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const lectureSlice = createSlice({
  name: 'lecture',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLecture.fulfilled, (state, action) => {
        state.lectures = action?.payload?.lectures;
      })
      .addCase(addCourseLecture.fulfilled, (state, action) => {
        state.lectures = action?.payload?.course?.lectures;
      });
  },
});

export const {} = lectureSlice.actions;
export default lectureSlice.reducer;
