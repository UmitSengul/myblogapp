import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import useBlogCalls from "../../hooks/useBlogCalls";
import { IconButton } from '@mui/material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal(props) {
  const { updateBlog } = useBlogCalls();
   const [openUpdate, setOpenUpdate] = React.useState(false);
  const handleOpen = () => {
    setOpenUpdate(true);
  };
  const handleClose = () => {
    setOpenUpdate(false);
    props.close();
  };
console.log(props.id)

const Update = ({values}) => {
  updateBlog(props.id)
};




  return (
    <React.Fragment>
      <Button variant="contained" sx={{ marginRight: 1, marginLeft: "auto"  }} size="small" onClick={handleOpen}>Yes I Want</Button>
      <Button variant="contained" sx={{ marginRight: 1, marginLeft: "auto"  }} size="small" onClick={handleClose}>CANCEL</Button>
      <Modal
        open={openUpdate}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="child-modal-title">Are you sure?</h2>
          <Button variant="contained" sx={{ marginRight: 1, marginLeft: "auto"  }} size="small" onClick={props.close}>CANCEL</Button>
          <Button variant="contained" sx={{ marginRight: 1, marginLeft: "auto"  }} size="small"  onClick={Update} >Yes I Want</Button>
             </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function UpdateModal({id,token}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" sx={{ marginRight: 1  }} size="small"  onClick={handleOpen}>UPDATE</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Are you want to update?</h2>
          <ChildModal id={id} token={token}close={handleClose}/>
        </Box>
      </Modal>
    </>
  );
} 