"use server"

import { cookieBasedClient } from "@/utils/amplify-utils"
import { redirect } from "next/navigation"


export async function createPost(formData: FormData) {
    const {data} = await cookieBasedClient.models.Entry.create({
        title: formData.get("title")?.toString() || "", // TODO: implement client side validation
        description: formData.get("description")?.toString() || ""
    })

    console.log("data", data)
    redirect("/")
}