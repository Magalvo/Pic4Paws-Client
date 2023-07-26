import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import PetForm from '../pages/widgets/PetForm';
import { Box } from '@mui/material';
import { useState } from 'react';

export default function CreatePaws() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box style={{ overflow: 'hidden' }} p='1rem'>
          <PetForm />
        </Box>
      </Dialog>
    </div>
  );
}
