import React from 'react';
// import { Link } from 'react-router-dom'
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    header: {
      backgroundColor: "#0C1F38",

    }
  }));

const Navbar = () => {
    const classes = useStyles();
    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn;
  
    const logoutHandler = () => {
      authCtx.logout();
      // optional: redirect the user
    };

    return (
        <div className={classes.root}>
        <AppBar position="static" className={classes.header}>
            <Toolbar>
            {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton> */}
            
              <Typography variant="h5" className={classes.title}>
              <Link href="/" color="inherit">
                  Janani
              </Link>
              </Typography>
            
              {!isLoggedIn && (
              <Link href="/auth" color="inherit">
                <Button color="inherit">Login</Button>
              </Link>
              )}

              {isLoggedIn && (
              <Link href="/dashboard" color="inherit">
                <Button color="inherit">Dashboard</Button>
              </Link>
              )}
              {isLoggedIn && (
              <Link href="" color="inherit">
                <Button onClick={logoutHandler} color="inherit">Logout</Button>
              </Link>
              )}

            </Toolbar>
        </AppBar>
        </div>
    );
}

export default Navbar
