import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import {PersonAdd} from '@mui/icons-material/PersonAdd';
import {Settings} from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux'
import { logOut,  login } from '../actions';
import { Link, useNavigate } from 'react-router-dom'
import s from '../assets/styles/Nav.module.css'


export default function NavMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = useSelector(state => {
      console.log(state.usersReducer)
      return state.usersReducer.loginInfo.user;
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      <Typography sx={{ minWidth: 100 }} onClick={()=>navigate("/")} className={s.btnoptions}>Home</Typography>
        {user.idUser ?<>
          <Typography sx={{ minWidth: 100 }}>Menu</Typography>
          <Typography sx={{ minWidth: 100 }}>Profile</Typography>
        </>:
        <>
          <Typography sx={{ minWidth: 100 }} onClick={()=>navigate("/login")} className={s.btnoptions}>Log In</Typography>
          <Typography sx={{ minWidth: 100 }} onClick={()=>navigate("/register")} className={s.btnoptions}>Register</Typography>
        </>}
        {user.idUser?<Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar src={user.image?user.image:null} sx={{ width: 32, height: 32 }}>{user.image?null:user.name?.charAt(0)}</Avatar>
          </IconButton>
        </Tooltip>:null}
      </Box>
      {user.idUser?<Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> {user.name}
        </MenuItem>
        {user.type?<MenuItem>
          <Avatar /> Mis Compras
        </MenuItem>:null}
        <MenuItem>
          <Avatar /> Editar Perfil
        </MenuItem>
        <MenuItem onClick={() => {
                            localStorage.setItem("user", JSON.stringify({idUser: null}));
                            dispatch(login({idUser: null}));
                        }}>
          <Logout /> Cerrar Sesion
        </MenuItem>
        <Divider />
      </Menu>:null}
    </React.Fragment>
  );
}
