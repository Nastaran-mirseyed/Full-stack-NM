import { Grid } from "@mui/material";
import CardShape from "../components/Cards";
import { useSelector } from "react-redux";

const drawerWidth = 240;

export default function UncompletedTask() {
  const { tasks } = useSelector((store) => store.task);
  return (
    <div>
      <Grid
        container
        spacing={2}
        sx={{ marginLeft: { sm: `${drawerWidth}px` }, padding: 3 }}
      >
        {tasks.map(
          (item, index) =>
            !item.completed && (
              <Grid item xs={12} sm={4} key={item.id}>
                <CardShape task={item} index={index} />
              </Grid>
            ),
        )}
      </Grid>
    </div>
  );
}
