'use server';

import { z } from 'zod';
import { auth } from '@/auth';

import type { Post, Topic } from '@prisma/client';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';
import { error } from 'console';
import { title } from 'process';

const createPostSchema = z.object({
  title: z
    .string()
    .min(3),
  content: z
    .string()
    .min(10)
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[],
    _form?: string[];
  }
}

export async function createPost(
  slug: string,
  formState: CreatePostFormState, 
  formData: FormData): Promise<CreatePostFormState> {
  
    const result = createPostSchema.safeParse({
      title: formData.get('title'),
      content: formData.get('content')
    });

    if(!result.success){
      return {
        errors: result.error.flatten().fieldErrors
      }
    }

    const sesssion = await auth ();
    if(!sesssion || !sesssion.user){
        return {
          errors: {
            _form: ['You must signed in to create a Post.']
          }
        }
    }

    let post: Post;

    try{

      const topic = await db.topic.findFirst({
        where: {
          slug: slug
        }
      });

      if(!topic){
        return {
          errors: {
            _form: [`Cannot find topic for slug: ${slug}`]
          }
        }
      }

     post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        topicId: topic.id,
        userId: sesssion.user.id || '',
      }
     });
    }catch(err: unknown){
      if(err instanceof Error){
        return {
          errors: {
            _form: [err.message]
          }
        }
      }else{
        return {
          errors: {
            _form: ['Failed to create Post']
          }
        }
      }
    }

    // return {
    //   errors: {}
    // };

  //TODO: revalidate the Topic Show Page
  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug,post.id));
}