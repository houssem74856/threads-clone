'use client'

import { FaRegHeart } from "react-icons/fa";
import Button from "./ui/Button";
import { VscHeartFilled } from "react-icons/vsc";
import useSignInModal from "@/hooks/useSignInModal";
import { useRouter } from "next/navigation";
import { likePost } from "@/actions/mutations/post actions/likePost";
import { useState } from "react";
import { unlikePost } from "@/actions/mutations/post actions/unlikePost";
import { didHeLiked } from "@/actions/queries/post actions/didHeLiked";

export default function LikeButton({id, profiles, user, liked}: any) {
  const [isliked, setIsLiked] = useState(liked)
  const signInModal = useSignInModal()

  const handleLike = async () => {
    if(!user) {
      return signInModal.onOpen()
    }

    if(isliked) {
      await unlikePost({
        user_id: user.id,
        post_id: id,
      })
    }
    else{
      await likePost({
        user_id: user.id,
        post_id: id,
        postOwner_id: profiles.id,
        username: user.user_metadata.user_name
      })
    }

    setIsLiked(!isliked)
  } 

  return (
    <Button
        onClick={handleLike}   
        className="px-1 py-1 bg-transparent hover:cursor-pointer"    
      >
      {isliked ? <VscHeartFilled color="white" size={20}/> : <FaRegHeart color="white" size={20}/>}
    </Button>
  )
}
