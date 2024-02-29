"use client";
import axios from 'axios';
import { useState, useEffect, use } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Video from "next-video";
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import {
    ThickArrowUpIcon,
    ThickArrowDownIcon,
    LayersIcon,
    DotFilledIcon,
    PersonIcon,
    DotsVerticalIcon
} from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import Comment from './Comment';
import { useUserContext } from '@/app/context/UserContext';
import { LuUserCheck, LuThumbsDown, LuThumbsUp  } from "react-icons/lu";
import { FiFolderPlus } from "react-icons/fi";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useForm, Controller } from 'react-hook-form';
function WatchVideoArea(props: any) {
    const { userDetails, userSubscribedChannels } = useUserContext();
    const pathName = usePathname();
    const [video, setVideo] = useState<any>({});
    const [initials, setInitials] = useState<String>("");
    const [isSubscribed, setIsSubscribed] = useState<Boolean>(false);
    const [userPlaylists, setUserPlaylists] = useState<any>([]);
    const { register, handleSubmit, formState: { errors }, reset, control, setValue } = useForm();
    const [isVideoSaved, setIsVideoSaved] = useState<Boolean | any>(false);

    useEffect(() => {
        fetchVideoDetails();
    }, [])

    useEffect(() => {
        if (userSubscribedChannels) {
            const subChannel = userSubscribedChannels.filter((channel: any) => channel?.subscriber === userDetails?._id);
            if (subChannel.length > 0) {
                setIsSubscribed(true);
            }
        }

    }, [userSubscribedChannels])

    const fetchVideoDetails = async () => {
        try {
            const parts = pathName.split('/watch/');
            const id = parts[1];
            const data = await axios.get(`/videos/${id}`)
            setVideo(data.data.data[0])
        } catch (error) {
            console.log(error);

        }
    }

    const extractInitials = () => {
        if (video?.ownerDetails?.fullName) {
            const [firstName, lastName] = video.ownerDetails.fullName.split(' ');
            const firstInitial = firstName.charAt(0);
            const lastInitial = lastName.charAt(0);
            setInitials(firstInitial + lastInitial);
        }
    }

    const toggleLikeButton = async (id: string) => {
        try {
            const data = await axios.post(`/likes/toggle/v/${id}/`)
            fetchVideoDetails();
        } catch (error) {
            console.log(error);
        }
    }

    const toggleDislikeButton = async (id: string) => {
        try {
            const data = await axios.post(`/dislikes/toggle/v/${id}/`)
            fetchVideoDetails();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        extractInitials();
    }, [video])

    const toggleSubscriptionButton = async (id: string) => {
        try {
            const data = await axios.post(`/subscriptions/u/${id}`)
            setIsSubscribed(!isSubscribed);
            fetchVideoDetails();
        } catch (error) {
            console.log(error);
        }
    }

    const saveClickHandler = async () => {
        try {
            const response = await axios.get(`/playlist/user/${userDetails?._id}`)
            const userPlaylists = response.data.data;
            setUserPlaylists(userPlaylists);
            userPlaylists.forEach((playlist: any) => {
                setValue(playlist._id, playlist.videos?.includes(video._id));
            });
            console.log(userPlaylists);

        } catch (error) {
            console.log(error);

        }
    }

    const createPlaylist = async (data: any) => {
        try {
            const response = await axios.post(`/playlist/`, data)
            reset();
            saveClickHandler();
        } catch (error) {
            console.log(error);
        }
    }

    const addVideoToPlaylist = async (playlistId: any) => {
        try {
            const response = await axios.patch(`/playlist/add/${video?._id}/${playlistId}/`)
            saveClickHandler();
        } catch (error) {
            console.log(error);
        }
    }

    const removeVideoFromPlaylist = async (playlistId: any) => {
        try {
            const response = await axios.patch(`/playlist/remove/${video?._id}/${playlistId}/`)
            saveClickHandler();
        } catch (error) {
            console.log(error);
        }
    }

    const checkboxChangeHandler = (e: any, playlistId: any) => {
        const playlist = userPlaylists.find((playlist: any) => playlist._id === playlistId);
        const isVideoInPlaylist = playlist.videos.includes(video?._id);
        if (!isVideoInPlaylist) {
            addVideoToPlaylist(playlistId);
            saveClickHandler();

        } else if (isVideoInPlaylist) {
            removeVideoFromPlaylist(playlistId);
            saveClickHandler();

        }
    }

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
                                <Button onClick={() => toggleLikeButton(video?._id)} className='border-0 gap-1' variant={'outline'}>
                                    <LuThumbsUp className='size-4'></LuThumbsUp>
                                    <span>{video?.likesCount}</span>
                                </Button>
                                <Button onClick={() => toggleDislikeButton(video?._id)} className='border-0 gap-1' variant={'outline'}>
                                    <LuThumbsDown className='size-4'></LuThumbsDown>
                                    <span>{video?.dislikesCount}</span>
                                </Button>

                            </div>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button onClick={() => saveClickHandler()} className='gap-1' variant={'secondary'}>
                                        <FiFolderPlus></FiFolderPlus>
                                        <span>Save</span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className='text-center'>Save To Playlist</DialogTitle>
                                        <DialogDescription>


                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className='w-full grid place-content-center'>

                                        <div className='w-fit items-start flex flex-col gap-3 text-start justify-start'>
                                            {
                                                userPlaylists.length > 0 && userPlaylists.map((playlist: any) => (
                                                    <form key={playlist._id} onChange={(e) => checkboxChangeHandler(e, playlist._id)}>
                                                        <div className="flex text-center justify-center  items-center space-x-2">
                                                            <Controller
                                                                control={control}
                                                                name={playlist._id}
                                                                defaultValue={playlist.videos?.includes(video._id)}
                                                                render={({ field }) => (
                                                                    <Checkbox
                                                                        id={playlist._id}
                                                                        defaultChecked={field.value}
                                                                        onChange={e => {
                                                                            field.onChange((e.target as HTMLInputElement).checked);
                                                                        }}
                                                                    />
                                                                )}
                                                            />
                                                            {/* <Checkbox id={playlist._id} checked={playlist.videos?.includes(video._id)}/> */}
                                                            <Label className='text-white' htmlFor={playlist._id}>{playlist?.name}</Label>
                                                        </div>
                                                    </form>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <Separator></Separator>
                                    <span>
                                        <form onSubmit={handleSubmit(createPlaylist)} className='flex flex-col gap-3'>
                                            <div>
                                                <Label className='text-white' htmlFor='name'>Name</Label>
                                                <Input {...register('name', { required: true })} id='name' type="text" placeholder="Enter playlist name" className="w-full mt-2" />
                                                {errors.name && <p className='text-red-500 mt-2 text-xs'>Name is required</p>}
                                            </div>
                                            <div>
                                                <Label className='text-white' htmlFor='description'>Description</Label>
                                                <Input {...register('description', { required: true })} id='description' type="text" placeholder="Some description for playlist..." className="w-full mt-2" />
                                                {errors.description && <p className='text-red-500 mt-2 text-xs'>Description is required</p>}
                                            </div>
                                            <Button className='w-full mt-2'>Create New Playlist</Button>
                                        </form>
                                    </span>
                                </DialogContent>
                            </Dialog>
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

                        <Button onClick={() => toggleSubscriptionButton(video?.ownerDetails?._id)} className='gap-1'>
                            {isSubscribed ? <LuUserCheck></LuUserCheck> : <PersonIcon></PersonIcon>}
                            <span>
                                {isSubscribed ? 'Followed' : 'Follow'}
                            </span>
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
