"use Client"
import React from 'react'
import SideBar from './SideBar'
import WatchVideoArea from './WatchVideoArea'
import { Card, CardContent } from './ui/card'
import RecommandedVideos from './RecommandedVideos'
function WatchVideoLayout() {

  return (
    <>
      <div className='grid mt-3 md:mx-11 md:grid-cols-12'>
        <div className='md:col-span-8 p-5'>
          <WatchVideoArea></WatchVideoArea>
        </div>
        <div className='md:col-span-4 px-5'>
        <RecommandedVideos></RecommandedVideos>
        </div>
      </div>
    </>
  )
}

export default WatchVideoLayout
