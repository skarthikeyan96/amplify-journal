"use server"

import { cookieBasedClient } from "@/utils/amplify-utils"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


export async function createPost(formData: FormData) {
    const {data} = await cookieBasedClient.models.Entry.create({
        title: formData.get("title")?.toString() || "", // TODO: implement client side validation
        description: formData.get("description")?.toString() || ""
    })

    console.log("data", data)
    redirect("/")
}

export async function onDelete(id: string) {
    const {data, errors} = await cookieBasedClient.models.Entry.delete({
        id
    })

    console.log("delete", data)
    revalidatePath("/")
}