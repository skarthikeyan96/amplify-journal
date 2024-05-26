import { cookieBasedClient, isAuthenticated } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";
import React from "react";
import { Schema } from "../../../../amplify/data/resource";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Libre_Baskerville } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import { onDelete } from "@/app/_actions/actions";
import PostDetail from "@/components/PostDetail";

const libre_baskerville = Libre_Baskerville({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre_baskerville",
  weight: "400",
});
const cormorant_garamond = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant_garamond",
  weight: "400",
});

const Posts = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const isSignedIn = await isAuthenticated();
  const { data: post }: any = await cookieBasedClient.models.Entry.get(
    {
      id: params.id,
    },
    {
      authMode: "userPool",
      selectionSet: [
        "title",
        "description",
        "createdAt",
        "owner",
        "id",
        "updatedAt",
      ],
    }
  );
  return (
   <PostDetail post={post} id={params.id}/>
  );
};

export default Posts;
