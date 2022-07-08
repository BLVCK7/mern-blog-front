import React from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import axios from '../axios';
import { useSelector } from 'react-redux';

export const FullPost = () => {
  const { id } = useParams();
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);

  const authStatus = useSelector((state) => state.auth.status);

  React.useEffect(() => {
    axios
      .get(`http://localhost:4444/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении статьи');
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  console.log(authStatus);

  return (
    <>
      {authStatus === 'error' ? (
        <div>Авторизуйтесь, чтобы просматривать статьи</div>
      ) : (
        <div>
          <Post
            id={data._id}
            title={data.title}
            // imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
            imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
            // imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
            user={data.user}
            createdAt={data.createdAt}
            viewsCount={data.viewsCount}
            commentsCount={3}
            tags={data.tags}
            isFullPost>
            <ReactMarkdown children={data.text} />
          </Post>
          <CommentsBlock items={data.comments} isLoading={false}>
            <Index />
          </CommentsBlock>
        </div>
      )}
    </>
  );
};
