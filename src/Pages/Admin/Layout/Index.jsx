import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Index = ({ children }) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <main className="page-wrapper rbt-dashboard-page">
        <div className="rbt-panel-wrapper">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Sidebar sidebarOpen={sidebarOpen} />
          {children}
        </div>
      </main>
    </>
  );
};

export default Index;
