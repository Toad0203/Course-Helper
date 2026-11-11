export default function Dropdown({ label, name }) {
  const dropStyle = {
    height: "40px",
    width: "80%",
    borderRadius: "5px",
    paddingLeft: "10px",
    outline: "none",
    margin: "auto",
    display: "block",
    marginBottom: "20px",
  };

  return (
    <>
      <label style={{ marginLeft: "40px" }} for={name}>
        {label}
      </label>

      {name === "year" ? (
        <select style={dropStyle} name={name}>
          {" "}
          <option value="">Select {name}</option>
          <option value="24-25">2024-25</option>
          <option value="24-25">2023-24</option>
          <option value="24-25">2022-23</option>
          <option value="24-25">2021-22</option>{" "}
        </select>
      ) : (
        <select style={dropStyle} name={name}>
          {" "}
          <option value="">Select {name}</option>
          <option value="odd">Odd</option>
          <option value="even">Even</option>
        </select>
      )}
    </>
  );
}
