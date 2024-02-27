import { useUserContext } from '@/app/context/UserContext';
import { timeAgo } from '@/utils/timeAgo';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@radix-ui/react-dialog';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { RocketIcon, DotsVerticalIcon, Pencil1Icon, TrashIcon, ResetIcon, ThickArrowUpIcon, ThickArrowDownIcon } from '@radix-ui/react-icons';
import { Separator } from '@radix-ui/react-separator';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { DialogHeader, DialogFooter } from './ui/dialog';

function CommentNode({ prop }: any) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { userDetails } = useUserContext();
    
    useEffect(() => {
        console.log(prop);
    }, [prop])

    // const onSubmitEdit = async (data: any) => {
    //     try {
    //         const response = await axios.patch(`/comments/c/${comment._id}`, data);
            
    //         fetchComments();
    //         reset();
    //         toast.success('You Replied To a Comment!', {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "dark",
    //         });
    //     } catch (error) {
    //         console.log('Error:', error);
    //         toast.error('Something went wrong while editing comment', {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "dark",
    //         });
    //     }
    // };

    // const onSubmitReply = async (data: any, commentId: any) => {
    //     try {
    //         const response = await axios.post(`/comments/c/${commentId}`, data);
    //         fetchComments();
    //         reset();
    //         toast.success('You Replied To a Comment!', {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "dark",
    //         });
    //     } catch (error) {
    //         console.log('Error:', error);
    //         toast.error('Something went wrong while replying comment', {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "dark",
    //         });
    //     }
    // };

    return (
        // <>
        //     <div key={comment._id}>
        //         <Separator></Separator>

        //         <div className='flex justify-between mt-4'>
        //             <div className='flex'>
        //                 <Avatar>
        //                     <AvatarImage src={comment.owner?.avatar} />
        //                     <AvatarFallback>CN</AvatarFallback>
        //                 </Avatar>
        //                 <div className='grid text-start ml-3'>
        //                     <div className='flex gap-2 flex-row'>
        //                         <p className='text-xs'>{comment.owner?.fullName}</p>
        //                         {/* posted time */}
        //                         <div className='flex gap-2 text-xs text-muted-foreground items-center'>
        //                             <span>{timeAgo(comment?.updatedAt)}</span>
        //                             <RocketIcon></RocketIcon>
        //                         </div>
        //                     </div>
        //                     <p className='text-muted-foreground text-xs'>@{comment.owner?.username}</p>
        //                 </div>
        //             </div>
        //             <div>
        //                 {
        //                     comment.owner?._id === userDetails?._id ? (
        //                         <Dialog>

        //                             <DropdownMenu>
        //                                 <DropdownMenuTrigger asChild>
        //                                     <Button variant="ghost"><DotsVerticalIcon></DotsVerticalIcon></Button>
        //                                 </DropdownMenuTrigger>
        //                                 <DropdownMenuContent className="w-45">
        //                                     <DropdownMenuGroup>
        //                                         <DropdownMenuItem onClick={() => toggleEditComment(comment)} className='gap-2'><Pencil1Icon></Pencil1Icon> Edit</DropdownMenuItem>

        //                                         <DialogTrigger asChild>
        //                                             <DropdownMenuItem className='gap-2'>
        //                                                 <TrashIcon></TrashIcon> Delete
        //                                             </DropdownMenuItem>
        //                                         </DialogTrigger>
        //                                     </DropdownMenuGroup>
        //                                 </DropdownMenuContent>
        //                             </DropdownMenu>

        //                             <DialogContent>
        //                                 <DialogHeader>
        //                                     <DialogTitle>Delete Comment?</DialogTitle>
        //                                     <DialogDescription>
        //                                         This action cannot be undone!
        //                                     </DialogDescription>
        //                                 </DialogHeader>
        //                                 <DialogFooter>
        //                                     <DialogClose asChild>
        //                                         <Button variant={"secondary"} >Cancel</Button>
        //                                     </DialogClose>
        //                                     <Button onClick={() => deleteComment(comment._id)} variant={"destructive"}>Delete</Button>
        //                                 </DialogFooter>
        //                             </DialogContent>
        //                         </Dialog>

        //                     ) : null
        //                 }

        //             </div>



        //         </div>
        //         <div className='mt-2 ml-12'>
        //             <p>{comment?.content}</p>
        //             import { Input } from 'your-input-library'; // Replace 'your-input-library' with the actual library or package name

        //             // ...

        //             {comment.showEdit && (
        //                 <form onSubmit={handleSubmit(onSubmitEdit)}>
        //                     <div className='flex mt-3 w-full items-center space-x-2'>
        //                         <Input {...register('content', { required: true })} type="text" placeholder="Edit Your Comment" />
        //                         <Button onClick={() => toggleEditComment(comment)} variant={"secondary"} >Cancel</Button>
        //                         <Button className='gap-1' type="submit">
        //                             <Pencil1Icon></Pencil1Icon>
        //                             <span>Edit</span>
        //                         </Button>
        //                     </div>
        //                     {errors.content && <span className="text-red-500 text-sm mt-1">Comment can't be empty.</span>}
        //                 </form>
        //             )}


        //             {comment.showReplyTo && (
        //                 <form onSubmit={handleSubmit(data => onSubmitReply(data, comment._id))}>
        //                     <div className='flex mt-3 w-full items-center space-x-2'>
        //                         <Input {...register('content', { required: true })} type="text" placeholder="Reply..." />
        //                         <Button onClick={() => toggleReplyComment(comment)} variant={"secondary"} >Cancel</Button>
        //                         <Button className='gap-1' type="submit">
        //                             <ResetIcon></ResetIcon>
        //                             <span>Reply</span>
        //                         </Button>
        //                     </div>
        //                     {errors.content && <span className="text-red-500 text-sm mt-1">Comment can't be empty.</span>}
        //                 </form>

        //             )}

        //             <div className='flex gap-4'>
        //                 <Button size={"sm"} className='hover:bg-transparent px-0 gap-1 w-fit hover:text-primary' variant={'ghost'} onClick={() => toggleReplyComment(comment)}>
        //                     <ThickArrowUpIcon></ThickArrowUpIcon>
        //                     <div className='text-sm'>3</div>
        //                 </Button>
        //                 <Button size={"sm"} className='hover:bg-transparent gap-1 px-0 hover:text-primary' variant={'ghost'} onClick={() => toggleReplyComment(comment)}>
        //                     <ThickArrowDownIcon></ThickArrowDownIcon>
        //                     <div className='text-sm'>0</div>
        //                 </Button>
        //                 {
        //                     comment.replies ? (
        //                         <Button onClick={() => toggleReplyComment(comment)} size={"icon"} className='px-4 text-primary hover:text-primary' variant={'ghost'}>
        //                             <span>Reply</span>
        //                         </Button>
        //                     ) : null
        //                 }

        //             </div>



        //             {/* {
        //                 comment.replies?.length ? comment.replies.map((reply: any, index: any) => (
        //                     <div className='mb-3'>
        //                         <CommentNode
        //                             key={index}
        //                             comment={reply}
        //                             toggleEditComment={toggleEditComment}
        //                             toggleReplyComment={toggleReplyComment}
        //                             handleSubmit={handleSubmit}
        //                             register={register}
        //                             onSubmitEdit={onSubmitEdit}
        //                             fetchComments={fetchComments}
        //                         />
        //                     </div>
        //                 )) : null
        //             } */}
        //         </div>
        //     </div>
        // </>
        <div>
            data
        </div>
    );
}

export default CommentNode
