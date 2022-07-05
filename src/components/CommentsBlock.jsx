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
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

export const CommentsBlock = ({ items, children, isLoading = true }) => {
  const isAuth = useSelector(selectIsAuth);
  // const [data, setData] = React.useState();
  // const { id } = useParams();

  // const _id = JSON.stringify(id);

  // console.log(data, id, _id);

  // React.useEffect((_id) => {
  //   axios.get(`http://localhost:4444/comment/get`, _id).then((res) => {
  //     setData(res.data);
  //   });
  // }, []);

  return (
    <>
      {isAuth ? (
        <SideBlock title="Комментарии">
          <List>
            {(isLoading ? [...Array(5)] : items).map((obj, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    {isLoading ? (
                      <Skeleton variant="circular" width={40} height={40} />
                    ) : (
                      <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                    )}
                  </ListItemAvatar>
                  {isLoading ? (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Skeleton variant="text" height={25} width={120} />
                      <Skeleton variant="text" height={18} width={230} />
                    </div>
                  ) : (
                    <ListItemText primary={obj.user.fullName} secondary={obj.text} />
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
