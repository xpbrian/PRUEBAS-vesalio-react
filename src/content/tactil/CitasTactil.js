import { Box, Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import CardComentarios from './CardComentarios'
import CalendarioAgenda from './Calendario'

export default function CitasVesalio({ lista, agignacionSelecteds, setAsignacionSelecteds, agignacion, handleVolver }) {

    const [tabs] = useState([{ value: '02', label: 'Por medico', active: true }])
    const [mostrar] = useState(false)

    const [paciente, setPaciente] = useState()

    useEffect(() => {
        setPaciente(lista)
        setPaciente(paciente)
    }, [lista])

    const getDatosMedicoSelected = async () => {
        console.log("d");
    }

    const [sig, setSig] = useState(false)

    const verSacarCita = () => {
        setSig(true)
    }

    return (
        <>
            <Helmet>
                <title>Lista de doctores</title>
            </Helmet>
            <Grid
                sx={{
                    px: { xs: 0, md: 4 },
                    py: 2
                }}
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={4}
            >
                {
                    mostrar && <Grid style={{ display: "none" }} item lg={4}>
                        <CardComentarios getDatosMedicoSelected={getDatosMedicoSelected} setAsignacionSelecteds={setAsignacionSelecteds} agignacion={agignacion} />
                    </Grid>
                }

                {
                    !sig ?
                        <Grid item lg={8}>
                            <CalendarioAgenda verSacarCita={verSacarCita} tipo={tabs.find(x => x.active).value} agignacionSelecteds={agignacionSelecteds} lista={lista} />
                            <Button onClick={() => handleVolver()} variant="contained">
                                Volver
                            </Button>
                        </Grid>
                        :
                        <Box>
                            Holas5
                        </Box>

                }


            </Grid>

        </>
    )
}

