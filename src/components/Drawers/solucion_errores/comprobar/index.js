import { Grid } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Content from './Content'

export default function Index({ alephoo }) {
    const [personal, setPersonal] = useState(null)
    const [usuario, setUsuario] = useState(null)
    const [asignacion, setAsignacion] = useState([])

    useEffect(() => {
        const getDatos = async (personaId) => {
            const rpta = await axios.get(`http://200.121.91.211:4001/comprobarDoctor/${personaId}`)
            setPersonal(rpta.data.personal.length === 0 ? null : rpta.data.personal[0]);
            setUsuario(rpta.data.usuario.length === 0 ? null : rpta.data.usuario[0]);
            setAsignacion(rpta.data.asignacion);
        }
        getDatos(alephoo.id)
    }, [alephoo])


    const handleClickAddPersonal = () => {
        console.log("r");
    }
    const handleClickAddUsuario = () => {
        console.log("r");
    }
    return (
        <>
            <Grid
                container
                direction="row"
                sx={{ px: 2 }}

                spacing={1}
            >
                <Grid item xs={12} lg={6} md={6}>
                    <Content objeto={
                        {
                            titulo: "Tabla personal",
                            item: personal,
                            handleClick: () => handleClickAddPersonal(),
                            mostrarTabla: false,
                            table: []
                        }
                    } />
                </Grid>
                <Grid item xs={12} lg={6} md={6}>
                    <Content objeto={{
                        titulo: "Tabla Usuario",
                        item: usuario,
                        handleClick: () => handleClickAddUsuario(),
                        mostrarTabla: false,
                        table: []
                    }} />
                </Grid>
                <Grid item xs={12} lg={12} md={12}>
                    <Content objeto={{
                        titulo: "Tabla Asignacion",
                        item: null,
                        handleClick: () => handleClickAddUsuario(),
                        mostrarTabla: true,
                        table: asignacion
                    }} />
                </Grid>
            </Grid>

        </>
    )
}
