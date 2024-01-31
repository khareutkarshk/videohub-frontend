"use client";
import SideBar from "./SideBar";
import VideoList from "./VideoList";
export default function Home() {
    return (
        <>
            <div className="flex min-h-screen w-full">
                <SideBar></SideBar>

                <div className="flex-1 w-4/5 p-6">

                    <VideoList></VideoList>
                </div>
            </div>
        </>
    )
}