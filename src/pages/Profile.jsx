import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

export default function Profile() {
  const currentUser= useSelector((state)=>state.auth.currentUser)
  return (
    <Card  sx={{ maxWidth: 450,minWidth: 300, width: "70vw", margin:"auto", display: "flex", flexDirection: "column",
    justifyContent: "space-between" }}>
      <CardMedia sx={{ marginLeft:0,
        objectFit: "scale-down",
      }}
        component="img"
        alt="User Image"
height="300"
        image="https://picsum.photos/600"
      />
      <CardContent>
        <Typography gutterBottom variant="body2" component="div">
         User Name: {currentUser.username}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          E-mail:{currentUser.email}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          First Name :{currentUser.first_name}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          Last Name: {currentUser.last_name}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          Biography: {currentUser.bio}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Home</Button>
        <Button size="small">Update</Button>
      </CardActions>
    </Card>
  );
}