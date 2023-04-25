import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MuiInput from '@mui/material/Input';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function PreferencesModal({ isOpen, close, type, preferences, editPreferences, requestPreferences, usernames }) {

    const modalItems = {
        editPreferences: {
            displayHeader: "Edit your preferences",
            confirm: editPreferences
        },
        requestPreferences: {
            displayHeader: "Request preferences",
            confirm: requestPreferences
        }
    }

    const [temperature, setTemperature] = useState(50);
    const [lightColor, setLightColor] = useState("White")
    const [lightBrightness, setLightBrightness] = useState(50);
    const [humidity, setHumidity] = useState(50);
    const [fanSpeed, setFanSpeed] = useState(4)

    useEffect(() => {
        setTemperature(preferences.temperatureInF || 50)
        setLightColor(preferences.lightColor || "White")
        setLightBrightness(preferences.lightBrightness || 50)
        setHumidity(preferences.humidity || 50)
        setFanSpeed(preferences.fanSpeed || 4)
    }, [preferences.temperatureInF, preferences.lightColor, preferences.lightBrightness, preferences.humidity, preferences.fanSpeed])

    const handleSliderChange = (newValue, setFunction) => {
        setFunction(newValue);
    };

    const handleInputChange = (event, setFunction) => {
        setFunction(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleSelectInputChange = (event, setFunction) => {
        setFunction(event.target.value)
    }

    const handleBlurBrightness = () => {
        if (lightBrightness < 0) {
            setLightBrightness(0);
        } else if (lightBrightness > 100) {
            setLightBrightness(100);
        }
    };

    const handleBlurHumidity = () => {
        if (humidity < 30) {
            setHumidity(30);
        } else if (humidity > 70) {
            setHumidity(70);
        }
    }

    const handleBlurTemperature = () => {
        if (temperature < 50) {
            setTemperature(50);
        } else if (temperature > 90) {
            temperature(90);
        }
    }

    const submit = () => {
        const updatedPreferences = {
            temperatureInF: temperature,
            lightBrightness,
            lightColor,
            humidity,
            fanSpeed
        }
        modalItems[type].confirm(updatedPreferences, usernames)
    }

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {modalItems[type].displayHeader}
                    </Typography>
                    <Typography id="input-slider" sx={{ mt: 2 }} gutterBottom>
                        Temperature
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                            <Slider
                                value={temperature}
                                onChange={(event, newValue) => { handleSliderChange(newValue, setTemperature) }}
                                aria-labelledby="input-slider"
                                min={50}
                                max={90}
                            />
                        </Grid>
                        <Grid item>
                            <Input
                                value={temperature}
                                size="small"
                                onChange={(event) => { handleInputChange(event, setTemperature) }}
                                onBlur={handleBlurTemperature}
                                inputProps={{
                                    step: 10,
                                    min: 50,
                                    max: 90,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                            />
                        </Grid>
                    </Grid>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Light Color</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={lightColor}
                            label="Light Color"
                            onChange={(event) => { handleSelectInputChange(event, setLightColor) }}
                        >
                            <MenuItem value={"White"}>White</MenuItem>
                            <MenuItem value={"Red"}>Red</MenuItem>
                            <MenuItem value={"Blue"}>Blue</MenuItem>
                            <MenuItem value={"Green"}>Green</MenuItem>
                            <MenuItem value={"Yellow"}>Yellow</MenuItem>
                            <MenuItem value={"Magenta"}>Magenta</MenuItem>
                            <MenuItem value={"Cyan"}>Cyan</MenuItem>
                        </Select>
                    </FormControl>

                    <Typography id="input-slider" sx={{ mt: 2 }} gutterBottom>
                        Light Brightness
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                            <Slider
                                value={lightBrightness}
                                onChange={(event, newValue) => { handleSliderChange(newValue, setLightBrightness) }}
                                aria-labelledby="input-slider"
                            />
                        </Grid>
                        <Grid item>
                            <Input
                                value={lightBrightness}
                                size="small"
                                onChange={(event) => { handleInputChange(event, setLightBrightness) }}
                                onBlur={handleBlurBrightness}
                                inputProps={{
                                    step: 10,
                                    min: 0,
                                    max: 100,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Typography id="input-slider" sx={{ mt: 2 }} gutterBottom>
                        Humidity
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                            <Slider
                                value={humidity}
                                onChange={(event, newValue) => { handleSliderChange(newValue, setHumidity) }}
                                aria-labelledby="input-slider"
                                min={30}
                                max={70}
                            />
                        </Grid>
                        <Grid item>
                            <Input
                                value={humidity}
                                size="small"
                                onChange={(event) => { handleInputChange(event, setHumidity) }}
                                onBlur={handleBlurHumidity}
                                inputProps={{
                                    step: 30,
                                    min: 0,
                                    max: 70,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Typography id="input-slider" sx={{ mt: 2 }} gutterBottom>
                        Fan Speed
                    </Typography>
                    <Slider
                        value={fanSpeed}
                        onChange={(event, newValue) => { handleSliderChange(newValue, setFanSpeed) }}
                        aria-label="Fan Speed"
                        step={1}
                        marks
                        min={0}
                        max={5}
                    />
                    <Button size="large" onClick={submit}>Confirm</Button>
                </Box>
            </Modal>
        </div>
    );
}