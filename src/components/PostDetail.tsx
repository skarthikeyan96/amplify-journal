'use client'

import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"
import { onDelete } from "@/app/_actions/actions"

const PostDetail = (props: any) => {
    const {post, id} = props;
    return (
        <div className={`max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8`}>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Updated on {new Date(post.updatedAt).toDateString()}
            </p>
          </div>
          <div className="mt-8 flex justify-end gap-2">
            <Link
              href={`/edit/${id}`}
              className={buttonVariants({ variant: "outline" })}
            >
              Edit
            </Link>
            <Button variant="destructive" onClick={() => onDelete(id)}>
              Delete
            </Button>
          </div>
          <div className="prose prose-lg dark:prose-invert">
            {post.description}
          </div>
        </div>
      </div>
    )
}

export default PostDetail;