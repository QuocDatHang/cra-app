import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import { AppBar, Box, Button, Grid, Stack, Toolbar, Typography } from '@mui/material'


export default function Test() {
    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h3' sx={{ flexGrow: 1 }}>
                        LOGO
                    </Typography>
                    <Button color='error' >Sign-in</Button>
                    <Button color='inherit'>Sign-up</Button>
                </Toolbar>
            </AppBar>
            <Grid container sx={{display: 'flex', justifyContent: 'space-between'}} p={2} >
                <Grid xs={4} p={2} align='right' sx={{ backgroundColor: 'green', border: 1, borderColor: 'primary.main' }}>
                    <Typography paragraph={true}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis praesentium sed fugit, atque doloremque a nihil explicabo
                        fugiat sequi delectus ad ipsam laudantium eius eligendi consequatur ullam illo maiores aperiam!</Typography>
                </Grid>
                <Grid xs={8} p={2} align='center' sx={{ border: 1, borderColor: 'grey.500' }}>
                    <Typography variant='subtitle2' >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis praesentium sed fugit, atque doloremque a nihil explicabo
                        fugiat sequi delectus ad ipsam laudantium eius eligendi consequatur ullam illo maiores aperiam!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis praesentium sed fugit, atque doloremque a nihil explicabo
                        fugiat sequi delectus ad ipsam laudantium eius eligendi consequatur ullam illo maiores aperiam!
                    </Typography>
                </Grid>
                <Grid xs={5} p={2} align='justify' sx={{backgroundColor: 'pink', border: 1, borderColor: 'error.main' }}>
                    <Typography paragraph={true}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis praesentium sed fugit, atque doloremque a nihil explicabo
                        fugiat sequi delectus ad ipsam laudantium eius eligendi consequatur ullam illo maiores aperiam!</Typography>
                </Grid>
                <Grid xs={3} p={2} align='justify' sx={{ border: 1, borderColor: 'secondary.main' }}>
                    <Typography paragraph={true}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis praesentium sed fugit, atque doloremque a nihil explicabo
                        fugiat sequi delectus ad ipsam laudantium eius eligendi consequatur ullam illo maiores aperiam!</Typography>
                </Grid>
                <Grid xs={4} p={2} align='justify' sx={{ border: 1, borderColor: 'text.primary' }}>
                    <Typography paragraph={true}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis praesentium sed fugit, atque doloremque a nihil explicabo
                        fugiat sequi delectus ad ipsam laudantium eius eligendi consequatur ullam illo maiores aperiam!</Typography>
                </Grid>
            </Grid>
            <Box mt={5} mx={75}>
                <Typography variant='h1' gutterBottom>
                    MUI-5-App
                </Typography>
                <Typography variant='h4' gutterBottom >
                    MUI-5-App
                </Typography>
                <Typography variant='subtitle2' align='justify'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis praesentium sed fugit, atque doloremque a nihil explicabo
                    fugiat sequi delectus ad ipsam laudantium eius eligendi consequatur ullam illo maiores aperiam!
                </Typography>
            </Box>

            <Stack direction='row' spacing={5} paddingTop={10} marginLeft={75}>
                <Button variant='text'>Click me</Button>
                <Button variant='contained' startIcon={<SendIcon />}>Contained</Button>
                <Button variant='outlined' startIcon={<DeleteIcon />}>Outlined</Button>
                <Button variant='disabled'>Disabled</Button>
            </Stack>
        </>
    )
}