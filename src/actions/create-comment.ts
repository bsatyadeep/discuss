'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface CreateCommentFormState {
  errors: {
    content?: string[];
    _form?: string[]
  };
  success?: boolean;
}

const createCommentSchema = z.object({
  content: z
    .string()
    .min(3),
});

interface CreateCommentsProps {
  postId: string;
  parentId?: string;
}

export async function createComment(
  { 
    postId, 
    parentId 
  }: CreateCommentsProps,
  formState: CreateCommentFormState,
  formData: FormData): Promise<CreateCommentFormState> {

    const result = await createCommentSchema.safeParseAsync({
      content: formData.get('content'),
    });

    if(!result.success){
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    const session = await auth();

    if(!session || !session.user){
      return {
        errors: {
          _form: ['You must sign in to add a comment'],
        }
      };
    }

    try{
      await db.comment.create({
        data: {
          content: result.data.content,
          postId: postId,
          parentId: parentId,
          userId: session.user.id || ''
        },
      });

    }catch(err: unknown){
      if(err instanceof Error){
        return {
          errors: {
            _form: [err.message]
          }
        };
      }else{
        return {
          errors: {
            _form: ['Error occured while creating the comment'],
          }
        };
      }
    }

    const topic = await db.topic.findFirst({
      where: {
        posts: {
          some: {
            id: postId
          }
        }
      }
    });

    if(!topic){
      return {
        errors: {
          _form: ['Failed to revalidate topic']
        }
      };
    }
    //TODO: revalidate the Post Show Page
    revalidatePath(paths.postShow(topic.slug, postId));
    return {
      errors: {

      },
      success: true
    };
}