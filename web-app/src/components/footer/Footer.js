import clsx from 'clsx';
import { Container, makeStyles } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <Container maxWidth="sm" component="footer" className={clsx("MuiContainer--01", classes.footer)}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Hecho por '}
                <Link color="inherit" target="_blank" href="https://www.linkedin.com/in/juaiglesias/">
                    Juan Iglesias
                </Link>
            </Typography>
        </Container>
    );
}