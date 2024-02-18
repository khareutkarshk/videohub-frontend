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
import { useUserContext } from '@/app/context/UserContext';
import Link from 'next/link';
function Login() {

    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const [loading, setLoading] = useState(false);
    const { setisLoggedin, setuserDetails } = useUserContext();

    const onSubmit = async (data: any) => {

        try {
            setLoading(true);


            const response = await axios.post('/user/login/', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            localStorage.setItem('access', JSON.stringify(response.data.data.accessToken));
            localStorage.setItem('refresh', JSON.stringify(response.data.data.refreshToken));
            
            try{
                const user = await axios.get('/user/current-user/');
                console.log(user.data);
                setuserDetails(user.data.data);
                setisLoggedin(true);
            }catch(error){
                console.log(error);
            }

            toast.success('Logged in successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            router.push('/');
        } catch (error: any) {
            if (error.response.status === 400) {
                toast.error('Username or email is required', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else if(error.response.status === 401){ 
                toast.error('Invalid user credentials', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

            } else if(error.response.status === 404){
                toast.error('User not found', {
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
        <div className="min-h-screen over overflow-hidden bg-gray-100 dark:bg-slate-900 py-12 pt-35 relative">
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
                        Login Now
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">

                        <div className='flex flex-col gap-4'>
                            <Label htmlFor="email" >Email or Username <span className="text-red-500">*</span></Label>
                            <input
                                type="text"
                                {...register('email', { required: true })}
                                placeholder="Enter Your Email or Username"
                                className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-blue-500 w-full p-4 bg-neutral-950 placeholder:text-slate-200"
                            />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Label htmlFor='password'>Password <span className="text-red-500">*</span></Label>
                            <input
                                type='password'
                                {...register('password', { required: true })}

                                placeholder='Password'
                                className='rounded-lg border border-neutral-800 focus:ring-2 focus:ring-blue-500 w-full p-4 bg-neutral-950 placeholder:text-slate-200'
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}>
                            {loading ? 'Loading...' : 'Login'}
                        </Button>

                        <p className="text-center text-white">
                            Not registered? <Link href="/register" className="text-blue-500 hover:underline">Register Now</Link>
                        </p>
                    </form>
                </div>
            </Card>

        </div>
    );
}

export default Login
