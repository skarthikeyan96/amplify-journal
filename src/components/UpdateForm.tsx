'use client'

import { updatePost } from "@/app/_actions/actions";
import { useState } from "react";

const UpdateForm = ({initialData: {id, title, content}}: any) => {

    const [updatetitle, setUpdatetitle] = useState(title)
    const [updatecontent, setUpdateContent] = useState(content);

    const handleUpdate = () => {
        updatePost({
            id,
            title: updatetitle,
            description: updatecontent
        })
    }
    return (
        <div>
        {/* <form
          className="p-4 flex flex-col items-center gap-4"
        > */}
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={updatetitle}
            onChange={(e) => setUpdatetitle(e.target.value)}
            className="border border-gray-200 text-gray-900 block p-2 rounded-lg"
          />
  
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            value={updatecontent}
            onChange={(e) => setUpdateContent(e.target.value)}
            className="border border-gray-200 text-gray-900 block p-2 rounded-lg"
          />
          <button onClick={handleUpdate} className="text-white bg-teal-600 rounded p-4">
            Submit
          </button>
        {/* </form> */}
      </div>
    )
}

export default UpdateForm;