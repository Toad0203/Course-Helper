import { useState, useEffect, useRef } from "react";
import "../styles/fileupload.css";
import { useNavigate } from "react-router-dom";

export default function FileUpload() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      alert("You must be logged in to upload resources");
    }
  }, []);

  const [file, setFile] = useState(null);
  // const [uploadURL, setUploadURL] = useState("");

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }

    // if (
    //   selectedFile &&
    //   selectedFile.type !== "application/zip" &&
    //   !selectedFile.name.endsWith(".zip")
    // ) {
    //   alert("Please attach a .zip file");
    //   return;
    // }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please attach a file");
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wtlx4dxr");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqqnefplu/raw/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      console.log("Cloudinary response:", JSON.stringify(data, null, 2));
      if (data.secure_url) {
        console.log(data.secure_url);
        return data.secure_url;
      } else {
        console.error("Upload failed:", data);
        alert("Upload failed");
        return null;
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload error");
      return null;
    }
  };

  return (
    <div className="file-upload-container">
      <form
        ref={formRef}
        className="upload-form"
        onSubmit={async (e) => {
          e.preventDefault();

          const uploadedUrl = await handleUpload();
          if (!uploadedUrl) return;

          const formData = new FormData(formRef.current);
          const formValues = Object.fromEntries(formData);
          formValues["resource_link"] = uploadedUrl;

          console.log("Form values before POST:", formValues);

          const res = await fetch("http://localhost:5000/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formValues),
          });

          let data;
          try {
            data = await res.json();
          } catch (err) {
            const fallbackText = await res.text();
            console.error("❌ Could not parse JSON:", fallbackText);
            alert("❌ Server didn't return valid JSON.");
            return;
          }

          console.log("Course added:", data);
          alert("Course added successfully!");

          console.log("Redirecting to home...");
          navigate("/");
        }}
      >
        <h3 style={{ textAlign: "center", fontSize: "50px" }}>Upload</h3>
        <label for="course-name">Name of Course</label>
        <input type="text" name="courseName" id="course-name" />
        <label for="course-no">Course number</label>
        <input type="text" name="courseNo" id="course-no" />
        <label for="prof-name">Name of Professor</label>
        <input type="text" name="profName" id="prof-name" />
        <label for="year">Year</label>
        <input type="text" name="year" id="year" placeholder="Ex. 2024-25" />
        <label>Semester</label>
        <label for="odd-sem" style={{ display: "inline" }}>
          Odd
          <input type="radio" name="sem" value="odd" id="odd-sem" />
        </label>
        <label for="even-sem" style={{ display: "inline" }}>
          Even
          <input type="radio" name="sem" value="even" id="even-sem" />
        </label>
        <div className="file-upload-section">
          <input
            type="text"
            name="resourceType"
            placeholder="Resource Name (L1, FCH etc.)"
          />

          <input type="file" onChange={handleFileChange} name="resourceFile" />
        </div>

        <input
          type="submit"
          value="Submit"
          style={{ marginTop: "15px", backgroundColor: "rgb(93, 178, 252)" }}
        />
      </form>
    </div>
  );
}
