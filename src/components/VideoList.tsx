"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import VideoInfo from "./VideoInfo";
export default function VideoList() {

    const [videoList, setVideoList] = useState<any[]>([])

    useEffect(() => {
       ;(async () =>{
        const data = await axios.get("/videos/getAllVideos")
        let res = data.data.data
        setVideoList(data.data.data)
        console.log(res[0].title);
        
       })()
            
    }, [])

    return (
        <>
            <div className="flex flex-wrap gap-5">
                {videoList.map((video:any) => (
                    <VideoInfo key={video._id} video={video} />
                ))}
            </div>
        </>
    )
}