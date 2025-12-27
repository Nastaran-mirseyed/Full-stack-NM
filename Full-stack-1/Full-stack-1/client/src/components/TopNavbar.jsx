import {
  TextField,
  Button,
  Stack,
  IconButton,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import { useState } from "react";
import { useLocation } from "react-router";
import { AddTaskModal } from "./TaskForms";
import { useSelector } from "react-redux";

const sortList = [
  "Order added",
  "Earlier first",
  "Later first",
  "Completed first",
  "Uncompleted first",
];

const date = new Date();
const formatted = date.toLocaleDateString("en-GB");

const pages = [
  { href: "/", text: "AllTasks" },
  { href: "/ImportantTask", text: "ImportantTask" },
  { href: "/CompletedTask", text: "CompletedTask" },
  { href: "/UncompletedTask", text: "UncomletedTask" },
];

let taskcounter = 0;

export default function TopNavbar({ sort, setSort, menuiconclick, setQuery }) {
  const { tasks } = useSelector((store) => store.task);

  const location = useLocation();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  const activepage = pages.find((page) => page.href === location.pathname);

  switch (activepage?.href) {
    case "/":
      taskcounter = tasks.length;
      break;
    case "/ImportantTask":
      taskcounter = tasks.filter((item) => item.important).length;
      break;
    case "/CompletedTask":
      taskcounter = tasks.filter((item) => item.completed).length;
      break;
    case "/UncompletedTask":
      taskcounter = tasks.filter((item) => item.completed === false).length;
      break;
    case "/:directoiryName":
      taskcounter = tasks.length;
      break;
    default:
      taskcounter = 0;
      break;
  }

  return (
    <Container>
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={{ sm: 1, md: 3 }}
        sx={{
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        <IconButton onClick={menuiconclick} sx={{ display: { sm: "none" } }}>
          <MenuIcon />
        </IconButton>

        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          size="small"
          onChange={(e) => setQuery(e.target.value)}
        />

        <Typography>{formatted}</Typography>

        <Button
          variant="contained"
          sx={{ background: "#673ab7" }}
          onClick={handleOpen}
        >
          Add Task
        </Button>
      </Stack>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>
          {activepage?.text}({taskcounter} task)
        </Typography>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Sort by
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={sort}
            onChange={handleChange}
            label="Sort by"
          >
            {sortList.map((item, index) => (
              <MenuItem value={index}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box>
        <IconButton>
          <FormatListBulletedIcon />
        </IconButton>
        <IconButton>
          <GridViewIcon />
        </IconButton>
      </Box>

      <AddTaskModal state={open} handleClose={handleClose} />
    </Container>
  );
}
