import Post from "@/components/Post";
import { cookieBasedClient, isAuthenticated } from "@/utils/amplify-utils";
import { onDelete } from "./_actions/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDaysIcon } from "lucide-react";
import PostListing from "@/components/PostListing";

export default async function Home() {
  const entries = await getEntries(); // Call data fetching function

  const isSignedIn = await isAuthenticated();
  if (!isSignedIn) {
    return (
      <div className="text-center pt-20">
        You are not signed in. Please sign in to access your journal entries.
      </div>
    );
  }

  return (
    <main>
      <section className="w-full py-12 md:py-8 lg:py-16">
        <PostListing entries={entries} isLoggedin={isSignedIn} />
      </section>
    </main>
  );
}

async function getEntries() {
  try {
    const isSignedIn = await isAuthenticated();
    if (!isSignedIn) {
      return []; // User not authenticated, return empty array
    }

    const { data: fetchedEntries } = await cookieBasedClient.models.Entry.list({
      selectionSet: [
        "title",
        "description",
        "createdAt",
        "owner",
        "id",
        "updatedAt",
      ],
      authMode: "userPool",
    });
    return fetchedEntries;
  } catch (err) {
    console.error("Error fetching entries:", err);
    return []; // Return empty array on error
  }
}
