import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export default function CreatePost() {
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
        loading: () => <Skeleton className="w-full mb-4 h-40 bg-gray-600" />,
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
    <Card className="w-full mx-auto bg-transparent text-white border-none overflow-y-auto max-h-screen pt-10 sm:pt-0 rounded-3xl">
      <CardContent className="mb-0">
        <div className="indent-0 pl-0 ml-2 mb-4">
          <h1 className="text-gray-300 text-xl xl:text-2xl font-bold">
            {postModal.editMode ? "Edit" : "Create"} Post
          </h1>
          <p className="text-gray-400 text-sm">
            Create a post in the selected community
          </p>
        </div>

        {threadsLoading || communities ? (
          <Select
            onValueChange={setSelectedCommunity}
            defaultValue={editPost.threadId}
            disabled={threadsLoading}
          >
            <SelectTrigger className="w-full mb-4 bg-gray-600 text-white border-gray-600 rounded-xl">
              <SelectValue placeholder="Select a community" />
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
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-600">
            <TabsTrigger
              value="text"
              className="data-[state=active]:bg-blue-700 data-[state=active]:text-white"
            >
              <FileText className={cn("w-4 h-4 mr-2")} />
              Text
            </TabsTrigger>
            <TabsTrigger
              value="image"
              className="data-[state=active]:bg-blue-700 data-[state=active]:text-white"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Image
            </TabsTrigger>
          </TabsList>
          <TabsContent value="text" className="mt-0 space-y-4 w-full">
            <div>
              <div className="text-gray-300 text-sm mb-2">Title</div>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-600 text-white border-gray-600 focus:border-gray-400
                focus:ring-0
                transition-colors
                placeholder:text-sm mt-2 rounded-xl"
              />
            </div>
            <div>
              <div className="container mx-auto">
                <h1 className="text-sm mb-2 text-gray-300">Body</h1>
                {memoizedRichTextEditor}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="image" className="mt-0 space-y-4 w-full">
            <div>
              <div className="text-gray-300 text-sm mb-2">Image Title</div>
              <Input
                id="image-title"
                value={imageTitle}
                onChange={(e) => setImageTitle(e.target.value)}
                className="bg-gray-600 text-white border-gray-600 focus:border-gray-400
                focus:ring-0
                transition-colors
                placeholder:text-sm mt-2 rounded-xl"
              />
            </div>
            <div
              className="border-2 border-dashed border-gray-600 rounded-md p-4 text-center cursor-pointer min-h-[100px] w-full flex flex-col items-center justify-center bg-gray-600 text-white relative"
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
                  <p className="text-sm text-gray-400">
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
                className="mt-4 text-sm text-gray-200"
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
      <CardFooter className="w-full flex justify-between bg-transparent px-8">
        <button
          className=" text-white hover:text-gray-400 text-sm transition"
          onClick={() => postModal.setOff()}
          aria-label="cancel button"
        >
          Cancel
        </button>
        <button
          onClick={() => handleSubmit()}
          className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-4 py-2 text-sm"
          disabled={
            !title ||
            !textContent ||
            !selectedCommunity ||
            creatingPost ||
            isUploading
          }
        >
          Post
        </button>
      </CardFooter>
    </Card>
  );
}
