"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import CreateOder from '@/app/createorder/createordercomp';
import Table from '@/components/Table';
const Modules = ["Create order"];
const Components = ["table","Bar Chart"];
function Subslug() {
    const [config, setConfig] = useState<{
      header: boolean;
      footer: boolean;
      navbar: boolean;
      charts: boolean;
      navBarType: string;
      menuItems: { name: string,
          components: string;
          subMenuItems?: { name: string; components: string }[] }[];
    } | null>(null);  
  const params = useParams();
  const slug = params.slug;
  const subslug = params.subslug;

    useEffect(() => {
      const storedConfig = localStorage.getItem("dashboardConfig");
      if (storedConfig) {
        setConfig(JSON.parse(storedConfig));
      }
    }, []);

    const menuItem = config?.menuItems?.filter((ele:any) => (ele.name).replace(/\s/g, "") == slug)[0]

 

  console.log(slug,"slug",subslug);
  
  console.log(menuItem?.subMenuItems?.filter((ele:any) => (ele.name).replace(/\s/g, "") == subslug)[0]?.components    ,"menuitems");  

  
  return (
    <div>
      {menuItem?.subMenuItems?.filter((ele:any) => (ele.name).replace(/\s/g, "") == subslug)[0]?.components == "Modules" && <CreateOder></CreateOder>}
      {menuItem?.subMenuItems?.filter((ele:any) => (ele.name).replace(/\s/g, "") == subslug)[0]?.components == "Components" && <Table></Table> }
    </div>
  )
}

export default Subslug