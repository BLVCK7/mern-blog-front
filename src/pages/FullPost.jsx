import React from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetPost } from '../redux/slices/posts';

export const FullPost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { posts } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchGetPost(id));
    // eslint-disable-next-line
  }, []);

  if (isPostsLoading) {
    return <Post isFullPost />;
  }

  return (
    <>
      <Post
        id={posts.items._id}
        title={posts.items.title}
        // imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
        imageUrl={posts.items.imageUrl ? `http://localhost:4444${posts.items.imageUrl}` : ''}
        // imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        user={posts.items.user}
        createdAt={posts.items.createdAt}
        viewsCount={posts.items.viewsCount}
        commentsCount={posts.items.comments.length}
        tags={posts.items.tags}
        isFullPost>
        <ReactMarkdown children={posts.items.text} />
      </Post>
      <CommentsBlock>
        <Index />
      </CommentsBlock>
    </>
  );
};
