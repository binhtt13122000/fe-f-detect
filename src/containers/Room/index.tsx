/* eslint-disable react/jsx-no-target-blank */
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "src/axios";

const Room = () => {
  const [room, setRoom] = useState(null);
  const [images, setImages] = useState([]);
  const [labels, setLabels] = useState([]);
  const params = useParams();

  useEffect(() => {
    const get = async () => {
      const response = await axios.get(`api/v1/room/${params.id}`);
      if (response.status === 200) {
        setRoom(response.data);
        const response2 = await axios.get(
          `api/v1/detect/list-files?folderId=${response.data.imageId}`
        );
        if (response2.status === 200) {
          setImages(response2.data?.listFiles);
        }
        const response3 = await axios.get(
          `api/v1/detect/list-files?folderId=${response.data.labelId}`
        );
        if (response3.status === 200) {
          setLabels(response3.data?.listFiles);
        }
      }
    };
    get();
  }, [params]);
  if (!room) {
    return <div>not found</div>;
  }
  return (
    <Fragment>
      <Typography marginBottom={1} variant="h4">
        Phòng: {(room as any)?.name}
      </Typography>
      <Typography marginBottom={1} variant="h5">
        URL: {(room as any)?.trainURL || "Chưa có"}
      </Typography>
      <Typography marginBottom={1} variant="h6">
        Số lượng: Hình ảnh({images?.length}), Label({labels?.length}){" "}
      </Typography>
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
              {"Danh sách hình ảnh"}
            </Typography>
          </Toolbar>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>URL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {images?.map((row, index) => (
                  <TableRow
                    key={(row as any).id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell component="th" scope="row">
                      {(row as any).title || ""}
                    </TableCell>
                    <TableCell>
                      <a
                        href={(row as any).downloadLink || ""}
                        target={"_blank"}
                      >
                        {"Đường dẫn"}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
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
              {"Danh sách Label"}
            </Typography>
          </Toolbar>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>URL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {labels?.map((row, index) => (
                  <TableRow
                    key={(row as any).id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell component="th" scope="row">
                      {(row as any).title || ""}
                    </TableCell>
                    <TableCell>
                      <a
                        href={(row as any).downloadLink || ""}
                        target={"_blank"}
                      >
                        {"Đường dẫn"}
                      </a>
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

export default Room;
