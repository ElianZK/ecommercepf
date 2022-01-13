import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../actions';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import s from '../assets/styles/Nav.module.css'


export default function NavMenu({isAdmin}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = useSelector(state => {
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
      <Box className={s.Box} sx={{ display: 'flex', alignItems: 'center', justifyContent:'stretch', textAlign: 'center' }}>
      <Typography sx={{ minWidth: 100 }} onClick={()=>navigate("/")} className={s.btnoptions}>Home</Typography>
        {user.idUser ?<>
          {isAdmin?<Typography sx={{ minWidth: 100 }} onClick={()=>navigate("/dashboard")} className={s.btnoptions}>Dashboard</Typography>:null}
          {/* <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
        </>:
        <>
          <Typography sx={{ minWidth: 100 }} onClick={()=>navigate("/login")} className={s.btnoptions}>Log In</Typography>
          <Typography sx={{ minWidth: 100 }} onClick={()=>navigate("/register")} className={s.btnoptions}>Register</Typography>
        </>}
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar src={user.image?user.image:null} sx={{ width: 32, height: 32 }}>{user.image?null:user.name?.charAt(0)}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
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
       {user.idUser? <MenuItem>
          <Avatar /> {user.name}
        </MenuItem>:null}
        {isAdmin?<MenuItem onClick={()=>navigate("/dashboard")} className={s.btnoptionsres}>
          <Avatar /> Dashboard
        </MenuItem>:null}
        {user.idUser?<MenuItem onClick={()=>navigate("/buyHistory")} className={s.btnoptions}>
          <ShoppingBagIcon /> My Shops
        </MenuItem>:null}
        <MenuItem onClick={()=>navigate('/profile')}>
          <Settings /> Edit Profile
        </MenuItem>
        <MenuItem onClick={() => {
                            localStorage.setItem("user", JSON.stringify({idUser: null}));
                            // vuelve null a mi byhistory
                            localStorage.setItem("byhistory", JSON.stringify(null));
                            dispatch(login({idUser: null}));
                            window.location=window.location;
                        }}>
          <Logout /> Log out
        </MenuItem>
        <Divider />
      </Menu>
    </React.Fragment>
  );
}
