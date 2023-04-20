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
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Button, Divider, Grid, Paper, TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DeleteModal from "../components/blog/DeleteModal";
import { useLocation } from "react-router-dom";
import { setBlog } from "../features/blogSlice";

const BlogDetail = () => {
  const { state } = useLocation()
  const myBlog = useSelector((state) => state.blog.blog)
  const { handleLike, handleComment } = useBlogCalls();
  const { currentUser } = useSelector((state) => state.auth);
  const [expanded, setExpanded] = React.useState(false);
  const [content, setContent] = React.useState("");
  const { getBlogById, getBlogWithoutUser } = useBlogCalls();
  const dispatch = useDispatch();
  console.log(state)
  useEffect(() => { 
dispatch(setBlog(state))
  }
, []);

console.log(state.id)
console.log(myBlog)


let liked = undefined;

liked = myBlog?.likes_n?.find((x) => x.user_id === currentUser?.id);

const handleExpandClick = () => {
  setExpanded(!expanded);
};


return (
  <>
    <div>BlogDetail </div>
    <Grid
      container
      direction="row"
      alignItems="stretch"
      justifyContent="space-around"
      spacing={3}
    >
      <Card sx={{ maxWidth: 600, width: "70vw", height: "100%" }}>
        <CardMedia
          sx={{
            justifyContent: "center",

            objectFit: "scale-down",
          }}
          component="img"
          height="194"
          image={myBlog?.image}
          alt="Paella dish"
        />
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              <PersonIcon />
            </Avatar>
          }
          title={myBlog?.author}
          subheader={new Date(myBlog?.publish_date).toLocaleString()}
        />

        <CardContent>
          <Typography variant="h6" color="text.secondary">
            {myBlog?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {myBlog?.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {liked !== undefined ? (
            <IconButton
              color="primary"
              onClick={() => handleLike( myBlog.id )}
              aria-label="like"
            >
              <FavoriteIcon />
              {myBlog?.likes}
            </IconButton>
          ) : (
            <IconButton onClick={() => handleLike( myBlog.id )} aria-label="like">
              <FavoriteIcon />
              {myBlog?.likes}
            </IconButton>
          )}

          <IconButton aria-label="comments" onClick={handleExpandClick}>
            <ModeCommentOutlinedIcon />
            {myBlog?.comment_count}
          </IconButton>
          <IconButton aria-label="shown">
            <VisibilityOutlinedIcon />
            {myBlog?.post_views}
          </IconButton>
          {myBlog && currentUser && myBlog.author === currentUser.username && (
  <DeleteModal id={myBlog.id} />
)}
          {/* {blog.author===currentUser.username && <UpdateModal blog={blog} />}  */}

        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
       { currentUser!==null && <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); handleComment({ id: myBlog.id, content }) }}>
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

          {myBlog?.comment_count > 0 && <h3>Comments</h3>}

          {myBlog?.comment_count > 0 &&
            myBlog?.comments
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
      </Card>{" "}
    </Grid>
  </>
);
};
export default memo(BlogDetail);