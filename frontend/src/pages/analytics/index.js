import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Editable from '../../components/table';
import { Grid, Typography } from '@mui/material'
import { useStyles } from './style';
import { getAnalyticsList, detailAnalytics} from '../../actions/analytics';
import FullScreenDialog from '../../components/dialog';

const Analytics = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const data = useSelector(state => state.analytics.list);
    const options = {
        actionsColumnIndex: -1,
        tableLayout: 'auto',
    }
    useEffect(() => {
        dispatch(getAnalyticsList());
        // eslint-disable-next-line
    }, [])
    const handleChange = (event) => {
        const value = event.target.value;
        dispatch(detailAnalytics(value.analytics_id, value.format))
    };
    const editable = {}
    const fields = [
        { title: "Sl.No", field: 'no', render: (rowData) => rowData.tableData.id + 1 },
        {
            title: 'Date/Time', field: 'timestamp', render: (rowData) => {
                const date = rowData.timestamp.split(".")[0];
                return date.replace("T", " ");
            }
        },
        {
            title: 'Master Sheet', field: 'master.file', render: (rowData) => {
                const name = rowData.master.file.split("/")[3];
                return name.split(".")[0];
            }
        },
        {
            title: 'Test Sheet', field: 'testing.file', render: (rowData) => {
                const name = rowData.testing.file.split("/")[3];
                return name.split(".")[0];
            }
        },
        { title: 'Status', field: 'status', lookup: { 1: 'processed', 2: 'unprocessed' } },
        {
            title: 'Action', field: 'control', render: rowData => (
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Action</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value=""
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={{ analytics_id: rowData.id, format: 1, open: true }} name="view1">View Format-1</MenuItem>
                        <MenuItem value={{ analytics_id: rowData.id, format: 2, open: true }} name="view2">View Format-2</MenuItem>
                    </Select>
                </FormControl>
            )
        }
    ];

    return (
        <Grid>
            <FullScreenDialog/>
            <Typography variant="h3" className={classes.tableTitle}>ANALYTICS HISTORY</Typography>
            <Editable title="" data={data} columns={fields} editable={editable} options={options}></Editable>
        </Grid>
    )
}

export default Analytics;

