'use client';

import { useSession } from 'next-auth/react';
import React from 'react';

export default function Profile() {
  const session = useSession();

  if(session.data?.user){
    return <div>From client: {JSON.stringify(session.data)}</div>;
  }

  return (<div>From client: user not Signed In</div>);
}