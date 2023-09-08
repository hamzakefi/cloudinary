import React, { useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../JS/Actions/user";

const RegisterUser = () => {
  
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const isAuth = useSelector((state) => state.userReducer.isAuth);

  const [newUser, setNewUser] = useState({});

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(newUser));
  };

  return (
    <div>
      {isAuth ? (
        navigate("/")
      ) : (
        <div>
          <h1>Register</h1>

          <br />
          <br />
          <TextField
            id="standard-basic"
            label="Firstname"
            variant="standard"
            sx={{ m: 1, width: "25ch" }}
            onChange={handleChange}
            name="firstname"
          />
          <br />
          <br />
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            sx={{ m: 1, width: "25ch" }}
            onChange={handleChange}
            name="name"
          />
          <br />
          <br />
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            sx={{ m: 1, width: "25ch" }}
            onChange={handleChange}
            name="email"
          />
          <br />
          <br />
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              onChange={handleChange}
              name="password"
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <br />
          <br />
          <Button variant="contained" color="success" onClick={handleRegister}>
            {" "}
            <PersonPinIcon /> Inscription{" "}
          </Button>
        </div>
      )}
    </div>
  );
};

export default RegisterUser;
