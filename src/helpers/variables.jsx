import *as Yup from     "yup";


export const userNavBarPages = ["Home", "My Blogs", 'New Blog', 'About'];
export const userMenuItems = ['Profile', "Admin Panel", 'Logout'];
export const visitorMenuItems = ["Register","Login"];
export const visitorNavBarPages= ['Home', 'New Blog','About' ];
export const validationSchema = Yup.object({
    email: Yup.string("Enter your e-mail")
      .email("enter a valid e-mail")
      .required("E-mail required"),
    password: Yup.string("Enter your password")
      .required("Password required")
      .min(8, "Password should be of minimum 8 characters length")
      .max(20, "Password should be of maximum 8 characters length")
      .matches(/\d+/, "Password must include at least one number")
      .matches(/[a-z]/, "Password must include at least one lowercase letter")
      .matches(/[A-Z]/, "Password must include at least one uppercase letter")
      .matches(/[!,?{}><%&$#£+-.*]+/, "Password must include at least one special character"),
  
      password2: Yup.string("Enter your password")
      .required("Password required")
      .min(8, "Password should be of minimum 8 characters length")
      .max(20, "Password should be of maximum 8 characters length")
      .matches(/\d+/, "Password must include at least one number")
      .matches(/[a-z]/, "Password must include at least one lowercase letter")
      .matches(/[A-Z]/, "Password must include at least one uppercase letter")
      .matches(/[!,?{}><%&$#£+-.*]+/, "Password must include at least one special character")
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  
      username: Yup.string("Enter your username").required("Username required").matches(/^[a-zA-Z0-9_-]+$/, "Username must only contain letters, numbers, underscores, and hyphens").min(8, "Username should be of minimum 8 characters length")
  })