import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { getAllList } from '../Redux/actions/listActions';
import { Link } from "react-router-dom";

export default function FolderList() {

  const dispatch = useDispatch();
  const lists = useSelector((state) => state.list)

  useEffect(() => {
    dispatch(getAllList());
  }, [dispatch])

  return (
    <>
      <List sx={{ width: "100%", mt: 3, bgcolor: 'background.paper' }}>
          {lists.data.map((list) => {
            return (
              <Link to={`/DetailPage/${list._id}`} key={list._id} style={{ textDecoration: "none", color: "black" }}>
                <ListItem key={list._id}>
                  <ListItemAvatar sx={{ mr: 1 }}>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={list.name} secondary={list.birthday} />
                </ListItem>
              </Link>
            )
          })}
        </List>
    </>
  );
}