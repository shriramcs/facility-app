import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';

const NewDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const NewDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export interface ModalDialogProps {
    id: string;
    open: boolean;
    children?: React.ReactNode;
    title?: string;
    closeButton?: boolean;
    mode?: string;
    refreshList?: (page: number | undefined) => void;
    onClose?: () => void;
    primaryButtonName?: string;
    primaryButtonColor?: 'success' | 'error' | 'warning';
    secondaryButtonName?: string;
    onOk?: () => void;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg'
}

const muiStyles: any = makeStyles((theme: any) => ({
  button:{
      textTransform: 'none',
      flex: 1
  },
  card: {
      '&:hover': {
          border: 'nor',
      }
  },
}));

const ModalDialog: React.FC<ModalDialogProps> = (props) => {
    const muiClasses = muiStyles();
    const {
        id,
        open,
        title,
        children,
        primaryButtonName,
        primaryButtonColor,
        secondaryButtonName,
        onOk,
        maxWidth,
        onClose
    } = props;
    const defaultPrimaryBtnName= "OK";
    const defaultSecondaryBtnName= "Cancel";

    const handleClose = () => {
        if(onClose){
            onClose();
        }
    }
    const onCloseDialog: (e: {}, reason: "escapeKeyDown" | "backdropClick") => void = (e, reason) => {
        if(reason !== 'backdropClick'){
            handleClose();
        }
    }
    const handleSaveChanges = () => {
        if(onOk) {
            onOk();
        }
    };

  return (
    <div>
        <NewDialog
            onClose={onCloseDialog}
            aria-labelledby="customized-dialog-title"
            open={open}
            id={`dialog-${id}`}
            maxWidth={maxWidth}
            fullWidth={true}
        >
            <NewDialogTitle id={`dialog-title-${id}`} onClose={handleClose}>
                {title}
            </NewDialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
            <DialogActions>
                <Button
                    variant="text"
                    className={muiClasses.button}
                    onClick={handleClose}>{secondaryButtonName || defaultSecondaryBtnName}
                </Button>
                <Button
                    variant="contained"
                    color={primaryButtonColor}
                    className={muiClasses.button}
                    onClick={handleSaveChanges}
                >{primaryButtonName || defaultPrimaryBtnName}</Button>
            </DialogActions>
        </NewDialog>
    </div>
  );
}

export default ModalDialog;