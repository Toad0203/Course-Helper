import "../styles/home.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  // return (
  //   <nav className="navigation">
  //     <Link to="/">
  //       <h1 style={{ marginLeft: "20px", color: "black" }}> Course Helper </h1>
  //     </Link>

  //     <div className="profile-area">
  //       <Link to="/upload">
  //         <Button
  //           variant="contained"
  //           sx={{
  //             boxShadow: 0,
  //             ":hover": { boxShadow: 0 },
  //             mr: "20px",
  //             bgcolor: "green",
  //           }}
  //         >
  //           UPLOAD
  //         </Button>
  //       </Link>
  //       {isLoggedIn ? (
  //         <Link to="/login">
  //           <Button
  //             onClick={handleLogout}
  //             variant="contained"
  //             sx={{ boxShadow: 0, ":hover": { boxShadow: 0 }, mr: "20px" }}
  //           >
  //             LOGOUT
  //           </Button>
  //         </Link>
  //       ) : (
  //         <>
  //           <Link to="/login">
  //             <Button
  //               variant="contained"
  //               sx={{ boxShadow: 0, ":hover": { boxShadow: 0 }, mr: "20px" }}
  //             >
  //               LOGIN
  //             </Button>
  //           </Link>
  //           <Link to="/register">
  //             <Button
  //               variant="contained"
  //               sx={{ boxShadow: 0, ":hover": { boxShadow: 0 }, mr: "20px" }}
  //             >
  //               REGISTER
  //             </Button>
  //           </Link>
  //         </>
  //       )}
  //     </div>
  //   </nav>
  // );

  return (
    <nav className="navigation">
      <Link to="/" className="logo-link">
        <h1 className="logo">Course Helper</h1>
      </Link>

      <div className="profile-area">
        <Link to="/upload">
          <Button
            variant="contained"
            sx={{
              bgcolor: "#22c55e",
              textTransform: "none",
              fontWeight: 500,
              borderRadius: "6px",
              px: 2,
              ":hover": { bgcolor: "#16a34a" },
            }}
          >
            Upload
          </Button>
        </Link>

        {isLoggedIn ? (
          <Button
            onClick={handleLogout}
            variant="contained"
            sx={{
              bgcolor: "#3b82f6",
              textTransform: "none",
              fontWeight: 500,
              borderRadius: "6px",
              px: 2,
              ":hover": { bgcolor: "#2563eb" },
            }}
          >
            Logout
          </Button>
        ) : (
          <>
            <Link to="/login">
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  borderRadius: "6px",
                  fontWeight: 500,
                  px: 2,
                }}
              >
                Login
              </Button>
            </Link>

            <Link to="/register">
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#3b82f6",
                  textTransform: "none",
                  borderRadius: "6px",
                  fontWeight: 500,
                  px: 2,
                  ":hover": { bgcolor: "#2563eb" },
                }}
              >
                Register
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
