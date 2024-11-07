import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";


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
>>>>>>> 0739def310fd42ba9d91ca313c12f5da36e08433
function Header() {
  const navigate = useNavigate();
  const user = true;
  return (
    <nav className="py-4 px-24 flex justify-between items-center ">
      <Link to={"/"}>
      </Link>
      <div>
        {!user ? (
          <Button onClick={() => navigate("/auth")}>Login</Button>
        ) : (
          <DropdownMenu>

              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>The Dark Lady</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LinkIcon className="mr-2 h-4 w-4" />
                My Links</DropdownMenuItem>
<<<<<<< HEAD
              <DropdownMenuItem className="text-red-400">
=======
              <DropdownMenuItem className="text-red-600">
>>>>>>> 0739def310fd42ba9d91ca313c12f5da36e08433
                <LogOut className="mr-2 h-4 w-4" />
                Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
<<<<<<< HEAD

=======
>>>>>>> 0739def310fd42ba9d91ca313c12f5da36e08433
        )}
      </div>
    </nav>
  );
}

export default Header;
