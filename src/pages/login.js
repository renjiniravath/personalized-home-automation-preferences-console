import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function Login({handleLogin}) {

  const [usernameInput, setUsernameInput] = useState('');

    const onLogin = () => {
        handleLogin(usernameInput)
    }

    const onUsernameChange = (event) => {
        setUsernameInput(event.target.value)
    }

    return (
        <main sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
            }}>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    height: "100vh"
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Enter username" variant="outlined" value={usernameInput} onChange={onUsernameChange}/>
                <Button variant="contained" onClick={onLogin}>Login</Button>
            </Box>
        </main>
    )
}