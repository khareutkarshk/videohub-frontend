"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { DotsVerticalIcon, MagnifyingGlassIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import { SearchBox } from "./SearchBox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUserContext } from "@/app/context/UserContext";
import { useState, useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";

export default function Component() {

    const { isLoggedin, userDetails } = useUserContext();
    const [initials, setInitials] = useState<any>("");

    const extractInitials = () => {
        if (userDetails.fullName) {
            const [firstName, lastName] = userDetails.fullName.split(' ');
            const firstInitial = firstName.charAt(0);
            const lastInitial = lastName.charAt(0);
            setInitials(firstInitial + lastInitial);
        }
    }

    const logOutUser = async () =>{
        const loggedOutUser = await axios.post('/user/logout/');
        localStorage.clear();
        window.location.reload();
    }

    useEffect(() => {
        extractInitials();
    }, [userDetails])

    return (
        <>
            <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 bottom-[calc(100vh-theme(spacing.16))]">
                <header className="flex h-16 w-full shrink-0 items-center justify-between px-4 md:px-6">
                    <Link className="mr-6" href="/">
                        VideoHub
                        <span className="sr-only">A video platform</span>
                    </Link>
                    <div className="hidden md:flex lg:flex">
                        <SearchBox></SearchBox>
                    </div>

                    <div className="hidden lg:flex md:flex gap-2">
                        <Button variant={"ghost"}>
                            <DotsVerticalIcon></DotsVerticalIcon>
                        </Button>



                        {
                            userDetails._id ?
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar>
                                            <AvatarImage src={userDetails.avatar} />
                                            <AvatarFallback>{initials}</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                Profile
                                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Billing
                                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Settings
                                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Keyboard shortcuts
                                                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>Team</DropdownMenuItem>
                                            <DropdownMenuSub>
                                                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                                                <DropdownMenuPortal>
                                                    <DropdownMenuSubContent>
                                                        <DropdownMenuItem>Email</DropdownMenuItem>
                                                        <DropdownMenuItem>Message</DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>More...</DropdownMenuItem>
                                                    </DropdownMenuSubContent>
                                                </DropdownMenuPortal>
                                            </DropdownMenuSub>
                                            <DropdownMenuItem>
                                                New Team
                                                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>GitHub</DropdownMenuItem>
                                        <DropdownMenuItem>Support</DropdownMenuItem>
                                        <DropdownMenuItem disabled>API</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={logOutUser}>
                                            Log out
                                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                :
                                <div className="grid gap-2 grid-cols-2">
                                    <Button variant={"ghost"}>
                                        <Link href={'/login'}>
                                            Sign In
                                        </Link>
                                    </Button>
                                    <Button>
                                        <Link href={'/register'}>
                                            Sign Up
                                        </Link>
                                    </Button>
                                </div>
                        }

                    </div>
                    <div className="lg:hidden md:hidden sm:flex gap-4">
                        <Button className="lg:hidden md:hidden sm:flex" size={"icon"} variant={"ghost"}>
                            <MagnifyingGlassIcon></MagnifyingGlassIcon>
                        </Button>
                        <Button variant={"ghost"}>
                            <HamburgerMenuIcon></HamburgerMenuIcon>
                        </Button>
                    </div>
                </header>
                <Separator></Separator>
            </div>
        </>
    )
}


