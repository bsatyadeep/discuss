import paths from "@/paths";
import Link from "next/link";
import React from "react";
import PostShow from "@/components/posts/post-show";
import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentList from "@/components/comments/comment-list";
import { fetchCommentsByPostId } from '@/db/queries/comments';
import { Suspense } from "react";
import PostShowLoading from '@/components/posts/post-show-loading';

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string
  }
}

export default function PostShowPage({ params }: PostShowPageProps) {

  const { slug, postId } = params;

  return <div className="space-y-3">
      <Link
        className="underline decoration-solid"
        href={paths.topicShow(slug)}>
          {'<'} Back to {slug}
      </Link>

      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <Suspense fallback={<PostShowLoading></PostShowLoading>}>
        <PostShow 
          postId={postId}></PostShow>
      </Suspense>

      {/* <PostShow 
        postId={postId}></PostShow> */}

      <CommentCreateForm 
        postId={postId}
        startOpen></CommentCreateForm>

      <CommentList
        fetchdata={() => fetchCommentsByPostId(postId)}
        postId={postId}></CommentList>

    </div>
}