import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import { Button } from "@mui/material";

export default function Filters({ setFilters }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData);

    // remove empty filters
    const filteredValues = Object.fromEntries(
      Object.entries(formValues).filter(([_, v]) => v !== ""),
    );

    setFilters(filteredValues);
    console.log(formValues);

    const res = await fetch("http://localhost:5000/filter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    });

    console.log(formValues);
  };

  return (
    <div className="filters">
      <form onSubmit={handleSubmit}>
        <h2
          style={{ marginLeft: "40px", marginBottom: "20px", fontSize: "30px" }}
        >
          {" "}
          Filters{" "}
        </h2>
        <div className="filter-inputs" style={{ height: "80%" }}>
          <Input name="courseNo" label="Course No." type="text" />
          <Input name="courseName" label="Course Name" type="text" />
          <Input name="prof" label="Professor" type="text" />
          <Dropdown label="Year" name="year" />
          <Dropdown label="Semester" name="semester" />
          <Button
            type="submit"
            variant="contained"
            sx={{
              display: "block",
              margin: "auto",
              width: "80%",
              boxShadow: 0,
              ":hover": { boxShadow: 0 },
              bgcolor: "black",
            }}
          >
            APPLY FILTERS
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={() => setFilters({})}
            sx={{
              display: "block",
              margin: "10px auto",
              width: "80%",
            }}
          >
            CLEAR FILTERS
          </Button>
        </div>
      </form>
    </div>
  );
}
