import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {allBlogs, deleteBlogById,updateBlog,setBlog,getBlogById,fetchStart,fetchFail, setCategories } from "../features/blogSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";


const useBlogCalls = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth)

  const getAllBlogs = async () => {
    try { dispatch(fetchStart());
      const { data } = await axios(
        `http://32171.fullstack.clarusway.com/api/blogs/`
      );
      dispatch(allBlogs(data));
      toastSuccessNotify("Get All Blogs");
    } catch (error) {
      toastErrorNotify("Coudnt get all blogs");
      console.log(error);
      dispatch(fetchFail())
    }
  };

  const getBlogWithoutUser = async (id) => {
    try { dispatch(fetchStart());
      const { data } = await axios(
        `http://32171.fullstack.clarusway.com/api/blogs/`
      );
      console.log(data)
      console.log(id)
      const blg = data.filter((x) => x.id === id);
      console.log(blg[0])
      dispatch(setBlog(blg[0]));

      toastSuccessNotify("Get Blog without user");
    } catch (error) {
      toastErrorNotify("Coudnt get blog without user");
      console.log(error);
      dispatch(fetchFail())
    }
  };

  const getBlogById = async (id) => {
    try { dispatch(fetchStart());
      const { data } = await axios(
        `http://32171.fullstack.clarusway.com/api/blogs/${id}`,
     { headers: { Authorization: `Token ${token}` } }
      );
      dispatch(setBlog(data));
      toastSuccessNotify("Get Blog By Id");
    } catch (error) {
      toastErrorNotify("Coudnt get blog by ıd");
      console.log(error);
      dispatch(fetchFail())
    }
  };


  const addBlog = async (values) => {
    try {dispatch(fetchStart());
      const { data } = await axios.post(
        `http://32171.fullstack.clarusway.com/api/blogs/`,
        values,
        { headers: { Authorization: `Token ${token}` } }
      );
      dispatch(setBlog(data));
      toastSuccessNotify("New Blog Added");
      navigate("/");
      console.log(data);
    } catch (error) {
      toastErrorNotify("New Blog couldnt Add");
      console.log(error);
      dispatch(fetchFail())
    }
  };


  const deleteBlog = async (id) => {
    try {  dispatch(fetchStart());
       await axios.delete(
        `http://32171.fullstack.clarusway.com/api/blogs/${id}`,
        { headers: { Authorization: `Token ${token}` } }
      );
      dispatch(deleteBlogById(id));
      toastSuccessNotify("Blog Deleted");
      navigate("/");
  
    } catch (error) {
      toastErrorNotify("Blog couldnt delete");
      console.log(error);
    }
  };


  const updateBlog = async (id, values) => {
    try {   dispatch(fetchStart());
      const { data } = await axios.put(
        `http://32171.fullstack.clarusway.com/api/blogs/${id}`,{values},
     { headers: { Authorization: `Token ${token}` } }
      );

      dispatch(updateBlog(id,data));
   
      toastSuccessNotify("Blog Updated");
  
    } catch (error) {
      toastErrorNotify("Blog couldnt delete");
      console.log(error);
      navigate("/");
    }
  };


  const handleLike = async (id) => {
    console.log(id)
    if (currentUser) {
    try {
      await axios.post(
        `http://32171.fullstack.clarusway.com/api/likes/${id}/`,
        {},
        { headers: { Authorization: `Token ${token}` } }
      );

      toastSuccessNotify("Blog liked");
      getAllBlogs();
  getBlogById(id);
    } catch (error) {
      toastErrorNotify("Coudnt refresh blog");
      console.log(error);
    }
  }else {   toastErrorNotify("Login First") }
}
;


  const handleComment = async ({content,id}) => {

     try {
      await axios.post(
        `http://32171.fullstack.clarusway.com/api/comments/${id}/`,
        { content: content, post: id },
        { headers: { Authorization: `Token ${token}` } }
      );

      toastSuccessNotify("Blog Commented");
      getBlogById(id,token);
      toastSuccessNotify("Get Blog By Id");
    } catch (error) {
      toastErrorNotify("Coudnt refresh blog");
      console.log(error);
    }
  };


  const getCategories = async () => {
    try { dispatch(fetchStart());
      const { data } = await axios(
        "http://32171.fullstack.clarusway.com/api/categories/",
      );
      dispatch(setCategories(data));
      toastSuccessNotify("Get Categories");
    } catch (error) {
      toastErrorNotify("Coudnt get categories");
      console.log(error);
      dispatch(fetchFail())
    }
  };

  return { getAllBlogs,getBlogById,getCategories, addBlog,deleteBlog,updateBlog,handleLike,handleComment,getBlogWithoutUser };
};

export default useBlogCalls;