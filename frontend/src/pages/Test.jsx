import { useState, useEffect } from "react";

const BASE_URL = "http://localhost:5000";

export default function Test() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch(BASE_URL);
      const courses = await response.json();
      setCourses(courses);
    };

    fetchCourses();
  }, []);

  const [file, setFile] = useState(null);
  const [uploadURL, setUploadURL] = useState("");

  const handleFileChange = async (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wtlx4dxr");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dqqnefplu/raw/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    console.log("Uploaded file URL:", data.secure_url);
    setUploadURL(data.secure_url);
  };
  return (
    <>
      <div className="container">
        <h1>Fetching data in React</h1>
        <ul>
          {courses.map((course) => {
            return (
              <li id={course.id}>
                {course.name}, {course.resource_link}
              </li>
            );
          })}
        </ul>

        <form
          method="post"
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const formValues = Object.fromEntries(formData);
            console.log(formValues);

            const res = await fetch("http://localhost:5000/post", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formValues),
            });

            const data = await res.json();
            console.log("Course added:", data);
            alert("Course added successfully!");
          }}
          onSubmit={handleUpload}
        >
          <input type="text" name="name" />
          <input type="file" onChange={handleFileChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}
