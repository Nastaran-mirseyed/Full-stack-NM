import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useEffect } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask, removeTask } from "../redux/slices/taskSlice";
import dayjs from "dayjs";

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

export function DeleteModal({ state, handleClose, taskId }) {
  const dispatch = useDispatch();

  const handledelete = () => {
    dispatch(removeTask(taskId));
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
            onClick={handledelete}
            sx={{ background: "#673ab7", color: "white" }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export function AddTaskModal({ state, handleClose }) {
  const { directory } = useSelector((store) => store.directories);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      title: "",
      date: null,
      description: "",
      directoryId: "",
      completed: false,
      important: false,
    },
  });

  const onSubmit = (data) => {
    dispatch(addTask(data));
    // console.log(data);
    reset();
    handleClose();
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="outlined-required"
              label="Title"
              sx={{ marginBottom: 1 }}
              {...register("title", {
                required: { value: true, message: "Title is required" },
                minLength: {
                  value: 5,
                  message: "title should be more than 5 characters",
                },
                maxLength: {
                  value: 30,
                  message: "title should be less than 30 characters",
                },
              })}
              helperText={errors.title?.message}
            />

            <Controller
              name="date"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div style={{ marginBottom: "10px" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Select a Data"
                        format="DD/MM/YYYY"
                        value={
                          field.value ? dayjs(field.value, "DD/MM/YYYY") : null
                        }
                        onChange={(newDate) =>
                          field.onChange(
                            newDate ? newDate.format("DD/MM/YYYY") : null,
                          )
                        }
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {error && <FormHelperText>{error.message}</FormHelperText>}
                </div>
              )}
              rules={{ required: { value: true, message: "Date is required" } }}
            />

            <TextField
              id="outlined-required"
              label="Description(optional)"
              sx={{ marginBottom: 2 }}
              {...register("description", {
                minLength: {
                  value: 10,
                  message: "description should be more than 5 characters",
                },
                maxLength: {
                  value: 100,
                  message: "description should be less than 255 characters",
                },
              })}
              helperText={errors.description?.message}
            />

            <FormControl fullWidth sx={{ marginBottom: 1 }}>
              <InputLabel id="demo-select-small-label">Directory</InputLabel>
              <Controller
                name="directoryId"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Select
                      {...field}
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      label="Select A Directory"
                    >
                      {directory &&
                        directory.map((item) => (
                          <MenuItem value={item?.id}>{item?.title}</MenuItem>
                        ))}
                    </Select>
                    {error && <FormHelperText>{error.message}</FormHelperText>}
                  </>
                )}
                rules={{
                  required: {
                    value: true,
                    message: "Directory category is required",
                  },
                }}
              />
            </FormControl>

            <FormControl component="fieldset">
              <FormGroup>
                <Controller
                  name="important"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                      label="Mark as Important"
                    />
                  )}
                />
                <Controller
                  name="completed"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                      label="Mark as Completed"
                    />
                  )}
                />
              </FormGroup>
            </FormControl>

            <Button
              variant="contained"
              sx={{ background: "#673ab7" }}
              type="submit"
            >
              Add Task
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export function EditTaskModal({ modal, handleClosing, task }) {
  const { directory } = useSelector((store) => store.directories);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: task,
  });

  useEffect(() => {
    if (task) {
      reset({
        ...task,
      });
    }
  }, [task, reset]);

  const onSubmit = (data) => {
    dispatch(editTask({ id: task.id, ...data }));
    handleClosing();
  };

  return (
    <div>
      <Modal
        open={modal}
        onClose={handleClosing}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="outlined-required"
              label="Title"
              sx={{ marginBottom: 1 }}
              {...register("title", {
                required: { value: true, message: "Title is required" },
                minLength: {
                  value: 5,
                  message: "title should be more than 5 characters",
                },
                maxLength: {
                  value: 30,
                  message: "title should be less than 30 characters",
                },
              })}
              helperText={errors.title?.message}
            />

            <Controller
              name="date"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div style={{ marginBottom: "10px" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Select a Data"
                        format="DD/MM/YYYY"
                        value={
                          field.value ? dayjs(field.value, "DD/MM/YYYY") : null
                        }
                        onChange={(newDate) =>
                          field.onChange(
                            newDate ? newDate.format("DD/MM/YYYY") : null,
                          )
                        }
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {error && <FormHelperText>{error.message}</FormHelperText>}
                </div>
              )}
              rules={{ required: { value: true, message: "Date is required" } }}
            />

            <TextField
              id="outlined-required"
              label="description"
              sx={{ marginBottom: 2 }}
              {...register("description", {
                minLength: {
                  value: 10,
                  message: "description should be more than 5 characters",
                },
                maxLength: {
                  value: 100,
                  message: "description should be less than 255 characters",
                },
              })}
              helperText={errors.description?.message}
            />

            <FormControl fullWidth sx={{ marginBottom: 1 }}>
              <InputLabel id="demo-select-small-label">Directory</InputLabel>
              <Controller
                name="directoryId"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Select
                      {...field}
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      label="Select A Directory"
                    >
                      {directory &&
                        directory.map((item) => (
                          <MenuItem value={item?.id}>{item?.title}</MenuItem>
                        ))}
                    </Select>
                    {error && <FormHelperText>{error.message}</FormHelperText>}
                  </>
                )}
                rules={{
                  required: {
                    value: true,
                    message: "Directory category is required",
                  },
                }}
              />
            </FormControl>

            <FormControl component="fieldset">
              <FormGroup>
                <Controller
                  name="important"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                      label="Mark as Important"
                    />
                  )}
                />
                <Controller
                  name="completed"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                      label="Mark as Completed"
                    />
                  )}
                />
              </FormGroup>
            </FormControl>

            <Button
              variant="contained"
              sx={{ background: "#673ab7" }}
              type="submit"
            >
              Edit Task
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
