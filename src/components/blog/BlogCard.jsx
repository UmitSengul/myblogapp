import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from 'react-router-dom';
import useBlogCalls from '../../hooks/useBlogCalls';

const BlogCard = ({ blog, menu }) => {
  const navigate = useNavigate();
  blog === null && navigate("/")

  const { currentUser } = useSelector((state) => state.auth);

  const { handleLike, handleComment } = useBlogCalls();
  console.log("blogcard")

  let liked = blog.likes_n?.find(x => x.user_id === currentUser?.id)

  return (
    <Card sx={{ maxWidth: 345, height: '100%' }}>
      <CardMedia sx={{
        justifyContent: "center",

        objectFit: "scale-down",
      }}
        component="img"
        height="194"
        image={blog?.image}
        alt="Paella dish"
      />
      <CardHeader 
        avatar={
          <Avatar onClick={(e) => {navigate(`/blog/author/${blog.author}`)}}  sx={{ bgcolor: "transparent" }}  aria-label="recipe">
      <IconButton color="primary" aria-label="upload picture" component="label">
      <PersonIcon />
    </IconButton>  
          </Avatar>
        }

        title={blog.author}
        subheader={new Date(blog.publish_date).toLocaleString()}
        
      >      </CardHeader>

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {blog.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing >
        {liked !== undefined ? (
          <IconButton
            color="secondary"
            onClick={() => handleLike(blog.id)} aria-label="like">
            <FavoriteIcon />
            {blog.likes}
          </IconButton>
        ) : (
          <IconButton
            onClick={() => handleLike(blog.id)} aria-label="like"
          >
            <FavoriteIcon />
            {blog.likes}
          </IconButton>
        )}

        <IconButton aria-label="comments" >
          <ModeCommentOutlinedIcon />
          {blog.comment_count}
        </IconButton>
        <IconButton aria-label="shown">
          <VisibilityOutlinedIcon />
          {blog.post_views}
        </IconButton>
        {menu === "myblog" ? <Button variant="contained" sx={{ marginRight: 1, marginLeft: "auto" }} size="small"
          onClick={() => navigate(`${blog.id}`, { state: blog })} >
          Edit Blog</Button> :
          <Button variant="contained" sx={{ marginRight: 1, marginLeft: "auto" }} size="small"
            onClick={() => navigate(`blog/${blog.id}`, { state: blog })} >
            Read More</Button>}


      </CardActions>
    </Card>
  );
}
export default BlogCard