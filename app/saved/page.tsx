import { getSavedPosts } from '@/actions/queries/post actions/getSavedPosts'
import { fetchCurrentUser } from '@/actions/queries/user action/fetchUser'
import Header from '@/components/Header'
import Post from '@/components/Post'
import React from 'react'

async function page() {
  const { savedPosts, error } = await getSavedPosts()
  const {currentUser} = await fetchCurrentUser()

  if(error) {
    return (
      <div>{error.message}</div>
    )
  }

  return (
    <div className="bg-neutral-900 p-3 m-2 rounded-lg w-full">
      <Header user={currentUser}/>
      <h1 className="text-white text-2xl font-semibold mt-4 mb-1">
        Saved Posts
      </h1>
      {savedPosts?.length === 0 ? (
        <div className="text-neutral-400">
          No saved posts.
        </div>
      ) : (
        <div
          className="flex flex-col gap-y-2" 
        >
          {savedPosts?.map((post) => (
            <Post key={post.posts.id} id={post.posts.id} content={post.posts.content} created_at={post.posts.created_at} profiles={post.posts.profiles} user={currentUser}/>
          ))}
        </div>
      )}
    </div>
  )
}

export default page