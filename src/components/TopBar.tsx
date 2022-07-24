import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function TopBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link style={{  color: 'inherit', textDecoration: 'inherit', flexGrow: 1}} to="/">
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            POWERGRID BILL UTILITY
                        </Typography>
                    </Link>
                    <Button color="inherit" href="/load">Load</Button>
                    <Button color="inherit" href="/links">Network</Button>
                    <Button color="inherit" href="/bills">Bill Items</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
