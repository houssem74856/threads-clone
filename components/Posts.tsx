"use client";

import { fetchInfinitePosts } from "@/actions/mutations/post actions/fetchInfinitePosts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Post from "./Post";

export default function Posts({ posts, currentUser, children }: any) {
  const { ref, inView } = useInView();

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["infinite"],
      queryFn: ({ pageParam }) =>
        fetchInfinitePosts({ id: currentUser.id, pageParam }),
      /*initialData: { pages: [posts], pageParams: [0] },*/
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.length === 5 ? allPages.length : undefined;
      },
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  /*const more = () => {
    fetchNextPage();
  };*/

  return (
    <div>
      {posts.length === 0 ? (
        <div className="text-neutral-400">No posts available.</div>
      ) : (
        <div className="flex flex-col gap-y-2">{children}</div>
      )}
      <div className="app relative flex flex-col gap-y-2">
        {isSuccess &&
          data.pages.map((page: any) =>
            page.map((post: any) => (
              <Post
                key={post.id}
                id={post.id}
                content={post.content}
                created_at={post.created_at}
                profiles={post.profiles}
                liked={post.liked}
                saved={post.saved}
                user={currentUser}
              />
            ))
          )}
        {isFetchingNextPage && <Loader2 className="h-6 w-6 animate-spin" />}

        <div className="absolute inset-x-0 bottom-96" ref={ref} />
        {/*<button onClick={more}>more</button>*/}
      </div>
    </div>
  );
}
