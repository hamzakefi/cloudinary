import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, IconButton, Input, InputAdornment, InputLabel,Button} from '@mui/material';
import { updatePassword } from '../../JS/Actions/user';

const UpdatePassword = () => {

  const navigate = useNavigate() ;

  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const match = useMatch("/updatepassword/:id")

  const [newUser , setNewUser] = useState({})

  const handleChange = (e) => {
    setNewUser({...newUser , [e.target.name]:e.target.value })
  }

  const handleEdit = () => {
    dispatch (updatePassword(match.params.id , newUser ,navigate ))
  }


  return (
    <div>
      <h1>Update password</h1>
     <br/><br/>
     <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
     <InputLabel htmlFor="standard-adornment-password">Ancien mot de passe</InputLabel>
     <Input
     onChange={handleChange}
     name="oldPassword"
       id="standard-adornment-password"
       type={showPassword ? 'text' : 'password'}
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

   <br/><br/>
   <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
   <InputLabel htmlFor="standard-adornment-password">Nouveau mot de passe</InputLabel>
   <Input
   onChange={handleChange}
   name="password"
     id="standard-adornment-password"
     type={showPassword ? 'text' : 'password'}
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

 <br/><br/>
 <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
 <InputLabel htmlFor="standard-adornment-password">Confirmer nouveau mot de passe</InputLabel>
 <Input
 onChange={handleChange}
 name="confirmedpassword"
   id="standard-adornment-password"
   type={showPassword ? 'text' : 'password'}
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
<br/><br/>
<Button variant="contained" color="success" onClick={handleEdit} > Mettre à jour </Button>

    </div>
  )
}

export default UpdatePassword
