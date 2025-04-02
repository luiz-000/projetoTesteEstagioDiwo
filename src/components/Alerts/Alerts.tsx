import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

//import style from './Alerts.module.css';


function Alerts () {

    return (
        <div>
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="error"> Necessário preencher todos os campos! </Alert>
            </Stack>
        </div>
    )
}

export default Alerts
