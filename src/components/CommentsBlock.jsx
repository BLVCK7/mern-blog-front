import React from 'react';

import { SideBlock } from './SideBlock';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/slices/auth';

export const CommentsBlock = ({ children }) => {
  const isAuth = useSelector(selectIsAuth);

  const { posts } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === 'loading';

  const getAllComments = posts.items.comments;

  return (
    <>
      {isAuth ? (
        <SideBlock title="Комментарии">
          <List>
            {(isPostsLoading ? [...Array(5)] : getAllComments).map((obj, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    {isPostsLoading ? (
                      <Skeleton variant="circular" width={40} height={40} />
                    ) : (
                      <Avatar alt={obj.avatarUrl} src={obj.avatarUrl} />
                    )}
                  </ListItemAvatar>
                  {isPostsLoading ? (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Skeleton variant="text" height={25} width={120} />
                      <Skeleton variant="text" height={18} width={230} />
                    </div>
                  ) : (
                    <ListItemText primary={obj.userName} secondary={obj.text} />
                  )}
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
          {children}
        </SideBlock>
      ) : (
        <div>
          <p>Авторизуйтесь для просмотра комментариев</p>
        </div>
      )}
    </>
  );
};
