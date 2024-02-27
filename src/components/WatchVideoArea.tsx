"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Video from "next-video";
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ThickArrowUpIcon,
    ThickArrowDownIcon,
    LayersIcon,
    DotFilledIcon,
    PersonIcon,
    DotsVerticalIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import Comment from './Comment';
function WatchVideoArea(props: any) {
    const pathName = usePathname();
    const [video, setVideo] = useState<any>({});
    const [initials, setInitials] = useState<any>("");
    const [subscribers, setSubscribers] = useState<any>([]);

    useEffect(() => {
        ; (async () => {

            try {
                const parts = pathName.split('/watch/');
                const id = parts[1];
                const data = await axios.get(`/videos/${id}`)
                setVideo(data.data.data[0])
            } catch (error) {
                console.log(error);

            }
        }
        )()

    }, [])

    const extractInitials = () => {
        if (video?.ownerDetails?.fullName) {
            const [firstName, lastName] = video.ownerDetails.fullName.split(' ');
            const firstInitial = firstName.charAt(0);
            const lastInitial = lastName.charAt(0);
            setInitials(firstInitial + lastInitial);
        }
    }

    useEffect(() => {
        extractInitials();
    }, [video])



    return (
        <>
            <div className=''>
                <Video src={video?.videoFile} accentColor='#3B82F6' />
            </div>
            <Card className='mt-4 p-3'>
                <CardContent>
                    <div className='flex items-center justify-between'>
                        <div className=''>
                            <p className='text-lg'>{video?.title}</p>
                        </div>
                        <div className=' gap-3 flex'>
                            <div className=' flex border-2 rounded-lg px-1 items-center'>
                                <Button className='border-0' variant={'outline'}>
                                    <ThickArrowUpIcon></ThickArrowUpIcon>
                                    <span>12</span>
                                </Button>
                                <Button className='border-0' variant={'outline'}>
                                    <ThickArrowDownIcon></ThickArrowDownIcon>
                                    <span>12</span>
                                </Button>

                            </div>
                            <Button className='gap-1' variant={'secondary'}>
                                <LayersIcon></LayersIcon>
                                <span>Save</span>
                            </Button>
                        </div>
                    </div>
                    {/* views and time count */}
                    <div className='flex text-center text-muted-foreground text-sm mt-1'>
                        <p>{video?.views} views</p>
                        <DotFilledIcon></DotFilledIcon>
                        <p>Published on {new Date(video?.createdAt).toDateString()}</p>
                    </div>
                    {/* Owner details */}
                    <div className='flex text-center justify-between text-sm mt-5'>
                        <div className='flex'>
                            <Avatar>
                                <AvatarImage src={video?.ownerDetails?.avatar} />
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                            <div className='grid text-start ml-3'>
                                <p>{video?.ownerDetails?.fullName}</p>
                                <p className='text-muted-foreground'>{video?.ownerDetails?.subscribersCount} Followers</p>
                            </div>
                        </div>

                        <Button className='gap-1'>
                            <PersonIcon></PersonIcon>
                            <span>Follow</span>
                        </Button>

                    </div>
                    <Separator className='mt-8'></Separator>
                    {/* Description */}
                    <div className='mt-4'>
                        <p>{video?.description}</p>
                    </div>
                </CardContent>
            </Card>
            <div className='mt-4'>
                <Comment data={video}></Comment>
            </div>
        </>
    )
}

export default WatchVideoArea
