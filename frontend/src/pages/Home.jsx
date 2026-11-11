// import Filters from "../components/Filters";
// import Courses from "../components/Courses";
// import "../styles/home.css";

// export default function CoursesPage() {
//   return (
//     <div className="flex-container" style={{ marginTop: "20px" }}>
//       <Filters />
//       <Courses />
//     </div>
//   );
// }

import Filters from "../components/Filters";
import Courses from "../components/Courses";
import { useState } from "react";
import "../styles/home.css";

export default function CoursesPage() {
  const [filters, setFilters] = useState({});

  return (
    <div className="flex-container" style={{ marginTop: "20px" }}>
      <Filters setFilters={setFilters} />
      <Courses filters={filters} />
    </div>
  );
}
