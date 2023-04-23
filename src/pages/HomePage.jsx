import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import Grid from "@mui/material/Unstable_Grid2";
import BlogCard from "../components/blog/BlogCard";

const HomePage = () => {
  const { getAllBlogs } = useBlogCalls();
  useEffect(() => {
    getAllBlogs();
  }, []);

  const { allBlogs } = useSelector((state) => state.blog);
  console.log(allBlogs);

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="stretch"
        justifyContent="space-around"
        spacing={3}
      >
        {allBlogs.map((blog) => (
          <Grid item s>
            <BlogCard key={blog.id} blog={blog} menu="HomePage" />{" "}
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HomePage;
