import React from "react";
import "./App.css";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Header from "./Layouts/Header";
import Search from "@mui/icons-material/Search";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import TextFieldOutlined from "./Components/TextField/TextFieldOutlined";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { Config } from "./Config/config";
import SnackbarDefault from "./Components/Snackbar/SnackbarDefault";

function App() {
  const [allData, setAllData] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [department, setDepartment] = React.useState(dayjs(null));
  const [date, setDate] = React.useState("");
  const [permanent, setPermanent] = React.useState(false);
  const [fullname, setFullname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [city, setCity] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [messageSnackbar, setMessageSnackbar] = React.useState("");
  const [edit, setEdit] = React.useState(false);
  const [idDetail, setIdDetail] = React.useState(null);

  React.useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "fullname",
      headerName: "Employee Name",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email Address",
      width: 200,
    },
    {
      field: "mobile",
      headerName: "Mobile Number",
      width: 150,
    },
    {
      field: "department",
      headerName: "Department",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: params =>
        <div>
          <Button
            sx={{ mr: 1 }}
            color="success"
            variant="contained"
            onClick={() => editData(params.row.id)}
          >
            <Edit />
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => deleteData(params.row.id)}
          >
            <Delete />
          </Button>
        </div>,
    },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeDepartment = event => {
    setDepartment(event.target.value);
  };

  const handleChangeDate = newValue => {
    setDate(newValue);
  };

  const handleChangePermanent = event => {
    setPermanent(event.target.checked);
  };

  const handleChangeGender = event => {
    setGender(event.target.value);
  };

  const handleChangeName = event => {
    setFullname(event.target.value);
  };

  const handleChangeEmail = event => {
    setEmail(event.target.value);
  };

  const handleChangeMobile = event => {
    setMobile(event.target.value);
  };

  const handleChangeCity = event => {
    setCity(event.target.value);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleOpenSnackbar = message => {
    console.log(message);
    setMessageSnackbar(message);
    setOpenSnackbar(true);
  };

  const handleChangeSearch = event => {
    let text = event.target.value;
    if (text.length > 1) {
      getSearchData(text);
    } else if (text == "") {
      getData();
    }
  };

  const reset = () => {
    setDepartment("");
    setDate(null);
    setPermanent(false);
    setGender("");
    setFullname("");
    setEmail("");
    setMobile("");
    setCity("");
  };

  const store = () => {
    let d = new Date(date);
    d = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

    let body = {
      fullname,
      email,
      mobile,
      city,
      gender,
      department,
      hire_date: d,
      permanent: permanent ? 1 : 0,
    };
    axios
      .post(Config.apiUrl + "employee", body)
      .then(function(response) {
        console.log(response);
        if (response.data.success) {
          handleOpenSnackbar(response.data.message);
          reset();
          handleClose();
          getData();
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const addData = () => {
    setEdit(false);
    reset();
    handleOpen(true);
  };

  const getData = async () => {
    axios
      .get(Config.apiUrl + "employee")
      .then(function(response) {
        setAllData(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const deleteData = id => {
    axios
      .delete(Config.apiUrl + "employee/" + id)
      .then(function(response) {
        handleOpenSnackbar(response.data.message);
        getData();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const getSearchData = text => {
    axios
      .get(Config.apiUrl + "employee?name=" + text)
      .then(function(response) {
        setAllData(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const editData = id => {
    setEdit(true);
    getDetailData(id);
    setOpen(true);
  };

  const getDetailData = id => {
    axios
      .get(Config.apiUrl + "employee/" + id)
      .then(function(response) {
        if (response.data.data) {
          let val = response.data.data;
          setDepartment(val.department);
          setDate(val.hire_date);
          setPermanent(val.permanent == 1 ? true : false);
          setFullname(val.fullname);
          setEmail(val.email);
          setMobile(val.mobile);
          setCity(val.city);
          setGender(val.gender);
          setIdDetail(val.id);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const updateData = () => {
    let d = new Date(date);
    d = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

    let body = {
      fullname,
      email,
      mobile,
      city,
      gender,
      department,
      hire_date: d,
      permanent: permanent ? 1 : 0,
    };
    axios
      .put(Config.apiUrl + "employee/" + idDetail, body)
      .then(function(response) {
        console.log(response);
        if (response.data.success) {
          handleOpenSnackbar(response.data.message);
          reset();
          handleClose();
          getData();
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <div>
      <SnackbarDefault
        open={openSnackbar}
        handleClose={handleCloseSnackbar}
        message={messageSnackbar}
      />
      <Header />
      <Box sx={{ p: 3 }}>
        <Box sx={{ boxShadow: 2, p: 2 }}>
          <Grid container justifyContent={"space-between"}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Search sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                label="Search Employee"
                variant="standard"
                onChange={handleChangeSearch}
              />
            </Box>
            <Button variant="contained" onClick={addData}>
              + Add New
            </Button>
          </Grid>
        </Box>
        {allData &&
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={allData}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>}
      </Box>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="box-modal">
          <Grid sx={{ mb: 3 }}>
            <Grid container justifyContent={"space-between"}>
              <Typography variant="h6" component="h2">
                Employee Form
              </Typography>Typography
              <Button variant="contained" onClick={handleClose} color={"error"}>
                X
              </Button>
            </Grid>
          </Grid>
          <TextFieldOutlined
            onChange={handleChangeName}
            label="Full Name"
            value={fullname}
            type="text"
          />
          <TextFieldOutlined
            onChange={handleChangeEmail}
            label="Email"
            value={email}
            type="email"
          />
          <TextFieldOutlined
            onChange={handleChangeMobile}
            label="Mobile"
            value={mobile}
            type="text"
          />
          <TextFieldOutlined
            onChange={handleChangeCity}
            label="City"
            value={city}
            type="text"
          />
          <Typography sx={{ m: 1 }} variant="caption">
            Gender
          </Typography>
          {console.log(gender)}
          <RadioGroup row name="gender" sx={{ m: 1 }} value={gender}>
            <FormControlLabel
              value="female"
              control={<Radio onChange={handleChangeGender} />}
              label="Female"
            />
            <FormControlLabel
              value="male"
              control={<Radio onChange={handleChangeGender} />}
              label="Male"
            />
          </RadioGroup>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="select-department-label">Department</InputLabel>
            <Select
              labelId="select-department-label"
              id="select-department"
              value={department}
              label="Department"
              onChange={handleChangeDepartment}
            >
              <MenuItem value={"Development"}>Development</MenuItem>
              <MenuItem value={"Marketing"}>Marketing</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/DD/YYYY"
              value={date}
              onChange={handleChangeDate}
              renderInput={params => <TextField {...params} />}
            />
          </LocalizationProvider>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={permanent}
                  onChange={handleChangePermanent}
                />
              }
              label="Permanent Employee"
            />
          </FormControl>
          <Grid container>
            <Button
              sx={{ mr: 1 }}
              color="primary"
              variant="contained"
              onClick={edit ? updateData : store}
            >
              Simpan
            </Button>
            <Button color="inherit" variant="contained" onClick={reset}>
              Reset
            </Button>
          </Grid>
        </Box>
      </Modal>
      {/*End Modal */}
    </div>
  );
}

export default App;
