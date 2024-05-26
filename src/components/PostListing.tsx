"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDaysIcon, CircleX } from "lucide-react";
import Post from "./Post";
import { onDelete } from "@/app/_actions/actions";
import { Key, useState } from "react";

const PostListing = (props: any) => {
  const { entries, isSignedIn } = props;
  const [journalEntries, setJournalEntries] = useState(entries);
  const [selected, setSelected] = useState<Date>();

  const handleSelect = (date: any) => {
    setSelected(date);
    const updatedJournalEntries = journalEntries.filter((entry: any) => {
      return new Date(date).getDate() === new Date(entry.createdAt).getDate();
    });
    setJournalEntries(updatedJournalEntries);
  };

  const resetFilter = () => {
    setSelected(undefined);
    setJournalEntries(entries);
  };

  return (
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            My Journal
          </h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            A collection of my thoughts and experiences.
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-5xl gap-6 py-12">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Journal Entries</h3>
            <Link
              href="/add"
              className={buttonVariants({ variant: "secondary" })}
            >
              Add Entry{" "}
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" variant="outline">
                  <CalendarDaysIcon className="mr-2 h-4 w-4" />
                  Filter by date
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  selected={selected}
                  onSelect={handleSelect}
                  initialFocus
                  mode="single"
                />
              </PopoverContent>
            </Popover>

            {selected && (
              <Button size="sm">
                {new Date(selected).toDateString()}
                <CircleX onClick={resetFilter} className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="divide-y rounded-lg border dark:border-gray-800">
            {journalEntries.map((entry: any, key: Key | null | undefined) => (
              <Post
                key={key}
                post={entry}
                onDelete={onDelete}
                isSignedIn={isSignedIn}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostListing;
