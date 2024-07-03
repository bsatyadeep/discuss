 'use client';

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import * as actions from '@/actions';
import { Button, Textarea } from "@nextui-org/react";
import FormButton from "@/components/common/form-button";

 interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

 export default function CommentCreateForm({ 
  postId, 
  parentId, 
  startOpen}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, commentCreateAction] = useFormState(
    actions.createComment.bind(null, { postId, parentId }),
    { 
      errors: {} 
    });

  useEffect(() => {
    if(formState.success){
      ref.current?.reset();

      if(!startOpen){
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const form = (<form action={commentCreateAction} ref={ref}>
      <div className="space-y-2 px-1">
        <Textarea
          name="content"
          label='Reply'
          placeholder="Enter your comment"
          isInvalid={!!formState.errors.content}
          errorMessage={formState.errors.content}></Textarea>
      </div>

      <FormButton>Create Comment</FormButton>
    </form>
  );

  return (<div>
    <Button
      size="sm"
      variant="light"
      onClick={() => setOpen(!open)}>
        Reply
      </Button>
      {open && form}
  </div>);
 }