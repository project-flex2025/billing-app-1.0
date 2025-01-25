"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Sidenav";
import CreateOder from "../createorder/createordercomp";
import HorizontalNavbar from "@/components/Horizontalnav";

const Dashboard = () => {
  const [config, setConfig] = useState<{
    header: boolean;
    footer: boolean;
    navbar: boolean;
    charts: boolean;
    navBarType: string;
    menuItems: string[];
  } | null>(null);

  useEffect(() => {
    const storedConfig = localStorage.getItem("dashboardConfig");
    if (storedConfig) {
      setConfig(JSON.parse(storedConfig));
    }
  }, []);
  ``
  if (!config) {
    return <p className="text-center mt-6">Loading configuration...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      {config.header && <Header />}
      {config.navBarType == "horizontal" &&  <HorizontalNavbar menuItems={config.menuItems} />}
     
      <div className="flex flex-grow">
        {config.navBarType == "side" && (
          <aside className="w-64 bg-white shadow-md border-r border-gray-200">
            <Navbar menuItems={config.menuItems} />
          </aside>
        )}
        <main className="flex-grow p-8">
        <CreateOder></CreateOder> 
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

