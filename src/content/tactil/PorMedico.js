import { Box, Card, Chip, Divider } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import useLayoutContext from 'src/hooks/useAuthLayout';


export default function ContenidoCalendario({ item, agignacionSelecteds, paciente, verSacarCita, setCita }) {

    const [lista, setLista] = useState([])
    const [data, setData] = useState([])
    // const { mostrarComponent } = useLayoutContext()
    const [mostrar, setMostrar] = useState(null)

    useEffect(() => {
        setLista([])
        setData([])
        setMostrar(null)
    }, [])
    useEffect(() => {
        const getDatos = async (fecha, asignaciones) => {
            console.log(asignaciones)
            let response = await axios.post(`http://200.121.91.211:4001/datosCalendarioAsignacion`, {
                fecha: fecha.fecha_calendario,
                dia: fecha.dia_de_la_semana,
                asignaciones: asignaciones.reduce((arr, item) => {
                    arr.push(item.asignacion_id)
                    return arr
                }, [])
            })
            const response2 = await axios.post(`http://apis-vesalio.com.pe/datosAgendaTurnoProgramado`, {
                idAsignacion: asignaciones[0].personal_id,
                fechaCalendario: fecha.fecha_calendario.split('T')[0],
            })
            setData(response2.data)
            setLista(response.data.reduce((arr, item) => {
                arr.push({
                    ...item,
                    nombreMedico: asignaciones.find(x => x.asignacion_id === item.asignacion_id).datosDoctor,
                    mostrar: item.horas.horasDisponibles.filter(x => !x.turno_tomado).length

                })
                return arr
            }, []));

        }
        if (agignacionSelecteds.length > 0) {
            getDatos(item, agignacionSelecteds)
        }
    }, [item, agignacionSelecteds])

    useEffect(() => {
        if (lista.length > 0) {
            setMostrar({
                citados: data.turnosDatos.reduce((arr, item) => {
                    if (item.estado_turno_id === 1) {
                        arr++
                    }

                    return arr
                }, 0),
                bloqueados: data.turnosDatos.reduce((arr, item) => {
                    if (item.estado_turno_id === 7) {
                        arr++
                    }

                    return arr
                }, 0),
                disponibles: lista[0].horas.horasDisponibles.reduce((arr, item) => {
                    let exsite = data.turnosDatos.filter(x => x.hora === item.horas && x.estado_turno_id !== 3)
                    if (exsite.length === 0) {
                        arr.push(item)
                    }
                    return arr
                }, []).length

            })
        } else {
            setMostrar(null)
        }
        console.log(lista);
    }, [lista, data])


    const hanldeClick = () => {

        // mostrarComponent({
        //     contenido: 'agendaCitados',
        //     estado: true,
        //     subtitle: (item.dia_nombre + ' ' + item.dia_calendario + ' de ' + item.mes_nombre + ' del ' + item.anio_calendario),
        //     title: agignacionSelecteds[0].nombreMedico,
        //     item: {
        //         item,
        //         agenda: lista[0],
        //         personalId: agignacionSelecteds[0].personal_id,
        //         asignacionId: agignacionSelecteds[0].asignacion_id,
        //         paciente: "llegué"
        //     }
        // }, 'drawerOpen')
        console.log(lista[0])
        console.log(agignacionSelecteds[0])
        console.log(item)

        setCita({
            lista: lista[0],
            agignacionSelecteds: agignacionSelecteds[0],
            item: item
        })

        verSacarCita()


    }

    useEffect(() => {
        console.log(paciente)
    }, [paciente])


    // const generarSobreturno = (fecha) => {
    //     mostrarComponent({
    //         contenido: 'citaSobreturnoNew',
    //         title: "Sobreturno",
    //         estado: true,
    //         subtitle: '',
    //         item: { agenda: agignacionSelecteds[0].asignacion_id, fecha: fecha }
    //     }, 'drawerOpen')
    // }
    return (
        <>
            <Card style={{ background: 'white', padding: "0px", textAlign: "center", minHeight: "0px", margin: "5px 10px 10px 10px" }}>

                {
                    item.existe && <>
                        {
                            mostrar !== null && <>
                                <Divider />
                                <Box style={{ display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", flexDirection: "column", justifyItems: "center", maxHeight: "150px" }}>
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2, pb: 1 }}>
                                        {/* <Chip onClick={hanldeClick} label={mostrar.bloqueados} style={{ backgroundColor: "#f14", marginBottom: "10px", color: "white" }} />
                                        <Chip onClick={hanldeClick} label={mostrar.citados} style={{ backgroundColor: "#ff0", marginBottom: "10px" }} /> */}
                                        <Chip onClick={hanldeClick} label={mostrar.disponibles} style={{ backgroundColor: "#0f0", marginBottom: "0px" }} />
                                    </Box>
                                    {/* <Button variant='outlined' size={"small"} onClick={() => generarSobreturno(item.fecha_calendario.split('T')[0])} >Adicionales</Button> */}
                                </Box>
                            </>
                        }
                    </>
                }

            </Card>

        </>
    )
}
