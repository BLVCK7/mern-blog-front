import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

import { SideBlock } from './SideBlock';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchPostsFromTags } from '../redux/slices/posts';

export const TagsBlock = ({ items }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { posts } = useSelector((state) => state.posts);
  const isPostsLoading = posts.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPostsFromTags(id));
  }, [dispatch, id]);

  return (
    <SideBlock title="Тэги">
      <List>
        {(isPostsLoading ? [...Array(5)] : items).map((name, i) => (
          <Link key={i} style={{ textDecoration: 'none', color: 'black' }} to={`/tags/${name}`}>
            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isPostsLoading ? <Skeleton width={100} /> : <ListItemText primary={name} />}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  );
};
