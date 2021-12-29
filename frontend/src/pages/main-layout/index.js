import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Link, Switch, useLocation, useHistory } from 'react-router-dom';
import { routes } from '../../routes';
import Settings from '../settings';
import { useDispatch, useSelector } from 'react-redux'
import ProtectedRouter from '../../routes/protectedRouter';
import Box from '@mui/material/Box';
import CustomizeAlert from '../../utils/alert';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { getSettings } from '../../actions/setting';
import { useStyles } from './style';
import Loader from '../../utils/loader';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginTop: '15vh',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#BCBCBC',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    height: '85vh',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const MainLayout = () => {
  const dispatch = useDispatch();
  const { logoUrl } = useSelector(state => state.setting)
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const handleDrawerOpen = (check) => {
    setOpen(check);
  };

  const handleMenu = () => {
    history.push("/main/settings");
  }

  React.useEffect(() => {
    dispatch(getSettings());
    // eslint-disable-next-line
}, [])

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f5f3f3' }}>
      <Loader />
      <CssBaseline />
      <AppBar position="fixed" open={open} className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            aria-label="open drawer"
            onClick={() => handleDrawerOpen(!open)}
            edge="start"
            sx={{
              marginRight: '36px',
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }} >
            <img src={logoUrl} alt="logo" className={classes.logo} />
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <SettingsIcon sx={{ fontSize: 70 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar style={{ height: '20vh' }} />
        <Divider />
        <List>
          {routes.map((route, index) => (
            <ListItem button component={Link} to={route.route} key={route.key} selected={route.route === location.pathname}>
              <ListItemIcon>
                {route.icon}
              </ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Switch>
          {routes.map(route => (
            <ProtectedRouter path={route.route} key={route.key} component={route.component} />
          ))}
          <ProtectedRouter path="/main/settings" component={Settings} />
        </Switch>
      </Box>
      <CustomizeAlert />
    </Box>
  );
}

export default MainLayout;