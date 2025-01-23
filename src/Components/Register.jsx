import  { useState } from 'react'
import { useFormik } from 'formik';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import registerImg from "../img/login.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FormSchema } from './FormikSchema';
import { toast } from 'react-toastify';

const Register = () => {
    const [password, setPassword] = useState(true);
    const [cpassword, setCpassword] = useState(true);
    const [loading, setLoading] = useState(false)



    const toggleChange = () => {
        setPassword(!password)
    }
    const toggleChange1 = () => {
        setCpassword(!cpassword)
    }
    const navigate = useNavigate();
    const { handleSubmit, handleChange, values, errors, handleBlur, touched } = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            cpassword: "",
        },
        validationSchema: FormSchema,
        onSubmit: async (values, action) => {
            try {
                setLoading(true)
                const response = await fetch("https://backent-protfolio.onrender.com/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                     const userData = await response.json();
                    setLoading(false)
                    setLoading(false)
                    action.resetForm()
                    localStorage.setItem("token", JSON.stringify(userData.token))
                    toast.success("Registration Successfully")
                    navigate("/")
                } else {
                    const responseData = await response.json();
                    action.resetForm()
                    toast.error(responseData.msg)
                    setLoading(false)
                }
            } catch (error) {
                console.log({ mesg: error });
                setLoading(false)
            }
        },
    });
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-6 col-sm-12 col-lg-6 d-flex align-items-center">
                    <img
                        src={registerImg}
                        alt="register"
                        width={700}
                        className="img-fluid"
                    />
                </div>
                <div className="col-md-6 col-sm-12 col-lg-6">
                    <h1 className="text-center mt-5">Register here</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                className="form-control"
                                autoComplete="off"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {errors.username && touched.username ? (<span style={{ color: "red" }}>{errors.username}</span>) : null}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="form-control "
                                autoComplete="off"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {errors.email && touched.email ? (<span style={{ color: "red" }}>{errors.email}</span>) : null}
                        </div>
                        <div className="mb-3 ">
                            <label htmlFor="username" className="form-label">
                                Paswsord
                            </label>
                            <div className=" position-relative">
                                <input
                                    type={password ? "password" : "text"}
                                    name="password"
                                    className="form-control"
                                    autoComplete="off"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required

                                />
                                <span className="passwordToggle" onClick={toggleChange}>
                                    {password ? <VisibilityOffOutlinedIcon /> : <VisibilityIcon />}
                                </span>
                                {errors.password && touched.password ? (<span style={{ color: "red" }}>{errors.password}</span>) : null}

                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Confirm Paswsord
                            </label>

                            <div className="position-relative">
                                <input
                                    type={cpassword ? "password" : "text"}
                                    name="cpassword"
                                    className="form-control"
                                    autoComplete="off"
                                    value={values.cpassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                <span className="passwordToggle" onClick={toggleChange1}>
                                    {cpassword ? <VisibilityOffOutlinedIcon /> : <VisibilityIcon />}
                                </span>
                                {errors.cpassword && touched.cpassword ? (<span style={{ color: "red" }}>{errors.cpassword}</span>) : null}
                            </div>

                        </div>
                        <div className="d-grid mt-4">
                            <button type="submit" disabled={loading} className="btn btn-primary">
                                {loading ?  "Submitting.." :"Register Now"}
                            </button>
                        </div>
                        <div className="d-grid my-4 text-center">
                            <NavLink to="/login">Already have an account?</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register