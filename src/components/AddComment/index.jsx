import React from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import { useParams } from 'react-router-dom';

import axios from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../redux/slices/posts';

export const Index = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const { id } = useParams();

  const { data } = useSelector((state) => state.auth);

  const onSubmit = async (e) => {
    try {
      const commentData = {
        userName: data.fullName,
        avatarUrl: data.avatarUrl,
        text: value,
        postId: id,
      };

      await axios.post(`http://localhost:4444/comment/add`, commentData);

      dispatch(addComment(commentData));

      setValue('');

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
        <Avatar classes={{ root: styles.avatar }} src={data.avatarUrl} />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            value={value}
            onChange={(e) => setValue(e.target.value)}
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
