import Link from "next/link"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import {DotsVerticalIcon, MagnifyingGlassIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import { SearchBox } from "./SearchBox";

export default function Component() {
    return (
        <>
            <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <header className="flex h-16 w-full shrink-0 items-center justify-between px-4 md:px-6">
                    <Link className="mr-6" href="#">
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
                        
                        <Button variant={"ghost"}>
                            Sign in
                        </Button>
                        <Button>Sign Up</Button>
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


