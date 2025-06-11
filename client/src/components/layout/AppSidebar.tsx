import React from 'react';
import { FileText, Upload, CheckSquare } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const menuItems = [
  {
    title: 'Templates',
    path: '/templates',
    icon: FileText,
  },
  {
    title: 'Upload',
    path: '/upload',
    icon: Upload,
  },
  {
    title: 'Verification',
    path: '/verification',
    icon: CheckSquare,
  },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex items-center justify-center px-4 py-6">
          <h1 className="text-xl font-bold text-white">Template Builder</h1>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={location.pathname === item.path ? "bg-sidebar-accent" : ""}>
                    <a href={item.path}>
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
