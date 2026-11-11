// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import { useState, useEffect } from "react";

// export default function CourseCard({ details }) {
//   const [resources, setResources] = useState([]);

//   useEffect(() => {
//     const fetchResources = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:5000/courses/${details.id}/resources`
//         );
//         const data = await res.json();
//         setResources(data);
//       } catch (err) {
//         console.error("Failed to fetch resources:", err);
//       }
//     };

//     fetchResources();
//   }, [details.id]);

//   return (
//     <Card sx={{ overflow: "scroll", width: 300, height: 250, marginBottom: 5 }}>
//       <CardContent>
//         <h3 style={{ fontSize: "30px" }}>{details.course_no}</h3>
//         <p style={{ fontSize: "18px" }}>{details.course_name}</p>
//         <p style={{ fontSize: "18px" }}>Professor: {details.prof}</p>
//         <p>
//           Year: {details.course_year}, Semester: {details.semester}
//         </p>
//         <br />
//         <div style={{ height: "90px" }}>
//           <ul className="list">
//             Resources available:
//             {/* <li>
//               <a href="/">FCH</a>
//             </li>
//             <li>
//               <a href="/">Lecture slides</a>
//             </li>
//             <li>
//               <a href="/">PYQs</a>
//             </li>
//             <li>
//               <a href="/">Videos</a>
//             </li> */}
//             {resources.map((resource) => {
//               return (
//                 <li>
//                   <a href={resource.resource_link}>{resource.resource_type}</a>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import { useState, useEffect } from "react";

export default function CourseCard({ details }) {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/courses/${details.id}/resources`,
        );
        const data = await res.json();
        setResources(data);
      } catch (err) {
        console.error("Failed to fetch resources:", err);
      }
    };

    fetchResources();
  }, [details.id]);

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 360,
        height: 280,
        borderRadius: 3,
        boxShadow: 3,
        marginBottom: 3,
        borderLeft: "4px solid #3b82f6",
        display: "flex",
        flexDirection: "column",
        transition: "0.2s",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-3px)",
        },
      }}
    >
      <CardContent>
        {/* Course Code */}
        <Typography variant="h5" fontWeight="bold">
          {details.course_no}
        </Typography>

        {/* Course Name */}
        <Typography
          variant="body1"
          sx={{
            mb: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "48px",
          }}
        >
          {details.course_name}
        </Typography>

        <Divider sx={{ my: 1 }} />

        {/* Metadata */}
        <Typography variant="body2" color="text.secondary">
          Professor: {details.prof}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Year: {details.course_year} | Semester: {details.semester}
        </Typography>

        <Divider sx={{ my: 1.5 }} />

        {/* Resources */}
        {/* Resources */}
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Resources Available
        </Typography>

        <div
          style={{
            overflowY: "auto",
            maxHeight: "90px",
            paddingRight: "5px",
          }}
        >
          <ul style={{ paddingLeft: "18px", margin: 0 }}>
            {resources.map((resource) => (
              <li key={resource.id}>
                <Link
                  href={resource.resource_link}
                  target="_blank"
                  underline="hover"
                >
                  {resource.resource_type}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
