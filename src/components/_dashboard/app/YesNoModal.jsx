import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  styled,
  Button
} from '@mui/material';
import { grey } from '@mui/material/colors';
import PropTypes from 'prop-types';

const GreyButton = styled(Button)(({ theme }) => ({
  color: grey[700],
  backgroundColor: grey[200],
  '&:hover': {
    backgroundColor: grey[300]
  },
  width: '100%'
}));

YesNoModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleAction: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  actionLoading: PropTypes.bool.isRequired
};

function YesNoModal({ open, onClose, handleAction, message, actionLoading }) {
  return (
    <Dialog
      maxWidth="lg"
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        display="flex"
        flexDirection="row"
        justifyContent="center"
        id="alert-dialog-description"
        sx={{ fontSize: { xs: '0.9rem', md: '1rem', lg: '1.1rem' } }}
      >
        توجه
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          display="flex"
          flexDirection="row"
          justifyContent="center"
          id="alert-dialog-description"
          sx={{ fontSize: { xs: '0.8rem', md: '0.9rem', lg: '1rem' } }}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        display="flex"
        flexDirection="row"
        justifyContent="center"
        id="alert-dialog-description"
        sx={{ fontSize: { xs: '0.8rem', md: '0.9rem', lg: '1rem' } }}
      >
        <GreyButton onClick={onClose}>خیر</GreyButton>
        <GreyButton sx={{ position: 'relative' }} onClick={handleAction} autoFocus>
          بله
          {actionLoading && (
            <CircularProgress sx={{ position: 'absolute', right: '25px' }} size={15} />
          )}
        </GreyButton>
      </DialogActions>
    </Dialog>
  );
}
export default YesNoModal;
