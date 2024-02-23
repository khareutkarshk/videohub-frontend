"use Client"
import React from 'react'
import SideBar from './SideBar'
import WatchVideoArea from './WatchVideoArea'
import { Card, CardContent } from './ui/card'
function WatchVideoLayout() {
  return (
    <>
      <div className='grid sm:grid-cols-12'>
        <div className='sm:col-span-1  bg-slate-500'>
          <SideBar page="watch"></SideBar>
        </div>
        <div className='sm:col-span-7 p-5'>
          <WatchVideoArea></WatchVideoArea>
        </div>
        <div className='bg-red-500 sm:col-span-4'>
          Suggetions
        </div>
      </div>
    </>
  )
}

export default WatchVideoLayout
