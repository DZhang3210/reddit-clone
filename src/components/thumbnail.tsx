import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

interface ThumbnailProps {
  url: string | null | undefined;
}

export const Thumbnail = ({ url }: ThumbnailProps) => {
  if (!url) return null;
  // console.log("URL", url);
  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative overflow-hidden max-w-[360px] w-full h-[200px] border rounded-lg my-2 cursor-zoom-in">
          <Image
            src={url}
            alt="Message Image"
            fill
            className="rounded-md object-cover"
          />
        </div>
      </DialogTrigger>
      <DialogContent
        className="max-w-[800px] w-full h-[600px] border-none bg-transparent p-0 shadow-none"
        aria-describedby="thumbnail"
      >
        <DialogTitle className="sr-only">thumbnail</DialogTitle>
        <div className="relative w-full h-full">
          <Image
            src={url}
            alt="Message Image"
            fill
            className="rounded-md object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
