import { getDialogueById } from "@/access-data/groupes&Dialogues";
import { getDialogueMessages } from "@/access-data/messages";
import { fetchCurrentUser } from "@/access-data/users";
import { insertMessage } from "@/actions/mutations/messages actions/insertMessage";
import Messages from "@/components/Messages";
import Button from "@/components/ui/MyButton";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import Image from "next/image";
import { FaUserAlt } from "react-icons/fa";

export default async function page({ params }: any) {
  const { currentUser } = await fetchCurrentUser();
  const { dialogue } = await getDialogueById({
    id: params.dialogueId,
    currentUserId: currentUser?.id,
  });
  const { otherUser } = dialogue;
  const { messages } = await getDialogueMessages(dialogue.id);

  const postMessage = async (formData: any) => {
    "use server";

    const message = formData.get("message");

    await insertMessage({
      userId: currentUser?.id,
      dialogueId: dialogue.id,
      content: message,
    });
  };

  return (
    <div className="h-full flex flex-col relative">
      <h1>messages page</h1>
      <div className="w-full flex flex-col gap-y-3 absolute bottom-0">
        <Messages
          messages={messages}
          currentUser={currentUser}
          otherUser={otherUser}
          dialogue_id={dialogue.id}
        ></Messages>
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
