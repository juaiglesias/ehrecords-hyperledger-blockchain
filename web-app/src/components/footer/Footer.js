import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles(theme => ({
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(6),
        },
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <Container maxWidth="md" component="footer" className={classes.footer}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Hecho con '}
                <FavoriteIcon fontSize="small" />
                {' por '}
                <Link color="inherit" target="_blank" href="https://www.linkedin.com/in/juaiglesias/">
                    Juan Iglesias
                </Link>
            </Typography>
        </Container>
    );
}