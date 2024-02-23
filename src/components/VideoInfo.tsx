"use client";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardHeader, CardContent, CardDescription } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DotFilledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
export default function VideoInfo(videoInfo: any) {
  const router = useRouter();

  const handleVideoClick = () => {
    router.push(`/watch/${videoInfo.video._id}`);
  }
  return (
    <>
      <Card onClick={handleVideoClick} className="w-80 cursor-pointer hover:bg-accent ease-in transition">
        <div className="">
          <AspectRatio ratio={16 / 9}>
            <Image className="rounded" src={videoInfo.video.thumbnail} alt="thumbnail" layout="fill" />
          </AspectRatio>
        </div>

        <div>
          <CardHeader className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage src={videoInfo.video.owner.avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {videoInfo.video.title}
          </CardHeader>
        </div>

        <div>
          <CardContent>
            <CardDescription className="flex items-center gap-2">
              <span>
                {videoInfo.video.views} views 
              </span>
              <DotFilledIcon></DotFilledIcon>
              <span>{videoInfo.video.owner.fullName}</span>
            </CardDescription>
          </CardContent>
        </div>

      </Card>
    </>
  );
}