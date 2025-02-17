import React, { Suspense } from 'react';
import Link from 'next/link';
import SearchInput from '../components/search-input';

import {
  // Avatar,
  // Button,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  // Popover,
  // PopoverContent,
  // PopoverTrigger
} from '@nextui-org/react';
// import * as actions from '@/actions';
// import { auth } from '@/auth';

import HeaderAuth from '@/components/header-auth';

export default function Header() {
  // const session = await auth();
  // let authContent: React.ReactNode;
  // if(session?.user){
  //   authContent = <Popover placement='left'>
  //     <PopoverTrigger>
  //       <Avatar src={session.user.image || ''}></Avatar>
  //     </PopoverTrigger>
  //     <PopoverContent>
  //       <div className='p-4'>
  //         <form action={actions.signOut}>
  //           <Button
  //             type='submit'
  //             color='primary'
  //             variant='shadow'>Sign Out</Button>
  //         </form>
  //       </div>
  //     </PopoverContent>
  //   </Popover>
  // }else{
  //   authContent = <>
  //     <NavbarItem>
  //       <form action={actions.signIn}>
  //         <Button 
  //           type='submit'
  //           color='secondary'
  //           variant='bordered'>Sign In</Button>
  //       </form>
  //     </NavbarItem>
  //     <NavbarItem>
  //       <form action={actions.signIn}>
  //         <Button 
  //             type='submit'
  //             color='primary'
  //             variant='flat'>Sign Up</Button>
  //       </form>
  //     </NavbarItem>
  //   </>
  // }

  return (
    <Navbar className='shadow mb-6'>
      <NavbarBrand>
        <Link 
          href='/'
          className='font-bold'>Discuss</Link>
      </NavbarBrand>
      <NavbarContent justify='center'>
        <NavbarItem>
          {/* <Input></Input> */}
          <Suspense>
            <SearchInput></SearchInput>
          </Suspense>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify='end'>
          {/* {authContent} */}
          <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}