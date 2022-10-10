import React from "react";

function ModalAddEmployee(props) {
  return (
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
        <RadioGroup row name="gender" sx={{ m: 1 }}>
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
              <Checkbox checked={permanent} onChange={handleChangePermanent} />
            }
            label="Permanent Employee"
          />
        </FormControl>
        <Grid container>
          <Button
            sx={{ mr: 1 }}
            color="primary"
            variant="contained"
            onClick={store}
          >
            Simpan
          </Button>
          <Button color="inherit" variant="contained" onClick={reset}>
            Reset
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
}

export default ModalAddEmployee;
