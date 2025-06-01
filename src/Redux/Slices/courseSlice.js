import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosInstance.js';

const initialState = {
  coursesData: [],
};

// function to get all courses
export const getAllCourses = createAsyncThunk('/course/get', async () => {
  try {
    const res = axiosInstance.get('/courses');

    toast.promise(res, {
      loading: 'Loading courses data...',
      success: 'Courses loaded successfully',
      error: 'Failed to get courses',
    });

    const response = await res;

    return response.data.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// function to create a new course
export const createNewCourse = createAsyncThunk('/courses/create', async (data) => {
  try {
    // end metadata to backend
    
    const res = axiosInstance.post(`/courses/`, {
      title: data.title,
      description: data.description,
      createdBy: data.createdBy,
      category: data.category,
      thumbnail: {
        public_id: data.thumbnail.data.public_id,
        secure_url: data.thumbnail.data.secure_url,
      },
    });

    toast.promise(res, {
      loading: 'Creating the course...',
      success: 'Course created successfully',
      error: 'Failed to create lecture',
    });

    const response = await res;
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong');
    throw error;
  }
});

// function to delete the course
export const deleteCourse = createAsyncThunk('/course/delete', async (id) => {
  try {
    const res = axiosInstance.delete(`courses/${id}`);

    toast.promise(res, {
      loading: 'Deleting the course...',
      success: 'Courses deleted successfully',
      error: 'Failed to delete course',
    });

    const response = await res;

    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// function to update the course details
// export const updateCourse = createAsyncThunk('/course/update', async (data) => {
//     try {
//     // end metadata to backend
//     console.log('Course ID:', data.courseId);
//     console.log('Request URL:', `/courses/${data.courseId}`);
//     console.log(object)
//     const res = axiosInstance.put(`/courses/${data.courseId}`, {
//       title: data.title,
//       description: data.description,
//       createdBy: data.createdBy,
//       category: data.category,
//       thumbnail: data.thumbnail,
//     });

//     toast.promise(res, {
//       loading: 'Updating the course...',
//       success: 'Course updated successfully',
//       error: 'Failed to update course frm thunk',
//     });

//     const response = await res;
//     return response.data;
//   } catch (error) {
//     toast.error(error?.response?.data?.message || 'Something went wrong');
//     throw error;
//   }

// });


export const updateCourse = createAsyncThunk('/course/update', async (data) => {
  try {
    // Logging useful info
    console.log('Course ID:', data.courseId);
    console.log('Request URL:', `/courses/${data.courseId}`);

    // Send request to backend
    const res = await axiosInstance.put(`/courses/${data.courseId}`, {
      title: data.title,
      description: data.description,
      createdBy: data.createdBy,
      category: data.category,
      thumbnail: data.thumbnail,
    });

    // Toast messages
    toast.promise(Promise.resolve(res), {
      loading: 'Updating the course...',
      success: 'Course updated successfully',
      error: 'Failed to update course from thunk',
    });

    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong');
    throw error;
  }
});

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        state.coursesData = [...action.payload];
      }
    });
  },
});

export const {} = courseSlice.actions;
export default courseSlice.reducer;
