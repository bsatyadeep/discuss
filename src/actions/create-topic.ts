'use server';
import { z } from 'zod';
import { auth } from '@/auth';

import type { Topic } from '@prisma/client';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z-]/, {
      message: 'Must be lowercase letters or dashes without spaces'
    }),
  description: z
    .string()
    .min(10)
});

interface CreateFormState {
  errors: {
    name?: string[];
    description?: string[],
    _form?: string[];
  }
}

export async function createTopic(
  formState: CreateFormState, 
  formData: FormData) : Promise<CreateFormState> {

    // await new Promise(resolve => setTimeout(resolve, 2500));

  // const name = formData.get('name');
  // const description = formData.get('description');
  // console.log(`name: ${name}, description: ${description}`);

  const result = await createTopicSchema.safeParseAsync({
    name: formData.get('name'),
    description: formData.get('description')
  });

  if(!result.success){
    console.log(result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors
    };
  }

  const sesssion = await auth ();
  if(!sesssion || !sesssion.user){
      return {
        errors: {
          _form: ['You must signed in to create a Topic.']
        }
      }
  }

  let topic: Topic;

  try{
    // throw new Error('Failed to create a topic');
    topic = await db.topic.create({
      data: {
        slug: result.data?.name,
        description: result.data?.description
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
          _form: ['Failed to create Topic']
        }
      }
    }
  }

  //TODO: revalidate the home page
  revalidatePath('/');
  redirect(paths.topicShow(topic.slug));

  // return {
  //   errors: {

  //   }
  // };
}