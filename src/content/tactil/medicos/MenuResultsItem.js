import { useRef, useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import useAuthLayout from 'src/hooks/useAuthLayout'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios';

export default function MenuResultsItem({ job }) {
    const { especialidad, mostrarComponent } = useAuthLayout()

    const actionRef1 = useRef(null);
    const [openPeriod, setOpenMenuPeriod] = useState(false);


    const handleClick = async (_, object) => {
        setOpenMenuPeriod(false)
        let tmp = []
        const response2 = await axios.post(`http://apis-vesalio.com.pe/datosAgendaAll`, { idEspecialidad: null, idPersonal: object.documento, tipo: '02' })
        if (response2.status === 200) {
            tmp = response2.data.asignacionDatos
        }
    }

    return (
        <>
            <Button
                size="small"
                fullWidth
                variant="outlined"
                ref={actionRef1}
                endIcon={<ArrowDropDownIcon />}
                onClick={() => setOpenMenuPeriod(true)}>
                {'Seleccionar'}
            </Button>
            <Menu
                disableScrollLock
                anchorEl={actionRef1.current}
                onClose={() => setOpenMenuPeriod(false)}
                open={openPeriod}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                {job.especialidades.map((_period) => (
                    <MenuItem
                        key={_period}
                        onClick={() => handleClick(_period, job)}
                    >
                        {especialidad.find(x => x.id_especialidad === _period).epecialidad}
                    </MenuItem>
                ))}
            </Menu>
        </>

    )
}
