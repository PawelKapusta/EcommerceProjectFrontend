import React, {useState} from 'react';
import FormInput from "./FormInput";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PasswordControllers = ({control, register, errors, classes, setValue  }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  return (
   <div>
     <FormInput
      labelTitle="Password"
      name="password"
      control={control}
      register={register}
      errors={errors?.password}
      setValue={setValue}
      numberRows={1}
      InputProps={{
        startAdornment: (
         <InputAdornment position="start">
           <LockIcon className={classes.icon} />
         </InputAdornment>
        ),
        endAdornment: (
         <InputAdornment position="end">
           <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
           >
             {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
           </IconButton>
         </InputAdornment>
        ),
      }}
      type={showPassword ? "text" : "password"}
     />
     <FormInput
      labelTitle="Confirmed password"
      name="confirmPassword"
      control={control}
      register={register}
      errors={errors?.confirmPassword}
      setValue={setValue}
      numberRows={1}
      InputProps={{
        startAdornment: (
         <InputAdornment position="start">
           <LockIcon className={classes.icon} />
         </InputAdornment>
        ),
        endAdornment: (
         <InputAdornment position="end">
           <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
           >
             {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
           </IconButton>
         </InputAdornment>
        ),
      }}
      type={showPassword ? "text" : "password"}
     />
   </div>
  );
};

export default PasswordControllers;
