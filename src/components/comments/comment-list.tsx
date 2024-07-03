import CommentShow from "@/components/comments/comment-show";
import type { CommentWithAuthor } from '@/db/queries/comments';
import { fetchCommentsByPostId } from "@/db/queries/comments";

interface CommentListProps {
  postId: string;
  fetchdata: () => Promise<CommentWithAuthor[]>
}

export default async function CommentList({ fetchdata, postId }: CommentListProps) {

  // const comments = await db.comment.findMany({
  //   where: {
  //     postId: postId
  //   }
  // });

  // const comments = await fetchdata();
  const comments = await fetchCommentsByPostId(postId);

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null 
  );

  const renderedComments = topLevelComments.map((comment) =>{
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        comments={comments}
        postId={postId}></CommentShow>
    );
  });

  return (<div className="space-y-3">
    <h1 className="text-lg font-bold">All {comments.length} comments</h1>
    { renderedComments}
  </div>);
}