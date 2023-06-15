// import axios from 'axios';
import { Box, Button, Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
// import useAuth from 'src/hooks/useAuth';
import Checkbox from '@mui/material/Checkbox';
import useLayoutContext from 'src/hooks/useAuthLayout'

// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function HorariosDisponibles({ cita, selected }) {

    const { mostrarComponent } = useLayoutContext()
    const [turnosDisponibles, setTurnosDisponibles] = useState([])
    const [continuar, setContinuar] = useState(false)
    // const [celular, setCelular] = useState(null);

    // const { user } = useAuth()

    // const getGenerarCita = async (obj) => {
    //     const response = await axios.post(`http://apis-vesalio.com.pe/generarCitaAdminNew`, obj)
    //     return response.data;
    // }

    // getGenerarCita({
    //     id_usuario: user._id,
    //     fecha: drawerOpen.item.item.fecha_calendario.split('T')[0],---
    //     hora: horaSelected.hora,
    //     asignacion: drawerOpen.item.asignacionId,
    //     agenda: drawerOpen.item.agenda.id,

    //     datos: {
    //         doctor: itemAxios.cabecera[0],
    //         turno: drawerOpen.item.item.fecha_calendario.split('T')[0] + 'T' + horaSelected.hora,
    //         paciente: selected
    //     },
    //     celular: pacienteWsp,
    //     paciente: selected
    // })

    useEffect(() => {
        console.log(cita)
    }, [cita]);

    useEffect(() => {
        cita.lista.horas.horasDisponibles.filter(x => x.turno_tomado === false).reduce((arr, item) => {
            arr.push({
                ...item,
                activo: ''
            })
            setTurnosDisponibles(arr)
            return arr
        }, [])
    }, [cita])

    const handleChange = (e) => {
        cita.lista.horas.horasDisponibles.filter(x => x.turno_tomado === false).reduce((arr, item) => {
            arr.push({
                ...item,
                activo: false
            })
            console.log(arr)
            return arr
        }, []).reduce((arr, item) => {
            arr.push({
                ...item,
                activo: e.target.name === item.horas && true
            })
            setTurnosDisponibles(arr)
            console.log(arr)
            setContinuar(true)
            return arr
        }, [])
    };

    useEffect(() => {
        console.log(turnosDisponibles)
    }, [turnosDisponibles]);

    const handleCelular = () => {
        mostrarComponent({
            contenido: 'agregarCelular',
            estado: true,
            size: 'xs',
            item: {
                cita: cita,
                horaCita: turnosDisponibles.find(x => x.activo===true),
                paciente: selected
            }
        }, 'modalOpen')
    }

    return (
        <>
            <Card style={{ width: "715px", border: "1px solid #efefef", marginLeft: "30px", marginTop: "20px" }}>
                <Box style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
                    {

                        turnosDisponibles.map((cit, ix) =>
                            <>
                                <Card key={ix} style={{ padding: "10px", margin: "10px", width: "122px" }}>
                                    <Box style={{ display: "flex", justifyContent: "center", justifyItems: "center", alignItems: "center", alignContent: "space-between" }}>
                                        <Box>{cit.horas.split(':')[0] + ':' + cit.horas.split(':')[1]}</Box>
                                        <Box style={{ marginLeft: "15px" }}><Checkbox checked={cit.activo} onChange={(e) => handleChange(e)} name={cit.horas} /></Box>
                                    </Box>
                                </Card>
                            </>
                        )
                    }
                </Box>

            </Card>
            <Box style={{ marginTop: "10px", marginLeft: "83.5%", width: "300px" }}>
                {
                    continuar &&
                    <Button onClick={handleCelular} variant='contained'>
                        Continuar →
                    </Button>
                }
            </Box>
        </>
    )
}


