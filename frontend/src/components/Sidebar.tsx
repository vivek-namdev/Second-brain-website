import { Logo } from "../icons/Logo.tsx";
import { Twittericon } from "../icons/Twittericon.tsx";
import { Youtubeicon } from "../icons/Youtubeicon.tsx";
import { SidebarItems } from "./SidebarItems";

export function Sidebar() {
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
        <div className="flex text-2xl pt-4 items-center">
            <div className="pr-2 text-purple-600">
            <Logo/>
            </div>
            Brainly
        </div>
        <div className="pt-4 pl-4">
            <SidebarItems text="Twitter" icon={<Twittericon/>}/>
            <SidebarItems text="Youtube" icon={<Youtubeicon/>}/>
        </div>
    </div>
}