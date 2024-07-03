import { redirect } from "next/navigation";
import React from "react";
import PostList from '../../components/posts/post-list';
import { fetchPostsBySearchTerm } from '../../db/queries/posts';

interface SearchPageProps {
  searchParams: {
    term: string;
  }
}
export default async function Search({ searchParams }: SearchPageProps){
  const { term } = searchParams;

  if(!term){
    redirect('/');
  }


  return (<div>
    <PostList
      fetchData={() => fetchPostsBySearchTerm(term)}
      slug=""></PostList>
  </div>);
}