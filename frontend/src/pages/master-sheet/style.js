import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    uploadButton: {
        border: '2px solid grey',
        width: 400,
        padding: '10 0',
        height: 100,
        textAlign: 'center',
        marginTop: 30
    },
    alignCenter: {
        textAlign: 'center'
    },
    button: {
        marginTop: '10px !important',
        borderRadius: '20px !important',
        border: '3px solid #202070 !important',
        color: 'black !important'
    },
    format: {
        fontSize: '15px !important  ',
        textAlign: 'center',
        paddingBottom: 40
    },
    tableTitle: {
        textDecoration: 'underline',
        fontSize: '40px !important',
        textAlign: 'center',
        paddingBottom: 10,
    }
})