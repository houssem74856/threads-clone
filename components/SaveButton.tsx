'use client'

import Button from "./ui/Button";
import useSignInModal from "@/hooks/useSignInModal";
import { savePost } from "@/actions/mutations/post actions/savePost";
import { RxBookmarkFilled } from "react-icons/rx";
import { FaRegBookmark } from "react-icons/fa";
import { useState } from "react";
import { unsavePost } from "@/actions/mutations/post actions/unsavePost";

export default function SaveButton({id, user, saved}: any) {
  const [isSaved, setIsSaved] = useState(saved)
  const signInModal = useSignInModal()

  const handleSave = async () => {
    if(!user) {
      return signInModal.onOpen()
    }

    if(isSaved) {
      await unsavePost({
        user_id: user.id,
        post_id: id
      })
    } else {
      await savePost({
        user_id: user.id,
        post_id: id
      })
    }

    setIsSaved(!isSaved)
  } 

  return (
    <Button
      className="px-1 py-1 bg-transparent hover:cursor-pointer" 
      onClick={handleSave}   
    >
      {isSaved ? <RxBookmarkFilled color="white" size={20}/> : <FaRegBookmark color="white" size={20}/>}      
    </Button>
  )
}
