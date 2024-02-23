"use client";
import React from 'react'
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { RocketIcon, PaperPlaneIcon, DotsVerticalIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { timeAgo } from '@/utils/timeAgo';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"
function Comment(props: any) {
    const router = useRouter();
    const pathName = usePathname();
    const [comments, setComments] = useState<any[]>([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState("bottom")

    useEffect(() => {
        fetchComments();
    }, [])

    const fetchComments = async () => {
        const parts = pathName.split('/watch/');
        const id = parts[1];
        const response = await axios.get(`/comments/${id}`);
        setComments(response.data.data);
    }

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            const parts = pathName.split('/watch/');
            const id = parts[1];
            const response = await axios.post(`/comments/${id}`, data);
            fetchComments();
            setLoading(false);
            reset();
            toast.success('Comment Posted Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong while posting comment', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setLoading(false);
        }
    }


    return (
        <>
            <Card className='p-7 space-y-4'>
                {/* comment counts */}
                <div className="flex gap-2 items-center">
                    <span>{comments?.length}</span>
                    <h3>Comments</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex w-full items-center space-x-2'>
                    <Input {...register('content', { required: true })} type="text" placeholder="Add a Comment" />
                    <Button className='gap-1' type="submit">
                        <RocketIcon></RocketIcon>
                        <span>Post</span>
                    </Button>
                </form>
                {errors.content && <span className="text-red-500 text-sm mt-1">Comment can't be empty.</span>}
                {comments.length && [...comments].reverse().map((comment: any, index: any) => (
                    <div key={comment._id}>
                        <Separator></Separator>
                        {/* Comment Thread */}
                        <div className='flex justify-between mt-4'>
                            <div className='flex'>
                                <Avatar>
                                    <AvatarImage src={comment.owner?.avatar} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className='grid text-start ml-3'>
                                    <div className='flex gap-2 flex-row'>
                                        <p className='text-xs'>{comment.owner?.fullName}</p>
                                        {/* posted time */}
                                        <div className='flex gap-2 text-xs text-muted-foreground items-center'>
                                            <span>{timeAgo(comment?.updatedAt)}</span>
                                            <RocketIcon></RocketIcon>
                                        </div>
                                    </div>
                                    <p className='text-muted-foreground text-xs'>@{comment.owner?.username}</p>
                                </div>
                            </div>
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost"><DotsVerticalIcon></DotsVerticalIcon></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-45">
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem className='gap-2'><Pencil1Icon></Pencil1Icon> Edit</DropdownMenuItem>
                                            <DropdownMenuItem className='gap-2'><TrashIcon></TrashIcon> Delete</DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                        </div>
                        <div className='mt-2 ml-12'>                            
                            <p>{comment?.content}</p>
                        </div>

                    </div>
                ))}


                <div>
                    <Separator></Separator>
                    {/* Comment Thread */}
                    <div className='flex mt-4'>
                        <Avatar>
                            <AvatarImage src={props.data?.ownerDetails?.avatar} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className='grid text-start ml-3'>
                            <div className='flex gap-2 flex-row'>
                                <p>{props.data?.ownerDetails?.fullName}</p>
                                {/* posted time */}
                                <div className='flex gap-2 text-xs text-muted-foreground items-center'>
                                    <span>2 hours ago</span>
                                    <RocketIcon></RocketIcon>
                                </div>
                            </div>
                            <p className='text-muted-foreground text-xs'>@{props.data?.ownerDetails?.username}</p>
                        </div>

                    </div>
                    <div className='mt-4 ml-12'>
                        <p>Comment body</p>
                    </div>

                </div>
            </Card>
        </>
    )
}

export default Comment
