import { getGroupeById } from "@/access-data/groupes&Dialogues";
import { getGroupeMessages } from "@/access-data/messages";
import { fetchCurrentUser } from "@/access-data/users";
import { insertMessageInGroupe } from "@/actions/mutations/messages actions/insertMessage";
import GroupeMessages from "@/components/GroupeMessages";
import Button from "@/components/ui/MyButton";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";

export default async function page({ params }: any) {
  const { currentUser } = await fetchCurrentUser();
  const { groupe } = await getGroupeById({
    id: params.groupeId,
    currentUserId: currentUser?.id,
  });
  const { otherUsers } = groupe;
  const { messages } = await getGroupeMessages(groupe.id);

  const postMessage = async (formData: any) => {
    "use server";

    const message = formData.get("message");

    await insertMessageInGroupe({
      userId: currentUser?.id,
      groupeId: groupe.id,
      content: message,
    });
  };

  return (
    <div className="h-full flex flex-col relative">
      <h1>messages page</h1>
      <div className="w-full flex flex-col gap-y-3 absolute bottom-0">
        <GroupeMessages
          messages={messages}
          currentUser={currentUser}
          otherUsers={otherUsers}
          groupe_id={groupe.id}
        ></GroupeMessages>
        <form action={postMessage} className="flex gap-x-2 items-center">
          <Input
            name="message"
            className="h-[50px] my-4"
            placeholder="Message..."
          />
          <Button
            type="submit"
            className="w-[50px] h-[50px] px-3 hover:opacity-100 hover:cursor-pointer"
          >
            <SendHorizontal size={24} />
          </Button>
        </form>
      </div>
    </div>
  );
}
