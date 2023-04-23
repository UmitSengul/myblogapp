import Modal from "@mui/material/Modal";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Button,
  CardActions,
  Container,
  CssBaseline,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import useBlogCalls from "../../hooks/useBlogCalls";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

/* function ChildModal(props) {

  const [openUpdate, setOpenUpdate] = React.useState(false);
  const handleOpen = () => {
    setOpenUpdate(true);
  };
  const handleClose = () => {
    setOpenUpdate(false);
    props.close();
  };
  console.log(props.id)





  return (
    <React.Fragment>
      <Button variant="contained" sx={{ marginRight: 1, marginLeft: "auto" }} size="small" onClick={handleOpen}>Yes I Want</Button>
      <Button variant="contained" sx={{ marginRight: 1, marginLeft: "auto" }} size="small" onClick={handleClose}>CANCEL</Button>
      <Modal
        open={openUpdate}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="child-modal-title">Are you sure?</h2>
          <Button variant="contained" sx={{ marginRight: 1, marginLeft: "auto" }} size="small" onClick={props.close}>CANCEL</Button>
          <Button variant="contained" sx={{ marginRight: 1, marginLeft: "auto" }} size="small" onClick={props.update} >Yes I Want</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
} */

export default function UpdateModal({ blog }) {
  console.log(blog);
  const { updateBlog, getCategories } = useBlogCalls();
  const categories = useSelector((state) => state.blog.categories);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      title: blog.title,
      image: blog.image,
      category: blog.category,
      status: blog.status,
      content: blog.content,
      id: blog.id,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateBlog(values);
      handleClose();
    },
  });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Button
        variant="contained"
        sx={{ marginRight: 1 }}
        size="small"
        onClick={handleOpen}
      >
        UPDATE
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Grid
          sx={{ ...style }}
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
                  Update Fucking Blog
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
                    defaultValue={blog.title}
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
                    defaultValue={blog.image}
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
                    defaultValue={blog.category}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.category && Boolean(formik.errors.category)
                    }
                    helperText={
                      formik.touched.category && formik.errors.category
                    }
                    autoFocus
                  >
                    {categories.map((x) => (
                      <MenuItem key={x.id} value={x.id}>
                        {x.name}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Select
                    margin="normal"
                    required
                    select
                    fullWidth
                    id="status"
                    name="status"
                    type="text"
                    defaultValue={blog.status}
                    label="Status"
                    onChange={formik.handleChange}
                    error={
                      formik.touched.status && Boolean(formik.errors.status)
                    }
                    helperText={formik.touched.status && formik.errors.status}
                    autoFocus
                  >
                    <MenuItem key={"d"} value={"d"}>
                      Draft
                    </MenuItem>
                    <MenuItem key={"p"} value={"p"}>
                      Published
                    </MenuItem>
                  </Select>

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="content"
                    name="content"
                    type="text"
                    defaultValue={blog.content}
                    label="Content"
                    onChange={formik.handleChange}
                    error={
                      formik.touched.content && Boolean(formik.errors.content)
                    }
                    helperText={formik.touched.content && formik.errors.content}
                    autoFocus
                    multiline
                  />

                  <CardActions
                    component="div"
                    justifyContent="space-between"
                    fullWidth
                  >
                    <Button
                      variant="contained"
                      sx={{ width: "20%", marginLeft: 10, marginRight: "auto" }}
                      size="small"
                      type="submit"
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ width: "20%", marginLeft: "auto", marginRight: 10 }}
                      size="small"
                      onClick={handleClose}
                    >
                      CANCEL
                    </Button>
                  </CardActions>
                </Box>
              </Box>
            </Container>
          </Card>{" "}
        </Grid>
      </Modal>
    </>
  );
}
