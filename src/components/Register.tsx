"use client";
import React, { FormEvent, useState } from 'react';
import { Boxes } from "@/components/ui/background-boxes"
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
function RegisterForm() {

    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        password: '',
        username: '',
        avatar: '',
        coverImage: '',

    });


    const onSubmit = async (data: any) => {

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('fullName', data.fullName);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('username', data.username);
            formData.append('avatar', data.avatar[0]);
            formData.append('coverImage', data.coverImage[0]);

            const response = await axios.post('/user/register/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('User registered successfully. Login Now', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            router.push('/login');
        } catch (error: any) {
            // console.log('There was a problem with your Axios operation:', error.message);
            console.log('error', typeof error.response.status);
            if (error.response.status === 409) {
                toast.error('User with email or username already exists!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }else{
                toast.error('Something went wrong', {
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

            setLoading(false);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="min-h-screen over overflow-hidden bg-gray-100 dark:bg-slate-900 py-12 pt-30 relative">
            {' '}
            {/* Ensure the container is relative */}
            {/* BackgroundBeams with adjusted z-index */}
            <Boxes className="absolute -top-24 left-0 w-full h-full z-0" />
            {/* Content with higher z-index */}
            <Card className='max-w-2xl mx-auto p-4 relative z-10'>
                <div className=" p-4">
                    {' '}
                    {/* Add relative and z-10 to bring content to the front */}
                    <h1 className="text-lg md:text-3xl text-center font-sans font-bold mb-8 text-white">
                        Register New User
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <div className='flex flex-col gap-4'>
                            <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                            <input
                                type="text"
                                {...register('fullName', { required: true, pattern: /^[a-zA-Z\s]+$/ })}
                                placeholder="Your name"
                                className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-blue-500 w-full p-4 bg-neutral-950 placeholder:text-slate-200"
                            // required
                            />
                            {errors.fullName && <span className="text-red-500 text-sm">Full Name is required and should contain only letters and spaces</span>}

                        </div>
                        <div className='flex flex-col gap-4'>
                            <Label htmlFor="email" >Email <span className="text-red-500">*</span></Label>
                            <input
                                type="email"
                                {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                                placeholder="Your email address"
                                className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-blue-500 w-full p-4 bg-neutral-950 placeholder:text-slate-200"
                            />
                            {errors.email && <span className="text-sm text-red-500">Valid email is required</span>}

                        </div>
                        <div className='flex flex-col gap-4'>
                            <Label htmlFor='password'>Password <span className="text-red-500">*</span></Label>
                            <input
                                type='password'
                                {...register('password', { required: true, pattern: /^(.{8,})$/ })}

                                placeholder='Password'
                                className='rounded-lg border border-neutral-800 focus:ring-2 focus:ring-blue-500 w-full p-4 bg-neutral-950 placeholder:text-slate-200'
                            />
                            {errors.password && <span className="text-red-500 text-sm">Password must be at least 8 characters long</span>}

                        </div>
                        <div className='flex flex-col gap-4'>
                            <Label htmlFor='username'>Username <span className="text-red-500">*</span></Label>
                            <input
                                type='text'
                                {...register('username', { required: true, pattern: /^[a-zA-Z0-9_]*$/ })}

                                placeholder='Username'
                                className='rounded-lg border border-neutral-800 focus:ring-2 focus:ring-blue-500 w-full p-4 bg-neutral-950 placeholder:text-slate-200'
                            />
                            {errors.username && <span className="text-red-500 text-sm">Username is required and should contain only letters, numbers, or underscores</span>}

                        </div>
                        <div className='flex flex-col gap-4'>
                            <Label htmlFor='avatar'>Avatar <span className="text-red-500">*</span></Label>
                            <input
                                type='file'
                                {...register('avatar', { required: true })}
                                placeholder='Avatar'
                                className='rounded-lg border border-neutral-800 focus:ring-2 focus:ring-blue-500 w-full p-4 bg-neutral-950 placeholder:text-slate-200'
                            />
                            {errors.avatar && <span className="text-red-500 text-sm">Avatar is required</span>}

                        </div>
                        <div className='flex flex-col gap-4'>
                            <Label htmlFor='coverImage'>Cover Image</Label>
                            <input
                                type='file'
                                {...register('coverImage')}
                                placeholder='Cover Image'
                                className='rounded-lg border border-neutral-800 focus:ring-2 focus:ring-blue-500 w-full p-4 bg-neutral-950 placeholder:text-slate-200'
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}                    >
                            {loading ? 'Loading...' : 'Register User'}
                        </Button>
                    </form>
                </div>
            </Card>

        </div>
    );
}

export default RegisterForm;