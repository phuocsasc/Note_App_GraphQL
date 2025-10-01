import React, { useContext, useState } from 'react';
import { AuthContext } from './../context/AuthProvider';
import { Avatar, Box, Menu, MenuItem, Typography } from '@mui/material';
import { getAuth } from 'firebase/auth';

export default function UserMenu() {
    const { user } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    // console.log({ user });

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleLogout = () => {
        try {
            getAuth().signOut();
        } finally {
            setAnchorEl(null);
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex' }} onClick={handleClick}>
                <Typography>{user?.displayName}</Typography>
                <Avatar
                    alt="avatar"
                    src={user?.photoURL || ''}
                    sx={{ width: 24, height: 24, ml: '5px' }}
                />
            </Box>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
}
