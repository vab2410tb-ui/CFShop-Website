import { ProfileInfo } from "@/app/(protected)/_components/profile/profile-info";
import { currentUser } from "@/lib/auth/auth";


const ServerPage = async () => {
    const user = await currentUser();
    
    

    return (
        <div className="h-full w-full">
            <ProfileInfo label="Profile" user={user} />
        </div>
    );
}

export default ServerPage;