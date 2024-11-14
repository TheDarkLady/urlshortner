import React from 'react';
import { useState, useEffect } from "react";
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
import { login, signup } from "@/db/apiauth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/Context";
function Signup() {
  const [errors, setErrors] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null
  })
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,

    }))
  }
  const { data, error, loading, fn: fnSignup } = useFetch(signup, formData);
  const {fetchUser} = UrlState();
  useEffect(() => {
    console.log("data", data);
    if (error === null && data) {
      console.log("data", data);
      
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`)
      fetchUser();
    }
  }, [error, loading]);
  const handleSignup = async () => {
    setErrors([]);
    // console.log("form Data", formData)
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid Email").required("Email is required"),
        password: Yup.string().min(6, "Password must be atleast 6 characters").required("Password is required"),
        profile_pic: Yup.mixed().required("Profile pic is required")
      });
      await schema.validate(formData, { abortEarly: false });
      await fnSignup()
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
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account if you havent yet</CardDescription>
        {(errors.email || errors.password || errors.name || errors.profile_pic || error) && (
          <Error message={errors.email || errors.password || errors.name || errors.profile_pic || "Invalid email or password"} />
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input name="name" type="text" placeholder="Enter Name" onChange={handleInputChange} />
          {/* {errors.email && <Error message={errors.email} />} */}
        </div>
        <div className="space-y-1">
          <Input name="email" type="email" placeholder="Enter Email" onChange={handleInputChange} />
          {/* {errors.email && <Error message={errors.email} />} */}
        </div>
        <div className="space-y-1">
          <Input name="password" type="password" placeholder="Enter password" onChange={handleInputChange} />
          {/* {errors.password && <Error message={errors.password} />} */}
        </div>
        <div className="space-y-1">
          <Input name="profile_pic" type="file" accept="image/*" onChange={handleInputChange} />
          {/* {errors.password && <Error message={errors.password} />} */}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup}>
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Sign Up"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Signup
