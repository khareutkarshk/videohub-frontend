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
import { useUserContext } from '@/app/context/UserContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
function Comment(props: any) {
    const router = useRouter();
    const pathName = usePathname();
    const [comments, setComments] = useState<any[]>([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fetchComments();
    }, [])

    const toggleEditComment = (comment: any) => {
        setComments((prev) =>
            prev.map((prevComment) =>
                prevComment._id === comment._id ? {
                    ...prevComment,
                    showReplyTo: !prevComment.showReplyTo
                } : prevComment)
        )
    }

    const deleteComment = async (id: any) => {
        try {
            const response = await axios.delete(`/comments/c/${id}`);
            fetchComments();
            toast.success('Comment Deleted Successfully', {
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
            toast.error('Something went wrong while deleting comment', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

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
                    <CommentNode
                        key={comment._id}
                        comment={comment}
                        toggleEditComment={toggleEditComment}
                        handleSubmit={handleSubmit}
                        register={register}
                        onSubmit={onSubmit}
                        fetchComments={fetchComments}
                        deleteComment={deleteComment} />
                ))}

            </Card>
        </>
    )
}

const CommentNode = ({ comment, toggleEditComment, fetchComments, deleteComment }: any) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { userDetails } = useUserContext();

    const onSubmit = async (data: any) => {
        try {
            const response = await axios.patch(`/comments/c/${comment._id}`, data);
            fetchComments();
            reset();
            toast.success('You Replied To a Comment!', {
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
            console.log('Error:', error);
            toast.error('Something went wrong while replying comment', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    return (
        <>
            <div key={comment._id}>
                <Separator></Separator>

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
                        {
                            comment.owner?._id === userDetails?._id ? (
                                <Dialog>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost"><DotsVerticalIcon></DotsVerticalIcon></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-45">
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toggleEditComment(comment) }} className='gap-2'><Pencil1Icon></Pencil1Icon> Edit</DropdownMenuItem>

                                                <DialogTrigger asChild>
                                                    <DropdownMenuItem className='gap-2'>
                                                        <TrashIcon></TrashIcon> Delete
                                                    </DropdownMenuItem>
                                                </DialogTrigger>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Delete Comment?</DialogTitle>
                                            <DialogDescription>
                                                This action cannot be undone!
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant={"secondary"} >Cancel</Button>
                                            </DialogClose>
                                            <Button onClick={() => deleteComment(comment._id)} variant={"destructive"}>Delete</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                            ) : null
                        }

                    </div>



                </div>
                <div className='mt-2 ml-12'>
                    <p>{comment?.content}</p>
                    {comment.showReplyTo && (
                        <form onSubmit={handleSubmit(onSubmit)} className='flex mt-3 w-full items-center space-x-2'>
                            <Input {...register('content', { required: true })} type="text" placeholder="Add a Comment" />
                            <Button className='gap-1' type="submit">
                                <RocketIcon></RocketIcon>
                                <span>Reply</span>
                            </Button>
                        </form>
                    )}
                    {
                        comment.replies?.length ? comment.replies.map((reply: any) => (
                            <div className='mb-3'>
                                <CommentNode key={reply._id} comment={reply} toggleEditComment={toggleEditComment} handleSubmit={handleSubmit} register={register} onSubmit={onSubmit}></CommentNode>
                            </div>
                        )) : null
                    }
                </div>
            </div>
        </>
    );
};

export default Comment
