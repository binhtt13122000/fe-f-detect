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
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "src/axios";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"CREATE" | "UPDATE">("CREATE");
  const [name, setName] = useState("");
  const [trainURL, setTrainURL] = useState("");
  const [rooms, setRooms] = useState([]);
  const [id, setId] = useState("");

  const removeTrainURL = async () => {
    await axios.put(
      "api/v1/room/update-room?email=" +
        JSON.parse(LocalStorageUtil.getUser()).sub,
      {
        name: name,
        trainURL: "",
        id: id,
      }
    );
    window.location.reload();
  };
  const deleteRow = async (roomId: string) => {
    await axios.delete(
      "api/v1/room/delete-room/" +
        roomId +
        "?email=" +
        JSON.parse(LocalStorageUtil.getUser()).sub
    );
    window.location.reload();
  };
  const handle = async () => {
    if (type === "CREATE") {
      await axios.post("api/v1/room/create-room", {
        name: name,
        email: JSON.parse(LocalStorageUtil.getUser()).sub,
      });
      window.location.reload();
    } else {
      await axios.put(
        "api/v1/room/update-room?email=" +
          JSON.parse(LocalStorageUtil.getUser()).sub,
        {
          name: name,
          trainURL: trainURL,
          id: id,
        }
      );
      window.location.reload();
    }
    setOpen(false);
    setName("");
    setTrainURL("");
    setId("");
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `api/v1/room/list-room?email=${
          JSON.parse(LocalStorageUtil.getUser()).sub
        }`
      );
      if (response.status === 200) {
        setRooms(response.data);
      }
    };
    fetch();
  }, []);

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
              required
            />
            <Box sx={{ height: 10 }}></Box>
            {type === "UPDATE" && (
              <TextField
                fullWidth
                label="Train URL"
                required
                onChange={(e) => setTrainURL(e.target.value)}
                value={trainURL}
              />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button
            onClick={() => handle()}
            disabled={name === ""}
            autoFocus
          >
            Thực hiện
          </Button>
          {trainURL !== "" && (
            <Button onClick={() => removeTrainURL()}>Xóa URL</Button>
          )}
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
                  <TableCell>STT</TableCell>
                  <TableCell>Tên phòng</TableCell>
                  <TableCell>TrainURL</TableCell>
                  <TableCell align="right">Số hình ảnh</TableCell>
                  <TableCell align="right">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rooms?.map((row, index) => (
                  <TableRow
                    key={(row as any).name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell component="th" scope="row">
                      <Link to={`/rooms/${(row as any)["_id"]["$oid"]}`}>
                        {(row as any).name}
                      </Link>
                    </TableCell>
                    <TableCell>{(row as any)?.trainURL || ""}</TableCell>
                    <TableCell align="right">
                      {(row as any)?.total || 0}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title={"Chỉnh sửa"}>
                        <IconButton
                          size="large"
                          onClick={() => {
                            setOpen(true);
                            setName((row as any)?.name || "");
                            setTrainURL((row as any)?.trainURL || "");
                            setType("UPDATE");
                            setId((row as any)["_id"]["$oid"]);
                          }}
                        >
                          <ModeEdit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={"Xóa"}>
                        <IconButton
                          size="large"
                          onClick={() => {
                            deleteRow((row as any)["_id"]["$oid"]);
                          }}
                        >
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
