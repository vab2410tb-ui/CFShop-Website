"use client"

import { logout } from "@/actions/auth/logout";

const SettingPage =  () => {
    const onClick = () => {
        logout();
    }
    
    return (
        <div className="bg-white p-10 rounded-xl">
            <button onClick={onClick}  type="submit">
                Sign Out
            </button>
        </div>
    );
};
 
export default SettingPage;