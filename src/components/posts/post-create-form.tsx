'use client';

import React from "react";
import { useFormState } from "react-dom";
import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from '@nextui-org/react';
import * as actions from '../../actions';
import  FormButton from '../../components/common/form-button';

interface PostCreateFormProps {
  slug: string
}

export default function PostCreateForm( { slug }: PostCreateFormProps) {

  const [formState, createPostAction] = useFormState(
    actions.createPost.bind(null, slug),{
      errors: {

      }
    }
  );

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button
          color="primary">
            Create a Post
          </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={createPostAction}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a post</h3>
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(', ')}></Input>

            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(', ')}></Textarea>

            {
              formState.errors._form
                ? <div className="p-2 rounded border bg-red-200 border-red-400">{formState.errors._form.join(', ')}</div>
                : null
            }
            <FormButton>Create Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}