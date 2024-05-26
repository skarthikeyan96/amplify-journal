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
import { createPost } from "../_actions/actions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const CreateJournalEntry = () => {
  return (
    <div className="w-full py-12 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create New Entry</CardTitle>
          <CardDescription>
            Add a new entry to your journal with a title and content.
          </CardDescription>
        </CardHeader>
        <form action={createPost}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input name="title" id="title" placeholder="Enter a title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                className="min-h-[300px]"
                name="description"
                id="description"
                placeholder="Write your entry in Markdown"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Create Entry</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateJournalEntry;
