import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteModal, EditTaskModal } from "./TaskForms.jsx";
import { useDispatch, useSelector } from "react-redux";
import { togglecompleted, toggleimportant } from "../redux/slices/taskSlice.js";
import { useState } from "react";

export default function CardShape({ task, index }) {
  const directoryTitle = useSelector(
    (state) =>
      state.directories.directory.find((d) => d.id === task.directoryId)
        ?.title || "",
  );

  const [openEditModal, setOpenModalEdit] = useState(false);
  const [openDeleteModal, setOpenModalDelte] = useState(false);
  const [sendtask, setSendtask] = useState();
  // console.log(task);

  const handleOpenDelete = () => setOpenModalDelte(true);
  const handleCloseDelete = () => setOpenModalDelte(false);

  const dispatch = useDispatch();

  const handleCompletedButton = (id) => {
    dispatch(togglecompleted({ id: id }));
    // console.log(id);
  };
  const handleStarButton = (id) => {
    dispatch(toggleimportant({ id: id }));
    // console.log(id);
  };

  const handleCloseEdit = () => setOpenModalEdit(false);

  const handleOpenEditModal = (task) => {
    setSendtask(task);
    setOpenModalEdit(true);
  };

  return (
    <Container>
      <Chip
        label={directoryTitle}
        sx={{ background: "#ef9a9a", color: "#b71c1c" }}
      />
      <Card
        sx={{
          background: index === 0 ? "#673ab7" : "white",
          color: index === 0 ? "white" : "black",
          maxWidth: 250,
        }}
        variant="outlined"
      >
        <CardContent>
          <Box sx={{ paddingBottom: 5 }}>
            <Typography variant="h6">{task.title}</Typography>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 12 }}
            >
              {task.description}
            </Typography>
          </Box>

          <Typography
            fontSize={"small"}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <IconButton size="small">
              <CalendarMonthIcon
                sx={{
                  fontSize: "medium",
                  color: index === 0 ? "white" : "black",
                }}
              />
            </IconButton>
            {task.date}
          </Typography>
        </CardContent>

        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Chip
            clickable
            onClick={() => handleCompletedButton(task.id)}
            label={task.completed ? "Completed" : "Uncompleted"}
            sx={
              task.completed
                ? { background: "#9ccc65", fontSize: "10px" }
                : { background: "#ffb74d", fontSize: "10px" }
            }
            size="small"
          />

          <Box sx={{ display: "flex" }}>
            <IconButton variant="outlined" onClick={handleOpenDelete}>
              <DeleteIcon sx={{ color: index === 0 ? "white" : "black" }} />
            </IconButton>

            <IconButton onClick={() => handleStarButton(task.id)}>
              <StarIcon
                sx={
                  task.important
                    ? { color: "#e53935" }
                    : { color: index === 0 ? "white" : "black" }
                }
              />
            </IconButton>

            <IconButton onClick={() => handleOpenEditModal(task)}>
              <MoreVertIcon sx={{ color: index === 0 ? "white" : "black" }} />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
      <EditTaskModal
        modal={openEditModal}
        handleClosing={handleCloseEdit}
        task={sendtask}
      />
      <DeleteModal
        handleClose={handleCloseDelete}
        state={openDeleteModal}
        taskId={task.id}
      />
    </Container>
  );
}
