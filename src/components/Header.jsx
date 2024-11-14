import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { logout } from "@/db/apiauth";
import { UrlState } from "@/Context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { BarLoader } from "react-spinners";
function Header() {
  const navigate = useNavigate();
  const {user , fetchUser} = UrlState();
  const {loading, fn:fnLogout}= useFetch(logout)
  return (
    <>
    <nav className="py-4 px-24 flex justify-between items-center ">
      <Link to={"/"}>
        <img src="./logo.png" alt="logo image" className="h-16" />
      </Link>
      <div>
        {!user ? (
          <Button onClick={() => navigate("/auth")}>Login</Button>
        ) : (

          <DropdownMenu>
            <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
              <Avatar>
                <AvatarImage src={user?.user_metadata?.profile_pic}  className="object-cover"/>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LinkIcon className="mr-2 h-4 w-4" />
                My Links
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={()=>{
                  fnLogout().then(()=>{
                    fetchUser()
                    navigate("/")
                  })
                }}>
                <LogOut className="mr-2 h-4 w-4"  />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color={"#36d7b7"} />}
    </>
  );
}

export default Header;
