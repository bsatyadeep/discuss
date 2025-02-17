'use client';

import React from "react";
import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from '@nextui-org/react';
import * as actions from '@/actions';
import { useFormState } from "react-dom";

import  FormButton from '@/components/common/form-button';
export default function TopicCreateForm() {

  const[ formState, createTopicAction] = useFormState(actions.createTopic, {
    errors: {

    },
  });

  return (<Popover placement="left">
    <PopoverTrigger>
      <Button
        color="primary">Create a Topic</Button>
    </PopoverTrigger>
    <PopoverContent>
      <form action={createTopicAction}>
        <div className="flex flex-col gap-4 p-4 w-80">
          <h3 className="text-lg">Create Topic</h3>
          <Input
            name="name"
            label='Name'
            labelPlacement="outside"
            placeholder="Name your topic"
            isInvalid={!!formState.errors.name}
            errorMessage={formState.errors.name?.join(', ')} />

          <Textarea
            name="description"
            label='Description'
            labelPlacement="outside"
            placeholder="Describe your topic"
            isInvalid={!!formState.errors.description}
            errorMessage={formState.errors.description?.join(', ')} />
          
          {
            formState.errors._form
              ? <div className="p-2 rounded border bg-red-200 border-red-400">{formState.errors._form.join(', ')}</div>
              : null
          }
          
          {/* <Button
            type="submit"
            color="primary"
            variant="bordered">Submit</Button> */}
          
          <FormButton>Create Topic</FormButton>

        </div>
      </form>
    </PopoverContent>
  </Popover>);
}