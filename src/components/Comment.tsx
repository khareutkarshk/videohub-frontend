"use client";
import React from 'react'
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { RocketIcon, PaperPlaneIcon } from '@radix-ui/react-icons';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
function Comment(props: any) {
    return (
        <>
            <Card className='p-7 space-y-4'>
                {/* comment counts */}
                <div className="flex gap-2 items-center">
                    <span>100</span>
                    <h3>Comments</h3>
                </div>
                <div className="flex w-full items-center space-x-2">
                    <Input type="email" placeholder="Add a Comment" />
                    <Button className='gap-1' type="submit">
                        <RocketIcon></RocketIcon>
                        <span>Post</span>
                    </Button>
                </div>
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
