import React, { forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    DataSheetGrid,
    textColumn,
    keyColumn,
  } from 'react-datasheet-grid'
import { saveAsExcel } from '../../utils/convert';
import { CLOSE_DIALOG } from '../../actions/type';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
    const dispatch = useDispatch();
    const { open } = useSelector(state => state.dialog)
    const data = useSelector(state => state.analytics.details);
    const columns = data.length !== 0 ? Object.keys(data[0]).reduce((arr, value) => {
        return [...arr, {
            ...keyColumn(value, textColumn),
            title: value
        }]
    }, []) : [];
    


    const download = () => {
        saveAsExcel(data)
    };

    const handleClose = () => {
        dispatch({ type: CLOSE_DIALOG })
    }

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Analytics
                        </Typography>
                        <Button autoFocus color="inherit" onClick={download} startIcon={<CloudUploadIcon />}>
                            Download
                        </Button>
                    </Toolbar>
                </AppBar>
                <Grid>
                    <DataSheetGrid
                        value={data}
                        // onChange={setData}
                        columns={columns}
                        height={900}
                    />
                </Grid>
            </Dialog>
        </div>
    );
}