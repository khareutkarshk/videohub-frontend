"use client";
import React from 'react'
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { RocketIcon, PaperPlaneIcon, DotsVerticalIcon, Pencil1Icon, TrashIcon, ThickArrowDownIcon, ThickArrowUpIcon, ResetIcon } from '@radix-ui/react-icons';
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
import { LiaTelegramPlane } from "react-icons/lia";
import { LuClock4, LuThumbsDown, LuThumbsUp } from "react-icons/lu";

function Comment(props: any) {
    const pathName = usePathname();
    const [comments, setComments] = useState<any[]>([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchComments();
    }, [])

    const toggleEditComment = (cmt: any) => {

        if (cmt.replies) {
            setComments((prev) =>
                prev.map((prevComment) =>
                    prevComment._id === cmt._id ? {
                        ...prevComment,
                        showEdit: !prevComment.showEdit
                    } : prevComment)
            )
        } else {
            setComments(prevComments =>
                prevComments.map(comment =>
                    comment._id === cmt.parent
                        ? {
                            ...comment,
                            replies: comment.replies.map((reply: { _id: any; showEdit: any; }) =>
                                reply._id === cmt._id
                                    ? { ...reply, showEdit: !reply.showEdit }
                                    : reply
                            )
                        }
                        : comment
                )
            );

        }

    }

    const toggleReplyComment = (comment: any) => {
        setComments((prev) =>
            prev.map((prevComment) =>
                prevComment._id === comment._id ? {
                    ...prevComment,
                    showReplyTo: !prevComment.showReplyTo
                } : prevComment)

        )
        console.log('prevComment', comment)
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

    const onSubmitComment = async (data: any) => {
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
                <form onSubmit={handleSubmit(onSubmitComment)} className='flex w-full items-center space-x-2'>
                    <Input {...register('content', { required: true })} type="text" placeholder="Add a Comment" />
                    <Button className='gap-1' type="submit">
                        <LiaTelegramPlane className='size-4'></LiaTelegramPlane>
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
                        onSubmit={onSubmitComment}
                        fetchComments={fetchComments}
                        deleteComment={deleteComment}
                        toggleReplyComment={toggleReplyComment}
                         />
                ))}

            </Card>
        </>
    )
}

const CommentNode = ({ comment, toggleEditComment, toggleReplyComment, fetchComments, deleteComment }: any) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { userDetails } = useUserContext();

    const onSubmitEdit = async (data: any) => {
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
            toast.error('Something went wrong while editing comment', {
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

    const onSubmitReply = async (data: any, commentId: any) => {
        try {
            const response = await axios.post(`/comments/c/${commentId}`, data);
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

    const toggleLikeButton = async (id: string) => {
        try {
            const data = await axios.post(`/likes/toggle/c/${id}/`)
            fetchComments();
        } catch (error) {
            console.log(error);
        }
    }

    const toggleDislikeButton = async (id: string) => {
        try {
            const data = await axios.post(`/dislikes/toggle/c/${id}/`)
            fetchComments();
        } catch (error) {
            console.log(error);
        }
    }

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
                                    <LuClock4></LuClock4>
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
                                                <DropdownMenuItem onClick={() => toggleEditComment(comment)} className='gap-2'><Pencil1Icon></Pencil1Icon> Edit</DropdownMenuItem>

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
                    {comment.showEdit && (
                        <form onSubmit={handleSubmit(onSubmitEdit)}>
                            <div className='flex mt-3 w-full items-center space-x-2'>
                                <Input {...register('content', { required: true })} type="text" placeholder="Edit Your Comment" />
                                <Button onClick={() => toggleEditComment(comment)} variant={"secondary"} >Cancel</Button>
                                <Button className='gap-1' type="submit">
                                    <Pencil1Icon></Pencil1Icon>
                                    <span>Edit</span>
                                </Button>
                            </div>
                            {errors.content && <span className="text-red-500 text-sm mt-1">Comment can't be empty.</span>}
                        </form>

                    )}


                    {comment.showReplyTo && (
                        <form onSubmit={handleSubmit(data => onSubmitReply(data, comment._id))}>
                            <div className='flex mt-3 w-full items-center space-x-2'>
                                <Input {...register('content', { required: true })} type="text" placeholder="Reply..." />
                                <Button onClick={() => toggleReplyComment(comment)} variant={"secondary"} >Cancel</Button>
                                <Button className='gap-1' type="submit">
                                    <ResetIcon></ResetIcon>
                                    <span>Reply</span>
                                </Button>
                            </div>
                            {errors.content && <span className="text-red-500 text-sm mt-1">Comment can't be empty.</span>}
                        </form>

                    )}

                    <div className='flex gap-4'>
                        <Button size={"sm"} className='hover:bg-transparent px-0 gap-1 w-fit hover:text-primary' variant={'ghost'} onClick={() => toggleLikeButton(comment?._id)}>
                            <LuThumbsUp className='size-4'></LuThumbsUp>
                            <div className='text-sm'>{comment?.likesCount}</div>
                        </Button>
                        <Button size={"sm"} className='hover:bg-transparent gap-1 px-0 hover:text-primary' variant={'ghost'} onClick={() => toggleDislikeButton(comment?._id)}>
                            <LuThumbsDown className='size-4'></LuThumbsDown>
                            <div className='text-sm'>{comment?.dislikesCount}</div>
                        </Button>
                        {
                            comment.replies ? (
                                <Button onClick={() => toggleReplyComment(comment)} size={"icon"} className='px-4 text-primary hover:text-primary' variant={'ghost'}>
                                    <span>Reply</span>
                                </Button>
                            ) : null
                        }

                    </div>



                    {
                        comment.replies?.length ? comment.replies.map((reply: any, index: any) => (
                            <div className='mb-3'>
                                <CommentNode
                                    key={index}
                                    comment={reply}
                                    toggleEditComment={toggleEditComment}
                                    toggleReplyComment={toggleReplyComment}
                                    handleSubmit={handleSubmit}
                                    register={register}
                                    onSubmitEdit={onSubmitEdit}
                                    fetchComments={fetchComments}
                                />
                            </div>
                        )) : null
                    }
                </div>
            </div>
        </>
    );
};

export default Comment
