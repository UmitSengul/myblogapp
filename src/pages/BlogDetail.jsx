import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Button, Divider, Grid, Paper, TextField } from "@mui/material";
import DeleteModal from "../components/blog/DeleteModal";
import { Navigate, useLocation } from "react-router-dom";
import { setBlog } from "../features/blogSlice";
import UpdateModal from "../components/blog/UpdateModal";

const BlogDetail = () => {
  const { state } = useLocation()
  const blog = useSelector((state) => state.blog.blog)
  const { handleLike, handleComment } = useBlogCalls();
  const { currentUser } = useSelector((state) => state.auth);
  const [expanded, setExpanded] = React.useState(false);
  const [content, setContent] = React.useState("");
  const dispatch = useDispatch();
  console.log(state)
  useEffect(() => { 
dispatch(setBlog(state))
  }
, []);

console.log(blog)


let liked = undefined;

liked = blog?.likes_n?.find((x) => x.user_id === currentUser?.id);

const handleExpandClick = () => {
  setExpanded(!expanded);
};


return (
  <>

      <Card className="blogDetail" sx={{ maxWidth: 800,minWidth: 450, width: "70vw", margin:"auto", display: "flex", flexDirection: "column",
    justifyContent: "space-between" }}>
        <CardMedia
          sx={{
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
          <Avatar onClick={(e) => {Navigate(`/blog/author/${blog.author}`)}}  sx={{ bgcolor: "transparent" }}  aria-label="recipe">
      <IconButton color="primary" aria-label="upload picture" component="label">
      {/* <PersonIcon />  fotoğraf olmadığında bu render edilecek şekilde değişmeli*/}
      <Avatar alt={blog?.author} src="https://picsum.photos/200" />
    </IconButton>  
          </Avatar>
        }
          subheader={new Date(blog?.publish_date).toLocaleString()}
        />

        <CardContent>
          <Typography variant="h6" color="text.secondary">
            {blog?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {blog?.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing  sx={{ marginBottom: 1, marginTop: "auto"}}>
        
          {liked !== undefined ? (
            <IconButton
              color="primary"
              onClick={() => handleLike( blog.id )}
              aria-label="like"
            >
              <FavoriteIcon />
              {blog?.likes}
            </IconButton>
          ) : (
            <IconButton onClick={() => handleLike( blog.id )} aria-label="like">
              <FavoriteIcon />
              {blog?.likes}
            </IconButton>
          )}

          <IconButton aria-label="comments" onClick={handleExpandClick}>
            <ModeCommentOutlinedIcon />
            {blog?.comment_count}
          </IconButton>
          <IconButton aria-label="shown">
            <VisibilityOutlinedIcon />
            {blog?.post_views}
          </IconButton>
  
          {blog && currentUser && blog.author === currentUser?.username && (
  <DeleteModal id={blog?.id} />
)}
         {blog.author===currentUser?.username && <UpdateModal blog={blog} />} 

        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
       { currentUser!==null && <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); handleComment({ id: blog.id, content }) }}>
              <TextField
                id="outlined-multiline-flexible"
                label="Add a comment"
                name="content"
                multiline
                required
                style={{ width: "100%", marginBottom: "20px" }}
                maxRows={4}
                fullWidth
                onChange={(e) => setContent(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                size="small"
                variant="contained"
              >
                Add Comment
              </Button>
            </form>
          </CardContent>}

          {blog?.comment_count > 0 && <h3>Comments</h3>}

          {blog?.comment_count > 0 &&
            blog?.comments
              .slice(0)
              .reverse()
              .map((comment) => (
                <Paper key={comment.id}
                  style={{
                    padding: "5px",
                    margin: "10px 5px",
                    boxShadow: "none",
                  }}
                >
                  <Grid container wrap="nowrap" spacing={0}>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                      <h4 style={{ margin: 0, textAlign: "left" }}>
                        {comment.user}
                      </h4>
                      <p
                        style={{
                          margin: 0,
                          textAlign: "left",
                          color: "gray",
                        }}
                      >
                        {new Date(comment.time_stamp).toLocaleString()}
                      </p>
                      <p style={{ marginBottom: 3, textAlign: "left" }}>
                        {comment.content}
                      </p>
                    </Grid>
                  </Grid>
                  <Divider
                    variant="fullWidth"
                    style={{ margin: "5px 0px" }}
                  />
                </Paper>
              ))}
        </Collapse>
      </Card>

  </>
);
};
export default memo(BlogDetail);