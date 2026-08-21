import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth/auth";


const ServerPage = async () => {
    const user = await currentUser();

    return (
        <UserInfo label="Server component" user={user}/>
    );
}

export default ServerPage;