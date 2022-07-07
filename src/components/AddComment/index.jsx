import React from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import { useParams } from 'react-router-dom';

import axios from '../../axios';
import { useSelector } from 'react-redux';

export const Index = () => {
  const [comments, setComments] = React.useState('');
  const { id } = useParams();

  const { posts } = useSelector((state) => state.posts);

  const onSubmit = async (e) => {
    try {
      const fields = {
        comments,
        id,
      };

      await axios.post(`http://localhost:4444/comment/add`, fields);

      setComments('');

      // const _id = isEditing ? id : data._id;

      // navigate(`/posts/${_id}`);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при добавлении комментария');
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={posts.items.user.avatarUrl} />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={onSubmit} variant="contained">
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
