import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FileText, Image as ImageIcon, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGenerateUploadUrl } from "@/features/upload/api/use-generate-upload-url";
import { useGetAllThreads } from "@/features/threads/api/use-get-all";
import { toast } from "sonner";

import { useCreatePost } from "@/features/posts/api/use-create-post";
import { Id } from "../../convex/_generated/dataModel";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import useTogglePost from "@/hooks/create-post-hook";
import { useEditPost } from "@/features/posts/api/use-edit-post";

export default function RedditCreatePost() {
  const editPost = useTogglePost();
  const router = useRouter();
  const [selectedCommunity, setSelectedCommunity] = useState(editPost.threadId);
  const [title, setTitle] = useState(editPost.title);
  const [textContent, setTextContent] = useState(editPost.content);
  const [imageTitle, setImageTitle] = useState(editPost.imageTitle);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageId, setImageId] = useState<Id<"_storage"> | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(editPost.image);
  const [isUploading, setIsUploading] = useState(false);

  const { mutate: generateUploadUrl } = useGenerateUploadUrl();
  const [activeTab, setActiveTab] = useState("text");

  const { data: threads, isLoading: threadsLoading } = useGetAllThreads();
  const { mutate: createPost, isPending: creatingPost } = useCreatePost();
  const postModal = useTogglePost();
  const { mutate: postEdit } = useEditPost();

  const RichTextEditor = useMemo(
    () =>
      dynamic(() => import("./text-editor/rich-text-editor"), {
        ssr: false,
        loading: () => <Skeleton className="w-full mb-4 h-40 bg-gray-700" />,
      }),
    []
  );

  const memoizedRichTextEditor = useMemo(
    () => <RichTextEditor content={textContent} setContent={setTextContent} />,
    [textContent, setTextContent, RichTextEditor]
  );

  const communities = threads?.map((thread) => {
    return {
      id: thread?._id,
      label: `/${thread?.title}`,
    };
  });

  const handleSubmit = () => {
    if (editPost.editMode) {
      postEdit(
        {
          postId: editPost.id as Id<"posts">,
          title,
          content: textContent,
          image: imageId || null,
          imageTitle,
          threadId: selectedCommunity as Id<"threads">,
        },
        {
          onSuccess: (postId) => {
            toast.success("Post successfully edited");
            postModal.setOff();
            router.push(`/post/${postId}`);
          },
          onError: () => {
            toast.error("Error editing post");
            postModal.setOff();
          },
        }
      );
    } else {
      createPost(
        {
          title,
          content: textContent,
          image: imageId || undefined,
          imageTitle,
          threadId: selectedCommunity as Id<"threads">,
        },
        {
          onSuccess: (postId) => {
            toast.success("Post successfully created");
            postModal.setOff();
            router.push(`/post/${postId}`);
          },
          onError: () => {
            toast.error("Error creating post");
            postModal.setOff();
          },
        }
      );
    }
  };
  const handleFileUpload = useCallback(
    async (file: File) => {
      if (file) {
        setIsUploading(true);
        try {
          const url = await generateUploadUrl({}, { throwError: true });
          if (!url) throw new Error("Url not found");

          const result = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": file.type },
            body: file,
          });
          const { storageId } = await result.json();

          // Create a temporary URL for preview
          const previewUrl = URL.createObjectURL(file);
          setImageUrl(previewUrl);
          setImageId(storageId);
          setImageFile(file);
        } catch (error) {
          console.error("Error uploading file:", error);
        } finally {
          setIsUploading(false);
        }
      }
    },
    [generateUploadUrl]
  );
  const handleImageDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        handleFileUpload(file);
      }
    },
    [handleFileUpload]
  );
  const handleRemoveImage = () => {
    setImageUrl(null);
    setImageId(null);
    setImageFile(null);
  };

  return (
    <Card className="w-full mx-auto bg-gray-800 text-white border-transparent overflow-y-auto max-h-screen pt-10 sm:pt-0">
      <CardContent className="p-4 mb-0 ">
        <CardHeader className="text-xl xl:text-2xl font-semibold ">
          Create Your Amazing Post
        </CardHeader>

        {threadsLoading || communities ? (
          <Select
            onValueChange={setSelectedCommunity}
            defaultValue={editPost.threadId}
            disabled={threadsLoading}
          >
            <SelectTrigger className="w-full mb-4 bg-gray-700 text-white border-gray-600">
              <SelectValue placeholder="Choose a community" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 text-white border-gray-600">
              {communities &&
                communities.map((community) => (
                  <SelectItem key={community.label} value={community.id}>
                    {community.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        ) : (
          <div>
            <Skeleton className="w-full mb-4 h-8 bg-gray-700" />
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-700">
            <TabsTrigger
              value="text"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <FileText className={cn("w-4 h-4 mr-2")} />
              Text
            </TabsTrigger>
            <TabsTrigger
              value="image"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Image
            </TabsTrigger>
          </TabsList>
          <TabsContent value="text" className="mt-0 space-y-4 w-full">
            <div>
              <Label htmlFor="title" className="text-white text-lg">
                Post Title
              </Label>
              <Input
                id="title"
                placeholder="Enter your post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-700 text-white border-gray-600"
              />
            </div>
            <div>
              <div className="container mx-auto">
                <h1 className="text-lg mb-4">Rich Text Editor</h1>
                {memoizedRichTextEditor}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="image" className="mt-0 space-y-4 w-full">
            <div>
              <Label htmlFor="image-title" className="text-white">
                Image Title
              </Label>
              <Input
                id="image-title"
                placeholder="Enter your image title"
                value={imageTitle}
                onChange={(e) => setImageTitle(e.target.value)}
                className="bg-gray-700 text-white border-gray-600"
              />
            </div>
            <div
              className="border-2 border-dashed border-gray-600 rounded-md p-4 text-center cursor-pointer min-h-[100px] w-full flex flex-col items-center justify-center bg-gray-700 text-white relative"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleImageDrop}
            >
              {imageUrl ? (
                <div className="w-full relative">
                  <div className="aspect-video">
                    <Image
                      src={imageUrl}
                      alt="post image"
                      layout="fill"
                      objectFit="contain"
                      className="w-full h-auto"
                    />
                  </div>
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-gray-800 rounded-full p-2 hover:bg-gray-700 z-10"
                  >
                    <X className="text-white" size={24} />
                  </button>
                </div>
              ) : (
                <>
                  <Image
                    src="/placeholder-image.webp"
                    alt="Upload placeholder"
                    width={80}
                    height={80}
                    className="mb-4 text-gray-400 rounded-full"
                  />
                  <p>
                    {imageFile
                      ? imageFile.name
                      : "Drag and drop your image here, or click to select"}
                  </p>
                </>
              )}
              <Button
                variant="outline"
                onClick={() => document.getElementById("image-upload")?.click()}
                disabled={isUploading}
                className="mt-4"
                aria-label="upload image button"
              >
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? "Uploading..." : "Upload Image"}
              </Button>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-800">
        <Button
          variant="outline"
          className="border-gray-600 text-white hover:bg-gray-700"
          onClick={() => postModal.setOff()}
          aria-label="cancel button"
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleSubmit()}
          className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={
            !title ||
            !textContent ||
            !selectedCommunity ||
            creatingPost ||
            isUploading
          }
        >
          Post
        </Button>
      </CardFooter>
    </Card>
  );
}
