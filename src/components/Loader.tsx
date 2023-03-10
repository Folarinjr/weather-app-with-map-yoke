import sun from "../assets/sun.gif";
import { Stack } from "@mui/material";

const Loader: React.FC = () => {
  return (
    <>
      <Stack
        sx={{ marginTop: 20 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <img className="loader" src={sun} alt="loading" />
      </Stack>
    </>
  );
};

export default Loader;
