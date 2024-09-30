import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2 } from "lucide-react";

export default function CreateComment() {
  return (
    <Card className="w-full max-w-2xl">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="@username"
            />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-sm">@username</span>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
            <p className="mt-2 text-sm text-foreground">
              This is a sample comment. It could be much longer and contain
              multiple paragraphs. Reddit-style comments often have in-depth
              discussions and can be quite lengthy.
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="icon" className="w-6 h-6">
                  <ArrowBigUp className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">42</span>
                <Button variant="ghost" size="icon" className="w-6 h-6">
                  <ArrowBigDown className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">
                <MessageSquare className="h-4 w-4 mr-2" />
                Reply
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
