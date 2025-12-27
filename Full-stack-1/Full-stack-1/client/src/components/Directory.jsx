import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import {
  CreateNewDirectory,
  DeleteDirecory,
  EditDirectory,
} from "./DirectoryForms";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";

export default function Directory() {
  const { directory } = useSelector((store) => store.directories);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [sendDirectory, setSendDirectory] = useState();
  const [openEditModal, setopenEditModal] = useState(false);
  const handleEditOpenModal = (dir) => {
    setSendDirectory(dir);
    setopenEditModal(true);
  };
  const handleEditCloseModal = () => setopenEditModal(false);

  const [deleteId, setDeleteId] = useState();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = (dir) => {
    setOpenDeleteModal(true);
    setDeleteId(dir);
  };
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const [openModal, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "black" }}
      >
        Directory
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        {directory &&
          directory.map((dir) => (
            <MenuItem
              key={dir.id}
              sx={{ display: "flex" }}
              onClick={handleClose}
            >
              <NavLink
                to={`/${dir.title}`}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "red" : "black",
                })}
              >
                {dir.title}
              </NavLink>

              <IconButton onClick={() => handleEditOpenModal(dir)}>
                <BorderColorIcon sx={{ color: "black" }} />
              </IconButton>

              <IconButton
                variant="outlined"
                onClick={() => handleOpenDeleteModal(dir.id)}
              >
                <DeleteIcon sx={{ color: "black" }} />
              </IconButton>
            </MenuItem>
          ))}
        <Button onClick={handleOpenModal}>New</Button>
      </Menu>
      <CreateNewDirectory
        handleCloseModal={handleCloseModal}
        state={openModal}
      />
      <EditDirectory
        state={openEditModal}
        handleClose={handleEditCloseModal}
        directory={sendDirectory}
      />
      <DeleteDirecory
        state={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        directoryID={deleteId}
      />
    </div>
  );
}
