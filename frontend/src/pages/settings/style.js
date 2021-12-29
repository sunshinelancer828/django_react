import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    imageStyle: {
        width: 600,
        height: 200,
        cursor: 'pointer',
        marginTop: 30,
        border: '1px dotted #bcbcbc',
        borderRadius: '10px 10px 0 0'
    },
    inputStyle: {
        width: 600
    },
    buttonStyle: {
        width: 600,
        backgroundColor: '#bcbcbc !important'
    },
    title: {
        textDecoration: 'underline',
        fontSize: '40px !important',
        textAlign: 'center',
        paddingBottom: 10,
    },
    mt30: {
        marginTop: 30,
        marginBottom: 30
    },
    accept: {
        marginTop: '50px !important'
    }
})