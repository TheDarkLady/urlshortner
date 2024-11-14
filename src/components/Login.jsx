import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import * as Yup from 'yup';
import useFetch from "@/hooks/useFetch";
import { login } from "@/db/apiauth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/Context";
function Login() {
  const [errors, setErrors] = useState([])
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,

    }))
  }
  const { data, error, loading, fn: fnLogin } = useFetch(login, formData);
  const {fetchUser} = UrlState();
  useEffect(() => {
    console.log("data", data);
    if (error === null && data) {
      console.log("data", data);
      
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`)
      fetchUser();
    }
  }, [data, error]);
  const handleLogin = async () => {
    setErrors([]);
    // console.log("form Data", formData)
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email("Invalid Email").required("Email is required"),
        password: Yup.string().min(6, "Password must be atleast 6 characters").required("Password is required")
      });
      await schema.validate(formData, { abortEarly: false });
      await fnLogin()
      // api call
    }
    catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors)
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to your account if you already have one</CardDescription>
        {(errors.email || errors.password || error) && (
          <Error message={errors.email || errors.password || "Invalid email or password"} />
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input name="email"  type="email" placeholder="Enter Email" onChange={handleInputChange} />
          {/* {errors.email && <Error message={errors.email} />} */}
        </div>
        <div className="space-y-1">
          <Input name="password" type="password" placeholder="Enter password" onChange={handleInputChange} />
          {/* {errors.password && <Error message={errors.password} />} */}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin}>
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
}


export default Login;
