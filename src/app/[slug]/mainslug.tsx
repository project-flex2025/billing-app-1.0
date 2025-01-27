"use client"; // Mark the component as a Client Component
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CreateOder from '../createorder/createordercomp';
import Table from '@/components/Table';
import { Button, Card } from '@mui/material';

export default function MainSlug() {
    const router = useRouter()
  const [config, setConfig] = useState<{
    header: boolean;
    footer: boolean;
    navbar: boolean;
    charts: boolean;
    navBarType: string;
    menuItems: { name: string,
        components: string ,subMenuItems?: { name: string ,components: string}[];        }[];
  } | null>(null);  
  const params = useParams();
  const slug = params.slug; // Access the slug value from the dynamic route

  useEffect(() => {
    const storedConfig = localStorage.getItem("dashboardConfig");
    if (storedConfig) {
      setConfig(JSON.parse(storedConfig));
    }
  }, []);

  const menuItem = config?.menuItems?.filter((ele:any) => (ele.name).replace(/\s/g, "") == slug)[0]

  return <div>
    {menuItem?.components ? (
        <div>
          {menuItem?.components == "Components" && <Table></Table>}
          {menuItem?.components == "Modules" && <CreateOder></CreateOder>}

    </div>
):(
<Card sx={{display: 'flex',gap:2,p:2}}>{menuItem?.subMenuItems?.map((ele:any) => <Button variant='contained' onClick={() => router.push(`/${slug}/${(ele.name).replace(/\s/g, "")}`)
}>{ele.name}</Button>)}</Card>) }
  </div>
}                                                                                                                                           