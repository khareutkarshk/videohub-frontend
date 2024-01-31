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

export default function SideBar() {
    return (
        <>
            
            <Card className="w-1/5 hidden lg:flex flex-col justify-between  py-5 border-t-0 rounded-none sticky top-16 h-[calc(100vh-theme(spacing.16))] overflow-y-auto">
                <div>
                    <CardContent className="p-3 pt-0">
                        <Button className="w-full gap-2" variant={"outline"}>
                            <HomeIcon></HomeIcon>
                            Home</Button>
                    </CardContent>
                    <CardContent className="p-3 pt-0">
                        <Button className="w-full gap-2" variant={"outline"}>
                            <StarFilledIcon></StarFilledIcon>
                            Liked Videos</Button>
                    </CardContent>
                    <CardContent className="p-3 pt-0">
                        <Button className="w-full gap-2" variant={"outline"}>
                            <CounterClockwiseClockIcon></CounterClockwiseClockIcon>
                            History</Button>
                    </CardContent>
                    <CardContent className="p-3 pt-0">
                        <Button className="w-full gap-2" variant={"outline"}>
                            <CameraIcon></CameraIcon>
                            My content</Button>
                    </CardContent>
                    <CardContent className="p-3 pt-0">
                        <Button className="w-full gap-2" variant={"outline"}>
                            <LayersIcon></LayersIcon>
                            Collection</Button>
                    </CardContent>
                    <CardContent className="p-3 pt-0">
                        <Button className="w-full gap-2" variant={"outline"}>
                            <PersonIcon></PersonIcon>
                            Subscribers</Button>
                    </CardContent>


                </div>
                <div>
                <CardContent className="p-3 pt-0">
                        <Button className="w-full gap-2" variant={"outline"}>
                            <QuestionMarkCircledIcon></QuestionMarkCircledIcon>
                            Support</Button>
                    </CardContent>
                    <CardContent className="p-3 pt-0">
                        <Button className="w-full gap-2" variant={"outline"}>
                            <GearIcon></GearIcon>
                            Settings</Button>
                    </CardContent>
                </div>
            </Card>

        </>
    )
}