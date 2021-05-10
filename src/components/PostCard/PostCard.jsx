import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CardActionArea from '@material-ui/core/CardActionArea';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import {useHistory} from 'react-router-dom';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import {useContext, useState} from 'react'
import {AuthContext} from '../../App';
import axios from '../../api';
import './PostCard.style.css';
const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

 
}));

export default function RecipeReviewCard(props) {
  const history = useHistory();
  const classes = useStyles();
  const [isBookMark, setIsBookMark] = useState(props.isBookMark);
  const [expanded, setExpanded] = React.useState(false);
  const handleAddBookMark = async () => {
    const res = await axios({
      url : '/api/bookmark',
      method : 'POST',
      data : {
        postID : props.id,
      }
    });
    if(res.data.success) {
      setIsBookMark(true);
    }
  }
  const handleRemoveBookMark = async () => {
    const res = await axios({
      url : '/api/bookmark',
      method : 'DELETE',
      data : {
        postID : props.id,
      }
    });
    if(res.data.success) {
      setIsBookMark(false);
    }
  }
  const handleBookMark = () => {
    if(isBookMark) {
      handleRemoveBookMark();
    }else{
      handleAddBookMark();
    }
  }
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => {history.push(`/detail/${props.id}`)}}>
        <CardMedia
          className={classes.media}
          image={props.imageUrl}
          title="Contemplative Reptiledsadas"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className='card-title'>
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className='card-content'>
            {props.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" color='primary'>
          <FavoriteIcon />
        </IconButton>
          <IconButton aria-label="add to bookmark" color='primary' onClick={handleBookMark}>
          {isBookMark ? <span ><BookmarkIcon /></span> : <span><BookmarkBorderIcon /></span>}
        </IconButton>
      </CardActions>
    </Card>
  );
}
