import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useEffect } from 'react';
import { useState } from 'react';
import { acceptPreferenceRequest, getIndividualPreferences, getPreferenceRequests, getSharedPreferences, requestSharedPreferences, updateIndividualPreferences } from './api/preferences';
import PreferencesModal from './modal';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-scroll'
import { styled } from '@mui/material/styles';
import { getAuthorizedUsers } from './api/user';


const StyledLink = styled(Link)(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
}));

let preferencesForModal = {}
let modalType = ""
let preferencesUsernames = ""
let authorizedUsers = []

export default function Home({ handleLogout, username, flashAlert }) {

    const [individualPreferences, setIndividualPreferences] = useState({});
    const [sharedPreferences, setSharedPreferences] = useState([]);
    const [preferenceRequests, setPreferenceRequests] = useState([]);

    const [preferenceRequestAddParticipants, setPreferenceRequestAddParticipants] = useState({});

    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        populateIndividualPreferences()
        populateSharedPreferences()
        populateSharedPreferencesRequests()
        fetchAuthorizedUsers()
    }, [])

    const fetchAuthorizedUsers = async () => {
        try {
            const response = await getAuthorizedUsers()
            authorizedUsers = response.authorizedUsers.filter((user) => user !== username )
        } catch (error) {
            flashAlert("error", error.message)
        }
    }

    const handleRequestParticipantsChange = (event) => {
        setPreferenceRequestAddParticipants({
            ...preferenceRequestAddParticipants,
            [event.target.name]: event.target.checked,
        });
    };

    const populateIndividualPreferences = async () => {
        try {
            const response = await getIndividualPreferences(username)
            setIndividualPreferences(response.preferences)
        } catch (error) {
            flashAlert("error", error.message)
        }
    }

    const populateSharedPreferences = async () => {
        try {
            const response = await getSharedPreferences(username)
            setSharedPreferences(response.sharedPreferences)
        } catch (error) {
            flashAlert("error", error.message)
        }
    }

    const populateSharedPreferencesRequests = async () => {
        try {
            const response = await getPreferenceRequests(username)
            setPreferenceRequests(response.requests)
        } catch (error) {
            flashAlert("error", error.message)
        }
    }

    const editPreferences = async (preferences) => {
        try {
            await updateIndividualPreferences(username, preferences)
            closeModal()
            populateIndividualPreferences()
            flashAlert("success", "Your preferences were successfully updated")
        } catch (error) {
            flashAlert("error", error.message)
        }
    }

    const requestPreferences = async (preferences, usernames) => {
        try {
            const body = {
                requester: username,
                preferences,
            }
            await requestSharedPreferences(usernames, body)
            closeModal()
            populateSharedPreferencesRequests()
            flashAlert("success", "A request was successfully sent")
        } catch (error) {
            flashAlert("error", error.message)
        }
    }

    const acceptRequest = async (usernames) => {
        try {
            const body = {
                requester: username
            }
            await acceptPreferenceRequest(usernames, body)
            populateSharedPreferences()
            populateSharedPreferencesRequests()
            flashAlert("success", "Shared preference request accepted")
        } catch (error) {
            flashAlert("error", error.message)
        }
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    const openModal = (type, preferences, usernames) => {
        modalType = type
        preferencesForModal = preferences
        preferencesUsernames = usernames
        setModalOpen(true)
    }

    const addRequest = () => {
        if(Object.values(preferenceRequestAddParticipants).filter((checked) => checked) < 1) {
            flashAlert("error","Select atleast one user")
            return
        }
        let usersInvolved = []
        for (const user in preferenceRequestAddParticipants) {
            if(preferenceRequestAddParticipants[user]) {
                usersInvolved.push(user)
            }
        }
        usersInvolved = [username, ...usersInvolved].sort()
        openModal("requestPreferences", {}, usersInvolved.join("-"))
    }

    return (
        <main>
            {
                modalOpen &&
                <PreferencesModal isOpen={modalOpen} close={closeModal} type={modalType} preferences={preferencesForModal} editPreferences={editPreferences} usernames={preferencesUsernames} requestPreferences={requestPreferences} />
            }
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            PHA
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <div
                sx={{
                    width: "100%",
                    maxWidth: "400px",
                    margin: "0 auto",
                    padding: "20px",
                    textAlign: "center",
                }}>
                <Box
                    sx={{
                        width: "100%",
                        resize: "vertical",
                        padding: "10px",
                        paddingTop: "30px",
                        fontSize: "16px",
                        borderRadius: "4px",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h5" component="div">Hi {username}, here is your one way portal to all your device preferences managed by the Personalised Home Automation</Typography>
                    <Typography>See the settings set by you, shared between you and your housemates and incoming/outgoing requests below</Typography>
                    <Typography variant="h6" component="div" sx={{ mt: "20px" }}>Your individual preferences</Typography>
                    <Grid container spacing={2} >
                        <Grid item xs={12} sx={{ marginLeft: "20px", marginRight: "20px", mb: 2, mt: 2 }}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {username}
                                    </Typography>
                                    <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                                        Preferred Settings
                                    </Typography>
                                    <Typography sx={{ mb: 1, ml: 1 }} color="text.secondary">
                                        <>Temperature <b>{individualPreferences.temperatureInF} F</b></><br />
                                        <>Light color <b>{individualPreferences.lightColor}</b></><br />
                                        <>Light brightness <b>{individualPreferences.lightBrightness}</b></><br />
                                        <>Humidity <b>{individualPreferences.humidity}</b></><br />
                                        <>Fan Speed <b>{individualPreferences.fanSpeed}</b></><br />
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => { openModal("editPreferences", individualPreferences) }}>Edit</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                    <Typography variant="h6" component="div" sx={{ mt: "20px" }}>Your shared preferences</Typography>
                    {
                        sharedPreferences.length > 0 ?
                            sharedPreferences.map((sharedPreference) => {
                                return (
                                    <Grid container spacing={2} key={sharedPreference._id}>
                                        <Grid item xs={12} sx={{ marginLeft: "20px", marginRight: "20px", mb: 2, mt: 2 }}>
                                            <Card sx={{ minWidth: 275 }}>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        {"Shared by [ " + sharedPreference._id.split('-').join(", ") + " ]"}
                                                    </Typography>
                                                    <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                                                        Shared Preferences
                                                    </Typography>
                                                    <Typography sx={{ mb: 1, ml: 1 }} color="text.secondary">
                                                        <>Temperature <b>{sharedPreference.temperatureInF} F</b></><br />
                                                        <>Light color <b>{sharedPreference.lightColor}</b></><br />
                                                        <>Light brightness <b>{sharedPreference.lightBrightness}</b></><br />
                                                        <>Humidity <b>{sharedPreference.humidity}</b></><br />
                                                        <>Fan Speed <b>{sharedPreference.fanSpeed}</b></><br />
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small" onClick={() => { openModal("requestPreferences", sharedPreference, sharedPreference._id) }}>Request Change</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                )
                            }) :
                            <p style={{ marginBottom: "20px" }}>You do not share any preferences with any other occupants</p>
                    }
                    <StyledLink activeClass="active" to="request" spy={true} smooth={true}>Request a shared preference</StyledLink>
                    <Typography variant="h6" component="div" sx={{ mt: "20px" }}>Preference requests</Typography>
                    {
                        preferenceRequests.length > 0 ?
                            preferenceRequests.map((preferenceRequest) => {
                                return (
                                    <Grid container spacing={2} key={preferenceRequest._id}>
                                        <Grid item xs={12} sx={{ marginLeft: "20px", marginRight: "20px", mb: 2, mt: 2 }}>
                                            <Card sx={{ minWidth: 275 }}>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        {"To be shared by [ " + preferenceRequest._id.split('-').join(", ") + " ]"}
                                                    </Typography>
                                                    <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                                                        Preferences requested by {"[ " + preferenceRequest.requesters.join(", ") + " ]"}
                                                    </Typography>
                                                    <Typography sx={{ mb: 1, ml: 1 }} color="text.secondary">
                                                        <>Temperature <b>{preferenceRequest.preferences.temperatureInF} F</b></><br />
                                                        <>Light color <b>{preferenceRequest.preferences.lightColor}</b></><br />
                                                        <>Light brightness <b>{preferenceRequest.preferences.lightBrightness}</b></><br />
                                                        <>Humidity <b>{preferenceRequest.preferences.humidity}</b></><br />
                                                        <>Fan Speed <b>{preferenceRequest.preferences.fanSpeed}</b></><br />
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    {
                                                        preferenceRequest.requesters.includes(username) ?
                                                            <Button size="small" onClick={() => { openModal("requestPreferences", preferenceRequest.preferences, preferenceRequest._id) }}>Update</Button> :
                                                            <>
                                                                <Button size="small" onClick={() => { acceptRequest(preferenceRequest._id) }}>Accept</Button>
                                                                <Button size="small" onClick={() => { openModal("requestPreferences", preferenceRequest.preferences, preferenceRequest._id) }}>Request Change</Button>
                                                            </>
                                                    }
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                )
                            }) :
                            <p>You do not have any preference requests to or from any other occupants</p>
                    }
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ marginLeft: "20px", marginRight: "20px", mb: 2, mt: 2 }}>
                            <Card sx={{ minWidth: 275 }} id="request">
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Request a set of shared preferences
                                    </Typography>
                                    <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                                        Sent a request to
                                    </Typography>
                                    <FormControl
                                        required
                                        component="fieldset"
                                        sx={{ m: 3 }}
                                        variant="standard"
                                    >
                                        <FormLabel component="legend">Pick users</FormLabel>
                                        <FormGroup>
                                            {
                                                authorizedUsers.length > 0 &&
                                                authorizedUsers.map((user) => {
                                                    return (
                                                        <FormControlLabel key={user}
                                                            control={
                                                                <Checkbox checked={preferenceRequestAddParticipants[user]?true:false} onChange={handleRequestParticipantsChange} name={user} />
                                                            }
                                                            label={user}
                                                        />
                                                    )
                                                })
                                            }
                                        </FormGroup>
                                        <FormHelperText>Pick atleast one user</FormHelperText>
                                    </FormControl>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={addRequest}>Request preferences</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </main>
    )
}