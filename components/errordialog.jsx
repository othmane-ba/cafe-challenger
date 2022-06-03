import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function Errordialog({open,onClick,header,text}) {
    
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {header}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClick} autoFocus>
          Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}