import React from 'react';
import AdminMenu from "@/app/(admin)/admin/AdminMenu";
import AdminSidebar from "@/app/(admin)/admin/AdminSidebar";

const AdminLayout = ({children}: any) => {
    return (
        <>
            <div className={"flex"}>
                <div className={"flex-1 p-20 h-screen"}>
                     <AdminSidebar/>
                </div>
                <div className={"p-[20px] flex-4"}>
                    <AdminMenu/>
                    {children}
                </div>
            </div>
        </>
    );
};

export default AdminLayout;