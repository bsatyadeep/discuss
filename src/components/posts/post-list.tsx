import React from 'react'
import Link from 'next/link';

import { db } from '@/db';
import paths from '@/paths';
import type { PostWithData } from '@/db/queries/posts';

interface PostListFormProps {
  slug: string,
  fetchData: () => Promise<PostWithData[]>
}

export default async function PostList({slug, fetchData}: PostListFormProps) {
  const posts = await fetchData();

  // const posts = await db.post.findMany();
  const renderedPosts = posts.map(async (post)=>{
    return (<div key={post.id} className='border rounded p-2'>
      <Link
        href={paths.postShow(post.topic.slug, post.id)}>
          <h3 className="text-lg font-bold">{post.title}</h3>
          <div className="flex flex-row gap-8">
            <p className="text-xs text-gray-400">By {post.user.name}</p>
            <p className="text-xs text-gray-400">
              {post.content}
            </p>
          </div>
        </Link>
    </div>);
  });

  return (<div className='space gap-y-2'>
    {renderedPosts}
  </div>);
}