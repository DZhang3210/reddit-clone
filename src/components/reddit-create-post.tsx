import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FileText, Image } from "lucide-react";

const communities = [
  { value: "AskReddit", label: "r/AskReddit" },
  { value: "funny", label: "r/funny" },
  { value: "gaming", label: "r/gaming" },
  { value: "aww", label: "r/aww" },
  { value: "pics", label: "r/pics" },
];

export default function RedditCreatePost() {
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [title, setTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = (type: "text" | "image") => {
    const postData = {
      community: selectedCommunity,
      type,
      title: type === "text" ? title : imageTitle,
      content: type === "text" ? textContent : imageFile,
    };
    console.log("Submitting post:", postData);
    // Here you would typically send this data to your backend
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <Select onValueChange={setSelectedCommunity}>
          <SelectTrigger className="w-full mb-4">
            <SelectValue placeholder="Choose a community" />
          </SelectTrigger>
          <SelectContent>
            {communities.map((community) => (
              <SelectItem key={community.value} value={community.value}>
                {community.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text">
              <FileText className="w-4 h-4 mr-2" />
              Text
            </TabsTrigger>
            <TabsTrigger value="image">
              <Image className="w-4 h-4 mr-2" />
              Image
            </TabsTrigger>
          </TabsList>
          <TabsContent value="text">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter your post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="text-content">Text</Label>
                <Textarea
                  id="text-content"
                  placeholder="Enter your post content"
                  className="min-h-[200px]"
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="image">
            <div className="space-y-4">
              <div>
                <Label htmlFor="image-title">Title</Label>
                <Input
                  id="image-title"
                  placeholder="Enter your image title"
                  value={imageTitle}
                  onChange={(e) => setImageTitle(e.target.value)}
                />
              </div>
              <div
                className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleImageDrop}
              >
                {imageFile ? (
                  <p>{imageFile.name}</p>
                ) : (
                  <p>Drag and drop your image here, or click to select</p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={() => handleSubmit(title ? "text" : "image")}>
          Post
        </Button>
      </CardFooter>
    </Card>
  );
}
