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