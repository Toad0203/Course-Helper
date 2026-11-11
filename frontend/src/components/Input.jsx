export default function Input({ name, label, type, placeholder }) {
  const inputStyle = {
    height: "40px",
    width: "80%",
    borderRadius: "5px",
    paddingLeft: "10px",
    border: "none",
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
      <input
        style={inputStyle}
        placeholder={placeholder === "" ? "-" : placeholder}
        type={type}
        name={name}
      />
    </>
  );
}
