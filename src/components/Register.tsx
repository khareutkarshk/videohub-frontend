"use client";
import React, { FormEvent, useState } from 'react';
import { Boxes } from "@/components/ui/background-boxes"
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
function MusicSchoolContactUs() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [user, setUser] = useState({
        fullName: '',
        email: '',
        password: '',
        username: '',
        avatar: '',
        coverImage: '',

    });


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Submitted:', { email, message });
    };

    return (
        <div className="min-h-screen over overflow-hidden bg-gray-100 dark:bg-slate-900 py-12 pt-30 relative">
            {' '}
            {/* Ensure the container is relative */}
            {/* BackgroundBeams with adjusted z-index */}
            <Boxes className="absolute -top-24 left-0 w-full h-full z-0" />
            {/* Content with higher z-index */}
            <Card className='max-w-2xl mx-auto p-4 relative z-10'>
                <div className="max-w-2xl mx-auto p-4 relative z-10">
                    {' '}
                    {/* Add relative and z-10 to bring content to the front */}
                    <h1 className="text-lg md:text-3xl text-center font-sans font-bold mb-8 text-white">
                        Register New User
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div className='flex flex-col gap-4'>
                            <Label htmlFor="name">Full Name</Label>
                            <input
                                type="text"
                                value={user.fullName}
                                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                                placeholder="Your name"
                                className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-blue-500 w-full p-4 bg-neutral-950 placeholder:text-slate-200"
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Label htmlFor="email">Email</Label>
                            <input
                                type="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                placeholder="Your email address"
                                className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-blue-500 w-full p-4 bg-neutral-950 placeholder:text-slate-200"
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Label htmlFor='password'>Password</Label>
                            <input
                                type='password'
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                placeholder='Password'
                                className='rounded-lg border border-neutral-800 focus:ring-2 focus:ring-blue-500 w-full p-4 bg-neutral-950 placeholder:text-slate-200'
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Label htmlFor='username'>Username</Label>
                            <input
                                type='text'
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                                placeholder='Username'
                                className='rounded-lg border border-neutral-800 focus:ring-2 focus:ring-blue-500 w-full p-4 bg-neutral-950 placeholder:text-slate-200'
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Label htmlFor='avatar'>Avatar</Label>
                            <input
                                type='file'
                                value={user.avatar}
                                onChange={(e) => setUser({ ...user, avatar: e.target.value })}
                                placeholder='Avatar'
                                className='rounded-lg border border-neutral-800 focus:ring-2 focus:ring-blue-500 w-full p-4 bg-neutral-950 placeholder:text-slate-200'
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Label htmlFor='coverImage'>Cover Image</Label>
                            <input
                                type='file'
                                value={user.coverImage}
                                onChange={(e) => setUser({ ...user, coverImage: e.target.value })}
                                placeholder='Cover Image'
                                className='rounded-lg border border-neutral-800 focus:ring-2 focus:ring-blue-500 w-full p-4 bg-neutral-950 placeholder:text-slate-200'
                                required
                            />
                        </div>
                        <Button
                            type="submit"                    >
                            Send Message
                        </Button>
                    </form>
                </div>
            </Card>

        </div>
    );
}

export default MusicSchoolContactUs;