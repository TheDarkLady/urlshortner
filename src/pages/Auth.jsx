import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { UrlState } from "@/Context";


function Auth() {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();

  const {isAuthenticated, loading} = UrlState();
  useEffect(()=>{
    if(isAuthenticated && !loading){
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`)
    }
  }, [isAuthenticated, loading])
  return (
    <div className="mt-36 flex flex-col items-center gap-10">
      <h1 className="text-3xl font-extrabold">
        {longLink ? "Hold Up.....Login in first" : "Login / Signup"}
      </h1>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="w-full">
          <TabsTrigger value="login" className="w-full">Account</TabsTrigger>
          <TabsTrigger value="signup" className="w-full">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup"><Signup /></TabsContent>
      </Tabs>
    </div>
  );
}

export default Auth;
