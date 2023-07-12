import { makeStyles } from '@material-ui/core';
// import { useTheme } from '@material-ui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const useStyles = makeStyles(theme=>({
  root: {
    '& .MuiTextField-root': {},
    // 'background-color':red
  },

  form: {
    //  display: 'flex',

    //  flexWrap: 'wrap',
    //  justifyContent: 'center',
    //  height: 320,
    //  width: 600,
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: ' 0px 0px 5px #ddd',
    textAlign: 'center',
    width: '100%',
  },

  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 5,
    height: '15px',
  },

  textField: {
    margin: '0.5rem',
  },
  // userCard: {
  //   maxWidth: 345,
  //   [theme.breakpoints.down('md')]: {
  //     maxWidth: 200,
  //   },
  // },
  

  //  buttonClear: {
  //   //  marginBottom: 5,
  //    height: '25px',
  //  },
}));

export const theme = createTheme({
  components: {
    // Name of the component
    MuiAppBar: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: '#917FB3',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: '#E5BEEC',
          color: '#2A2F4F',
        },
      },
    },
  },
});
