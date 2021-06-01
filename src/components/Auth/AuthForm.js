import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      borderColor: '#0C1F38'
    },
    submit: {
      color: 'white',
      margin: theme.spacing(3, 0, 2),
    },

    
  }));
  

const AuthForm = () => {
    const classes = useStyles();

  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBPrH_Hk8W9nw1_GRdH_IDx6UcJ5AllBGw';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBPrH_Hk8W9nw1_GRdH_IDx6UcJ5AllBGw';
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        history.replace('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Container component="main" maxwidth="xs">
      <CssBaseline />
      <div className="classes.paper">

    

        <Typography component="h1" variant="h5">{isLogin ? 'Login' : 'Sign Up'}</Typography>
        <form onSubmit={submitHandler} className={classes.form}>

            <TextField 
                variant="outlined"
                margin="normal"
                required
                inputRef={emailInputRef}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus 
            />

            <TextField
                variant="outlined"
                margin="normal"
                required
                inputRef={passwordInputRef}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />

            {!isLoading && (
            <Button type="submit" fullWidth variant="contained" style={{backgroundColor:'#0C1F38'}} className={classes.submit}>
                {isLogin? 'Sign In': 'Sign up'}
            </Button>
            )}
            {isLoading && <p>Sending request...</p>}
        
            
            
            <Button
                type='submit'
                className={classes.toggle}
                onClick={switchAuthModeHandler}
                fullWidth  styles={{backgroundColor:'#0C1F38'}} 
            >
                {isLogin ? 'Create new account' : 'Login with existing account'}
            </Button>
            
        </form>
       </div>
      </Container>
    
  );
};

export default AuthForm;
