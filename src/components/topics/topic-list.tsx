import Link from 'next/link';
import { Chip } from '@nextui-org/react';
import { db } from '@/db';
import paths from '@/paths';
import React from 'react';

export default async function TopicList() {
  const topics = await db.topic.findMany();
  const renderedTopics = topics.map((topic) =>{
    return (<Link
        key={topic.id}
        href={paths.topicShow(topic.slug)}>
          <Chip
            color='warning'
            variant='shadow'>
              {topic.slug}
            </Chip>
        </Link>);
  });

  return <div className='flex flex-row gap-2 flex-wrap'>
    {renderedTopics}
  </div>
}