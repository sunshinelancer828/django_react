import { Button, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Editable from '../../components/table';
import { uploadTest, getTests } from '../../actions/test'
import { useStyles } from './style';
 
const TestSheet = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const data = useSelector(state => state.test.files);
    const options = {
        actionsColumnIndex: -1,
        tableLayout: 'auto',
    }

    useEffect(() => {
        dispatch(getTests());
        // eslint-disable-next-line
    }, [])

    const editable = {
    }
    const fields = [
        { title: "Sl.No", render: (rowData) => rowData.tableData.id + 1 },
        { title: 'Master Sheet', field: 'file', render: (rowData) => {
            const name = rowData.file.split("/")[3];
            return name.split(".")[0];
        } },
        { title: 'Date/Time', field: 'timestamp', render: (rowData) => {
            const date = rowData.timestamp.split(".")[0];
            return date.replace("T", " ");
        }},
        { title: 'Status', field: 'status', lookup: { "True": 'uploaded', "False": 'part-uploaded' } },
    ];

    const handleFileChange = (e) => {
        const formData = new FormData();
        formData.append(
            'file', e.target.files[0]
        );
        dispatch(uploadTest(formData));
    }
    

    return (
        <Grid>
            <Grid container justifyContent="center">
            <Grid className={classes.uploadButton}>
                    <Typography variant="h5">Upload test sheet</Typography>
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        id="contained-button-file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="outlined" className={classes.button} component="span">
                            Click to select
                        </Button>
                    </label>
                </Grid>               
            </Grid>
            <Typography variant="h6" className={classes.format}>Download excel sheet format</Typography>
            <Typography variant="h3" className={classes.tableTitle}>TEST SHEET UPLOAD HISTORY</Typography>
            <Editable title="" data={data} columns={fields} editable={editable} options={options}></Editable>
        </Grid>
    )
}

export default TestSheet;

