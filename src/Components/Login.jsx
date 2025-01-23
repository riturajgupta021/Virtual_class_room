import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import  { useRef, useState } from "react";
import loginImg from "../img/otp-security.png";
import { NavLink, useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { toast } from 'react-toastify';

const Login = () => {
  const submitButton = useRef()
  const [password, setPassword] = useState(true);
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const toggleChange = () => {
    setPassword(!password)
  }
  const navigate = useNavigate();
  const handlechange = (e) => {
    let { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await fetch("https://backent-protfolio.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const userData = await response.json();
        setUserData({
          ...userData,
          email: "",
          password: "",
        });
        localStorage.setItem("token", userData.token)
        setLoading(false)
        toast.success("Login Successfully")
        navigate("/")
      } else {
        toast.error("invalid details")
        setUserData({
          ...userData,
          email: "",
          password: "",
        });
        setLoading(false)
      }
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  };


  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6 col-sm-12 col-lg-6 d-flex align-items-center">
            <img
              src={loginImg}
              alt="register"
              width={600}
              className="img-fluid"
            />
          </div>
          <div className="col-md-6 col-sm-12 col-lg-6">
            <h1 className="text-center mt-5">Please, Login To Class Room</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control "
                  autoComplete="off"
                  value={userData.email}
                  onChange={handlechange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Paswsord
                </label>
                <div className="position-relative">
                  <input
                    type={password ? "password" : "text"}
                    name="password"
                    className="form-control"
                    autoComplete="off"
                    value={userData.password}
                    onChange={handlechange}
                    required
                  />
                  <span className="passwordToggle" onClick={toggleChange}>
                    {password ? <VisibilityOffOutlinedIcon /> : <VisibilityIcon />}
                  </span>
                </div>
              </div>

              <div className="d-grid mt-4">
                <button type="submit" disabled={loading} className="btn btn-primary" ref={submitButton}>
                  {loading ? "logging.." : "Login"}
                </button>
              </div>
              <div className="d-grid my-4 text-center">
                <NavLink to="/register">Do not have an account?</NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default Login;
