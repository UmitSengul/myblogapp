import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import useBlogCalls from '../hooks/useBlogCalls';
import { Grid } from '@mui/material';
import BlogCard from '../components/blog/BlogCard';

const MyBlogs = () => {
  const { getAllBlogs } = useBlogCalls();
  useEffect(() => {
    getAllBlogs();
  }, []);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const { allBlogs } = useSelector((state) => state.blog)
  console.log(allBlogs)


  return (<>
    <div>My Blogs</div>
    <Grid container
      direction="row"
      alignItems="stretch"
      justifyContent="space-around"
      spacing={3}
    >
      {allBlogs.filter(x => x.author === currentUser.username).map(blog => <Grid item s  >
        <BlogCard key={blog.id} blog={blog} /> </Grid>)
      }
    </Grid></>
  )
}

export default MyBlogs