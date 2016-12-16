import { blue500, red600, darkBlack, fullBlack, grey300, grey100, white, purple500, red500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const theme = getMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: blue500,
        accent1Color: red500,
        textColor: darkBlack,
        alternateTextColor: blue500,
        canvasColor: white,
        borderColor: grey300,
        pickerHeaderColor: blue500,
        shadowColor: fullBlack,
    },
    appBar: {
        height: 50,
        color: grey100
    }
});


export default theme;