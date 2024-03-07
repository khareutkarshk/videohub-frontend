"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import RecommandedVideoInfo from './RecommandedVideoInfo';
function RecommandedVideos() {

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
            <div className="flex flex-col w-full gap-5">
                {videoList.map((video:any) => (
                    <RecommandedVideoInfo key={video._id} video={video} page={'recommand'}/>
                ))}
            </div>
        </>
  )
}

export default RecommandedVideos
