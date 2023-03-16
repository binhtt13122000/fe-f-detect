import { AddBoxRounded, Delete, ModeEdit } from "@mui/icons-material";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Fragment, useState } from "react";
import axios from "src/axios";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Home = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"CREATE" | "UPDATE">("CREATE");
  const [name, setName] = useState("");
  const handle = async () => {
    if (type === "CREATE") {
      const response = await axios.post("api/v1/room/create-room", {
        name: name,
        email: JSON.parse(LocalStorageUtil.getUser()).sub
      });
      console.log(response);
    }
    setOpen(false);
    setName("");
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          {`${type === "CREATE" ? "Tạo mới" : "Chỉnh sửa"} phòng`}
        </DialogTitle>
        <Box></Box>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              fullWidth
              label="Tên phòng"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button onClick={() => handle()} autoFocus>
            Thực hiện
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ width: "100%" }}>
        <Paper
          sx={{
            mb: 2,
            overflowX: "auto",
            width: { md: "calc(100vw - (250px * 1.2))", xs: "90vw" },
          }}
        >
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
            }}
          >
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              {"Quản lí phòng"}
            </Typography>
            <Fragment>
              <Tooltip title={"Thêm mới"}>
                <IconButton
                  size="large"
                  onClick={() => {
                    setType("CREATE");
                    setOpen(true);
                  }}
                >
                  <AddBoxRounded />
                </IconButton>
              </Tooltip>
            </Fragment>
          </Toolbar>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Tên phòng</TableCell>
                  <TableCell align="right">Số hình ảnh</TableCell>
                  <TableCell align="right">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">
                      <Tooltip title={"Chỉnh sửa"}>
                        <IconButton
                          size="large"
                          onClick={() => {
                            setOpen(true);
                            setType("UPDATE");
                          }}
                        >
                          <ModeEdit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={"Xóa"}>
                        <IconButton size="large" onClick={() => {}}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Fragment>
  );
};

export default Home;
