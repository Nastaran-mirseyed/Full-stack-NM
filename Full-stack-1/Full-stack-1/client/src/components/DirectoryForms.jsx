import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  addDirectory,
  editDirectory,
  removeDirectory,
} from "../redux/slices/directorySlice";
import { Fragment, useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #673ab7",
  boxShadow: 24,
  p: 4,
};

export function CreateNewDirectory({ state, handleCloseModal }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { title: "" },
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(addDirectory(data));
    // console.log({...data});
    reset();
    handleCloseModal();
  };

  return (
    <div>
      <Modal
        open={state}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center" }}
            >
              Create a New Directory
            </Typography>

            <TextField
              id="outlined-basic"
              label="Enter a directory name"
              variant="outlined"
              {...register("title", {
                required: { value: true, message: "title is required!" },
                minLength: {
                  value: 3,
                  message: "title should be more than 3 characters",
                },
                maxLength: {
                  value: 15,
                  message: "title should be less than 15 characters",
                },
              })}
              helperText={errors.title?.message}
              fullWidth
            />
            <Button
              variant="contained"
              sx={{ background: "#673ab7", marginTop: 2 }}
              type="submit"
            >
              Create
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export function EditDirectory({ state, handleClose, directory }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: directory });

  const dispatch = useDispatch();

  useEffect(() => {
    if (directory) {
      reset({ ...directory });
    }
  }, [directory, reset]);

  const onsubmit = (data) => {
    dispatch(editDirectory({ id: directory.id, ...data }));
    handleClose();
    // console.log(data);
  };

  return (
    <div>
      <Modal
        open={state}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onsubmit)}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center" }}
            >
              Edit Directory name
            </Typography>

            <TextField
              id="outlined-basic"
              label="Edit a directory name"
              variant="outlined"
              {...register("title", {
                required: { value: true, message: "title is required!" },
                minLength: {
                  value: 3,
                  message: "title should be more than 3 characters",
                },
                maxLength: {
                  value: 15,
                  message: "title should be less than 15 characters",
                },
              })}
              helperText={errors.title?.message}
            />

            <Button
              variant="contained"
              sx={{ background: "#673ab7", marginTop: 2 }}
              type="submit"
            >
              Edit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export function DeleteDirecory({ state, handleClose, directoryID }) {
  const dispatch = useDispatch();

  const handleRemoveDirectory = () => {
    dispatch(removeDirectory(directoryID));
    handleClose();
  };

  return (
    <Fragment>
      <Dialog
        open={state}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <Typography id="alert-dialog-description">
            This task will be deleted permanently
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ background: "#673ab7", color: "white" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRemoveDirectory}
            sx={{ background: "#673ab7", color: "white" }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
