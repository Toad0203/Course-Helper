// import CourseCard from "./CourseCard.jsx";
// // import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function Courses() {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/courses");
//         const data = await res.json();
//         setCourses(data);
//       } catch (err) {
//         console.error("Failed to fetch courses:", err);
//       }
//     };

//     fetchCourses();
//   }, []);

//   return (
//     <div className="courses-container">
//       <h2
//         style={{ marginLeft: "40px", marginBottom: "20px", fontSize: "30px" }}
//       >
//         Courses List
//       </h2>
//       <div
//         className="courses"
//         style={{
//           padding: "0 20px",
//           display: "flex",
//           justifyContent: "flex-start",
//           flexWrap: "wrap",
//           gap: "20px",
//         }}
//       >
//         {courses.map((course, i) => {
//           return <CourseCard id={i} details={courses[i]} />;
//         })}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import CourseCard from "./CourseCard.jsx";

export default function Courses({ filters }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(filters).toString();

    fetch(`http://localhost:5000/filter?${params}`)
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, [filters]);

  return (
    <div className="courses-container">
      <h2>Courses List</h2>

      <div className="courses-list">
        {courses.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          courses.map((course) => (
            <CourseCard key={course.id} details={course} />
          ))
        )}
      </div>
    </div>
  );
}
