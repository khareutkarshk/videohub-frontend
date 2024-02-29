"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button";
import { HomeIcon, 
    CounterClockwiseClockIcon, 
    LayersIcon, 
    PersonIcon, 
    StarFilledIcon, 
    CameraIcon,
    QuestionMarkCircledIcon,
GearIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { RiHome3Line } from "react-icons/ri";
import { LuThumbsUp, LuUserCheck } from "react-icons/lu";
import { GrHistory } from "react-icons/gr";
import { BsCameraVideo } from "react-icons/bs";
import { FiFolder } from "react-icons/fi";

export default function SideBar(props: any) {
    const router = useRouter();
    return (
        <>
            
            <Card className={`${props.page === "watch" ? 'w-full' : 'w-1/5'} hidden lg:flex flex-col justify-between  py-5 border-t-0 rounded-none sticky top-16 h-[calc(100vh-theme(spacing.16))] overflow-y-auto`}>
                <div>
                    <CardContent className="p-3 pt-0">
                        <Button className="w-full gap-2" variant={"outline"}>
                            <RiHome3Line className="size-4"></RiHome3Line>
                            {props.page === "watch" ? "" : "Home"}
                            </Button>
                    </CardContent>
                    <CardContent className="p-3 pt-0">
                        <Button className="w-full gap-2" variant={"outline"}>
                            <LuThumbsUp className="size-4"></LuThumbsUp>
                            {props.page === "watch" ? "" : "Liked Videos"}
                            </Button>
                    </CardContent>
                    <CardContent className="p-3 pt-0">
                        <Button className="w-full gap-2" variant={"outline"}>
                            <GrHistory></GrHistory>
                            {props.page === "watch" ? "" : "History"}
                            </Button>
                    </CardContent>
                    <CardContent className="p-3 pt-0">
                        <Button className="w-full gap-2" variant={"outline"}>
                            <BsCameraVideo className="size-4"></BsCameraVideo>
                            {props.page === "watch" ? "" : "My Content"}
                            </Button>
                    </CardContent>
                    <CardContent className="p-3 pt-0">
                        <Button className="w-full gap-2" variant={"outline"}>
                            <FiFolder className="size-4"></FiFolder>
                            {props.page === "watch" ? "" : "Collections"}
                            </Button>
                    </CardContent>
                    <CardContent className="p-3 pt-0">
                        <Button className="w-full gap-2" variant={"outline"}>
                            <LuUserCheck className="size-4"></LuUserCheck>
                            {props.page === "watch" ? "" : "Subscribers"}
                            </Button>
                    </CardContent>


                </div>
                <div>
                <CardContent className="p-3 pt-0">
                        <Button className="w-full gap-2" variant={"outline"}>
                            <QuestionMarkCircledIcon></QuestionMarkCircledIcon>
                            {props.page === "watch" ? "" : "Help"}
                            </Button>
                    </CardContent>
                    <CardContent className="p-3 pt-0">
                        <Button className="w-full gap-2" variant={"outline"}>
                            <GearIcon></GearIcon>
                            {props.page === "watch" ? "" : "Settings"}
                            </Button>
                    </CardContent>
                </div>
            </Card>

        </>
    )
}