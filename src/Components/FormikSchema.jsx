import * as Yup from "yup";
export const FormSchema = Yup.object({
    username: Yup.string().min(3, "username must be 3 character").max(20).required("Username is must"),
    email: Yup.string().email().required().matches(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "please enter valid Email"),
    password: Yup.string().required().matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, "passoword must have special character number letters amd capital letter"),
    cpassword: Yup.string().required().oneOf([Yup.ref("password"), null], "Password and Confirm Password must be same")
})