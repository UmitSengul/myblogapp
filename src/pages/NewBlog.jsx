import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  MenuItem,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
  title: yup
    .string("Title cant be empty")
    .required("Title required")
    .min(8, "Title should be of minimum 8 characters length")
    .max(50, "Title should be of maximum 50 characters length"),
  image: yup
    .string("You must add an image")
    .required("You must add an image")
    .max(400, "Image should be of maximum 400 characters length"),
  category: yup
    .string("You must choose a category")
    .required("You must choose a category"),
  status: yup
    .string("You must choose  status")
    .required("You must choose  status"),
  content: yup
    .string("You must add content")
    .required("You must add content")
    .min(50, "Content should be of minimum 50characters length")
    .max(500, "Content should be of maximum 500 characters length"),
});

const NewBlog = () => {
  const { addBlog, getCategories } = useBlogCalls();
  const categories = useSelector((state) => state.blog.categories);

  useEffect(() => {
    getCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      image: "",
      category: "",
      status: "",
      content: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      addBlog(values);
    },
  });

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
        <Card
          sx={{ marginTop: 1, maxWidth: 800, width: "70vw", height: "100%" }}
        >
          <Container component="main">
            <CssBaseline />
            <Box
              sx={{
                width: "inherit",
                marginTop: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h3" variant="h4">
                New Blog
              </Typography>
              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  type="text"
                  name="title"
                  autoComplete="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                  autoFocus
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="image"
                  label="Image URL"
                  type="text"
                  id="image"
                  autoComplete="image"
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  error={formik.touched.image && Boolean(formik.errors.image)}
                  helperText={formik.touched.image && formik.errors.image}
                  autoFocus
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="category"
                  id="category"
                  label="Category"
                  type="text"
                  select
                  autoComplete="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.category && Boolean(formik.errors.category)
                  }
                  helperText={formik.touched.category && formik.errors.category}
                  autoFocus
                >
                  {categories.map((x) => (
                    <MenuItem key={x.id} value={x.id}>
                      {x.name}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  margin="normal"
                  required
                  select
                  fullWidth
                  id="status"
                  name="status"
                  type="text"
                  value={formik.values.status}
                  label="Status"
                  onChange={formik.handleChange}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  helperText={formik.touched.status && formik.errors.status}
                  autoFocus
                >
                  <MenuItem key={"d"} value={"d"}>
                    Draft
                  </MenuItem>
                  <MenuItem key={"p"} value={"p"}>
                    Published
                  </MenuItem>
                </TextField>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="content"
                  name="content"
                  type="text"
                  value={formik.values.content}
                  label="Content"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.content && Boolean(formik.errors.content)
                  }
                  helperText={formik.touched.content && formik.errors.content}
                  autoFocus
                  multiline
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add New Blog
                </Button>
              </Box>
            </Box>
          </Container>
        </Card>{" "}
      </Grid>
    </>
  );
};
export default memo(NewBlog);
