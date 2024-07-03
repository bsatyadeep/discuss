'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@nextui-org/react';
import React from 'react';

interface FormButtonProps {
  children: React.ReactNode
}
export default function FormButton({children}: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
  <Button
    type='submit'
    color='primary'
    variant='flat'
    isLoading={pending}>
      {children}
  </Button>);
}