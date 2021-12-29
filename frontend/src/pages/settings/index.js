import React, {useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSettings } from '../../actions/setting';
import { Button, Grid, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import { WELCOME_TEXT } from '../../actions/type';
import { useStyles } from './style';
import { setting } from '../../actions/setting';

const Settings = () => {
    const dispatch = useDispatch();
    const [image, setImage] = useState('');
    const [preview, setPreview] = useState();
    const fileInputRef = useRef();
    const { logoUrl, welcomeText } = useSelector(state => state.setting)
    const classes = useStyles();

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview(null)
        }
        // eslint-disable-next-line
    }, [image]);

    useEffect(() => {
        setPreview(logoUrl);
        // eslint-disable-next-line
    }, [logoUrl])

    useEffect(() => {
        dispatch(getSettings());
        // eslint-disable-next-line
    }, [])

    const handleFile = (event) => {
        const file = event.target.files[0];
        if (file && file.type.substr(0, 5) === "image") {
            setImage(file);
        } else {
            setImage(null);
        }
    }

    const handleChange = (e) => {
        dispatch({ type: WELCOME_TEXT, payload: e.target.value});
    }

    const handleAccept = () => {
        var formData = new FormData();
        formData.append('logoUrl', image);
        formData.append('welcomeText', welcomeText)
        dispatch(setting(formData));
    }

    return (
        <Grid container justifyContent="center" direction="column" alignItems="center">
            <Typography className={classes.title}>settings</Typography>
            <TextField id="outlined-basic" label="Welcome text" variant="outlined" onChange={handleChange} value={welcomeText} className={classes.inputStyle}/>
            <img src={preview} alt={"preview"} className={classes.imageStyle} />
            <Button
                className={classes.buttonStyle}
                variant="contained"
                startIcon={<CloudUploadIcon />}
                onClick={(event) => {
                    event.preventDefault();
                    fileInputRef.current.click();
                }}
            >
                upload logo
            </Button>
            <input type="file" style={{ display: "none" }}
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFile}
            />
            <Button variant="contained" color="success" className={classes.accept} onClick={handleAccept}>Accept</Button>
    
        </Grid>
    )
}

export default Settings
