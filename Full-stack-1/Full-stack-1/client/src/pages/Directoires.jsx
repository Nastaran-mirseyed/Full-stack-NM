import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import CardShape from "../components/Cards";

const drawerWidth = 240;

export default function Directoires() {
  const { directoiryName } = useParams();
  const { tasks } = useSelector((store) => store.task);

  const filtertasks = tasks.filter((item) => item.directory === directoiryName);
  return (
    <div>
      <Grid
        container
        spacing={2}
        sx={{ marginLeft: { sm: `${drawerWidth}px` }, padding: 3 }}
      >
        {filtertasks.map((item, index) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CardShape task={item} index={index} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
