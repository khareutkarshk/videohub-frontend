"use client";
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DotFilledIcon } from '@radix-ui/react-icons'
import React from 'react'
import { Card, CardHeader, CardContent, CardDescription } from './ui/card'
import { useRouter } from "next/navigation";
import Image from "next/image";

function RecommandedVideoInfo(videoInfo: any) {
    const router = useRouter();

    const handleVideoClick = () => {
        router.push(`/watch/${videoInfo.video._id}`);
    }
    return (
        <>
            <Card onClick={handleVideoClick} className="md:grid border-0 py-2 gap-3 grid-cols-12 cursor-pointer hover:bg-accent ease-in transition">
                <div className="col-span-5">
                    <AspectRatio ratio={16 / 9}>
                        <Image className="rounded" src={videoInfo?.video.thumbnail} alt="thumbnail" layout="fill" />
                    </AspectRatio>
                </div>
                <div className='col-span-7  flex flex-col gap-1 py-1'>
                    <div>
                        <CardHeader className="flex sm:text-sm flex-col p-0 items-start gap-2">
                            {videoInfo.video.title}
                        </CardHeader>
                    </div>

                    <div>
                        <span className='sm:text-sm text-xs text-muted-foreground'>{videoInfo.video.owner.fullName}</span>
                    </div>

                    <div>
                        <CardContent className='p-0'>
                            <CardDescription className="flex items-center gap-2">
                                <span className='truncate sm:text-sm text-xs'>
                                    {videoInfo.video.views} views
                                </span>
                                <DotFilledIcon></DotFilledIcon>
                                <span className='truncate sm:text-sm text-xs'>{new Date(videoInfo.video.createdAt).toDateString()}</span>
                            </CardDescription>
                        </CardContent>
                    </div>
                </div>

            </Card>
        </>
    )
}

export default RecommandedVideoInfo
