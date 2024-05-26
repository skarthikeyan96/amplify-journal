"use client";

import { updatePost } from "@/app/_actions/actions";
import { useState } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const UpdateForm = ({ initialData: { id, title, content } }: any) => {
  const [updatetitle, setUpdatetitle] = useState(title);
  const [updatecontent, setUpdateContent] = useState(content);

  const handleUpdate = () => {
    updatePost({
      id,
      title: updatetitle,
      description: updatecontent,
    });
  };
  return (
    <div className="w-full py-12 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Update {title} </CardTitle>
          <CardDescription>Update your journal entry</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              onChange={(e) => setUpdatetitle(e.target.value)}
              value={updatetitle}
              name="title"
              id="title"
              placeholder="Enter a title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              className="min-h-[300px]"
              name="description"
              value={updatecontent}
              id="description"
              onChange={(e) => setUpdateContent(e.target.value)}
              placeholder="Write your entry in Markdown"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleUpdate}>Update Entry</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UpdateForm;
