import React from 'react';
import UserSidebar from "@/app/user/UserSidebar";
import UserMenu from "@/app/user/UserMenu";

const UserLayout = ({children}:any) => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={"p-10 h-screen bg-gray-300"}>
                    <UserSidebar/>
                </div>
                <div className={"col-span-2 p-20"}>
                   <div className={"bg-gray-300"}>
                       <UserMenu/>
                   </div>
                   <div>
                       {children}
                   </div>
                </div>
            </div>
        </>
    );
};

export default UserLayout;