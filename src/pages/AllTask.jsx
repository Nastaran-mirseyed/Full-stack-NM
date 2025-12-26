import CardShape from "../components/Cards";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router";
const drawerWidth = 240;
const sortList = [
  "Order added",
  "Earlier first",
  "Later first",
  "Completed first",
  "Uncompleted first",
];

const parseDate = (str) => {
  const [day, month, year] = str.split("/").map(Number);
  return new Date(year, month - 1, day);
};

export default function AllTask() {
  const { tasks } = useSelector((store) => store.task);
  const { sort, query } = useOutletContext();

  const filterSortLIst = sortList[sort];
  let taskSorted = [...tasks];

  switch (filterSortLIst) {
    case "Earlier first":
      taskSorted.sort((a, b) => parseDate(b.date) - parseDate(a.date));
      break;
    case "Later first":
      taskSorted.sort((a, b) => parseDate(a.date) - parseDate(b.date));
      break;
    case "Completed first":
      taskSorted = taskSorted.filter((item) => item.completed);
      break;
    case "Uncompleted first":
      taskSorted = taskSorted.filter((item) => item.completed === false);
      break;

    default:
      break;
  }

  const visibleTasks = query
    ? taskSorted.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      )
    : taskSorted;

  return (
    <div>
      <Grid
        container
        spacing={2}
        sx={{ marginLeft: { sm: `${drawerWidth}px` }, padding: 3 }}
      >
        {visibleTasks.map((item, index) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CardShape task={item} index={index} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
