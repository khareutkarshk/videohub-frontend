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
export default function SideBar(props: any) {
    const router = useRouter();
    return (
        <>
            
            <Card className={`${props.page === "watch" ? 'w-full' : 'w-1/5'} hidden lg:flex flex-col justify-between  py-5 border-t-0 rounded-none sticky top-16 h-[calc(100vh-theme(spacing.16))] overflow-y-auto`}>
                <div>
                    <CardContent className="p-3 pt-0">
                        <Button className="w-full gap-2" variant={"outline"}>
                            <HomeIcon></HomeIcon>
                            {props.page === "watch" ? "" : "Home"}
                            </Button>
                    </CardContent>
                    <CardContent className="p-3 pt-0">
                        <Button className="w-full gap-2" variant={"outline"}>
                            <StarFilledIcon></StarFilledIcon>
                            {props.page === "watch" ? "" : "Liked Videos"}
                            </Button>
                    </CardContent>
                    <CardContent className="p-3 pt-0">
                        <Button className="w-full gap-2" variant={"outline"}>
                            <CounterClockwiseClockIcon></CounterClockwiseClockIcon>
                            {props.page === "watch" ? "" : "History"}
                            </Button>
                    </CardContent>
                    <CardContent className="p-3 pt-0">
                        <Button className="w-full gap-2" variant={"outline"}>
                            <CameraIcon></CameraIcon>
                            {props.page === "watch" ? "" : "My Content"}
                            </Button>
                    </CardContent>
                    <CardContent className="p-3 pt-0">
                        <Button className="w-full gap-2" variant={"outline"}>
                            <LayersIcon></LayersIcon>
                            {props.page === "watch" ? "" : "Collections"}
                            </Button>
                    </CardContent>
                    <CardContent className="p-3 pt-0">
                        <Button className="w-full gap-2" variant={"outline"}>
                            <PersonIcon></PersonIcon>
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