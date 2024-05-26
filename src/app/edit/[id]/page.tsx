
import { cookieBasedClient } from "@/utils/amplify-utils";
import { createPost } from "../../_actions/actions";
import UpdateForm from "@/components/UpdateForm";

const UpdateJournalEntry = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const { data: post } = await cookieBasedClient.models.Entry.get(
    {
      id: params.id,
    },
    {
      authMode: "userPool",
      selectionSet: ['createdAt', 'description' ,'id', 'title', 'updatedAt'],
    }
  );
  
  return (
   <UpdateForm initialData={{ id: params.id, title: post?.title ?? '', content: post?.description ?? '' }}/>
  );
};

export default UpdateJournalEntry;
