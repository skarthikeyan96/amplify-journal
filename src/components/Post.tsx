"use client";

import React from "react";
import Link from "next/link";

const Post = ({
  post,
}: {
  post: any;
  onDelete: (id: string) => void;
  isSignedIn: boolean;
}) => {
  const truncate = (input: string) =>
  input?.length > 100 ? `${input.substring(0, 90)}...` : input;
  return (
    <Link href={`posts/${post.id}`}>
     <div className="grid gap-4 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(post.createdAt).toDateString()}
        </div>
        <h4 className="text-lg font-medium">{post.title}</h4>
      </div>
      <p className="text-gray-500 dark:text-gray-400">{truncate(post.description)}</p>
    </div>
    </Link>
   
  );
};

export default Post;
