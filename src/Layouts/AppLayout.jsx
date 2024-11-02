import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";
function AppLayout() {
  return (
    <div>
      <main className="min-h-screen">
        {/* Header */}
        <Header />
        {/* Body */}
        <Outlet />
      </main>
      {/* Footer */}
      <div className="p-10 text-center bg-gray-800">
        Made by The Dark Lady
      </div>
    </div>
  );
}

export default AppLayout;
