import {
  Button,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router";
import Directory from "./Directory";
import { useState } from "react";
import { AddTaskModal } from "./TaskForms";

const links = [
  { href: "/", text: "AllTasks" },
  { href: "/ImportantTask", text: "ImportantTask" },
  { href: "/CompletedTask", text: "CompletedTask" },
  { href: "/UncompletedTask", text: "UncomletedTask" },
];

function Mylinks({ href, children }) {
  return (
    <NavLink
      to={href}
      style={({ isActive }) => ({
        textDecoration: "none",
        color: isActive ? "red" : "black",
      })}
    >
      {children}
    </NavLink>
  );
}

export default function SideNavbar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Stack
        direction={"column"}
        spacing={2}
        sx={{ justifyContent: "space-around", alignItems: "center" }}
      >
        <Typography sx={{ padding: "10px" }}>TO-DO-LIST</Typography>
        <Button
          variant="contained"
          sx={{ background: "#673ab7", paddingX: "4rem" }}
          onClick={handleOpen}
        >
          Add Task
        </Button>
      </Stack>

      <List>
        {links.map((link) => (
          <ListItem key={link.text}>
            <ListItemButton>
              <Mylinks href={link.href}>{link.text}</Mylinks>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem>
          <ListItemButton>
            <Directory />
          </ListItemButton>
        </ListItem>
      </List>
      <AddTaskModal state={open} handleClose={handleClose} />
    </>
  );
}
