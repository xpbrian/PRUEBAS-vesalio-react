import { Button, Card, CardContent, CardHeader, Divider, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import Highcharts from 'highcharts'
import ListaCitasTabla from './Lista';
import ListaSub from './ListaSub';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

export default function Index() {

    const [valores, setValores] = useState([])
    const [subValores, setSubValores] = useState([{
        title: '',
        datos: [],
        mostrar: false
    }])

    useEffect(() => {
        let tmp = []
        for (let i = 1; i < 2; i++) {
            let titulo = ''
            switch (i) {
                case 1:
                    titulo = 'Cuenta de horas generadas por especialidad y médico'
                    break;
                default:
                    titulo = ''
                    break;

            }
            tmp.push(
                {
                    id: i,
                    text: [{
                        id: 'fechaInicio',
                        value: ''
                    },
                    {
                        id: 'fechaFin',
                        value: ''
                    }],
                    display: false,
                    titulo,
                    datos: []
                }
            )
        }
        setValores(tmp)
    }, [])
    const handleChangedDisplay = (id) => {
        setValores(x => x.reduce((arr, item) => {
            if (item.id === id) {
                arr.push({
                    ...item,
                    display: !item.display
                })
            } else {
                arr.push(item)
            }
            return arr
        }, []))
    }
    const handleChangedText = (event, id, subId) => {
        setValores(x => x.reduce((arr, item) => {
            if (item.id === id) {
                arr.push({
                    ...item,
                    text: item.text.reduce((arx, itx) => {
                        if (itx.id === subId) {
                            arx.push({
                                ...itx,
                                value: event
                            })
                        } else {
                            arx.push(itx)
                        }
                        return arx
                    }, [])
                })
            } else {
                arr.push(item)
            }
            return arr
        }, []))
    }

    const reporteCantidad = async (item) => {
        const rpta = await axios.post(`http://200.121.91.211:4001/reporteMedicosHorasTrabajadas`, {
            fechaInicio: item.text.find(x => x.id === 'fechaInicio').value,
            fechaFin: item.text.find(x => x.id === 'fechaFin').value
        })

        if (rpta.status === 200) {
            setValores(x => x.reduce((arr, itx) => {
                if (itx.id === item.id) {
                    arr.push({
                        ...item,
                        datos: rpta.data
                    })
                } else {
                    arr.push(itx)
                }
                return arr
            }, []))

            let array = rpta.data.reduce((arr, item) => {
                let existe = arr.findIndex(x => x.especialidad_id === item.especialidad_id)
                let horasGeneradas = parseInt(item.cantidad_turnos_generados) * parseInt(item.dias_generados)
                let horasRealizadas = parseInt(item.realizados) + parseInt(item.pendientes)
                if (existe < 0) {
                    arr.push({
                        cantidadMedicos: [item.personal_id],
                        especialidad_id: item.especialidad_id,
                        especialidadNombre: item.especialidadNombre,
                        total_turnos: horasGeneradas,
                        total_turnosHoras: parseFloat((horasGeneradas * item.duracion_turno) / 60),
                        total_citas: horasRealizadas,
                        total_citasHoras: parseFloat((horasRealizadas * item.duracion_turno) / 60),
                    })
                } else {
                    if (arr[existe].cantidadMedicos.find(x => x === item.personal_id) === undefined) {
                        arr[existe].cantidadMedicos.push(item.personal_id)
                        arr[existe].total_citas += horasRealizadas
                        arr[existe].total_citasHoras += parseFloat((horasRealizadas * item.duracion_turno) / 60)
                    }
                    arr[existe].total_turnos += horasGeneradas
                    arr[existe].total_turnosHoras += parseFloat((horasGeneradas * item.duracion_turno) / 60)

                }
                return arr;
            }, [])
            Highcharts.chart('container_' + item.id, {
                chart: {
                    zoomType: 'xy'
                },
                title: {
                    text: `Reporte generado desde ${item.text.find(x => x.id === 'fechaInicio').value} hasta ${item.text.find(x => x.id === 'fechaFin').value}`,
                    align: 'center'
                },
                subtitle: {
                    text: 'Agrupado por cantidad de citas por horas solicitadas',
                    align: 'left'
                },
                xAxis: [{
                    categories: array.map(x => x.especialidadNombre),
                    crosshair: true
                }],
                yAxis: [{ // Primary yAxis
                    labels: {
                        style: {
                            color: Highcharts.getOptions().colors[2]
                        }
                    },
                    title: {
                        text: 'Cantidad de turnos',
                        style: {
                            color: Highcharts.getOptions().colors[2]
                        }
                    },
                    opposite: true

                }, { // Secondary yAxis
                    gridLineWidth: 0,
                    title: {
                        text: 'Tunos en hora',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    labels: {
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    }

                }],
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        events: {
                            click: function (event) {
                                let arrayFilter = array.find(x => x.especialidadNombre === event.point.category)
                                handleReporteCantidadMedico(arrayFilter, item.id, rpta.data, event.point.category);
                            }
                        }
                    }
                },
                tooltip: {
                    shared: true
                },
                legend: {
                    align: 'left',
                    x: 80,
                    verticalAlign: 'top',
                    y: 60,
                    floating: true,
                    backgroundColor:
                        Highcharts.defaultOptions.legend.backgroundColor || // theme
                        'rgba(255,255,255,0.25)'
                },
                series: [{
                    name: 'Total turnos solicitados',
                    type: 'column',
                    yAxis: 1,
                    data: array.map(x => x.total_turnos),

                },
                {
                    name: 'Total citas generadas',
                    type: 'column',
                    yAxis: 1,
                    data: array.map(x => x.total_citas),

                },
                {
                    name: 'Total turnos solicitados(horas)',
                    type: 'spline',
                    data: array.map(x => x.total_turnosHoras)
                },
                {
                    name: 'Total citas generadas(horas)',
                    type: 'spline',
                    data: array.map(x => x.total_citasHoras)
                }]
            });
        }
    }
    const handleReporteCantidadMedico = (obj, itemId, array, titulo) => {

        let medicos = array.reduce((arr, item) => {
            let existe = obj.cantidadMedicos.find(x => x === item.personal_id)
            if (existe !== undefined) {
                arr.push(item)
            }
            return arr
        }, []).reduce((arr, item) => {
            let existe = arr.findIndex(x => x.personal_id === item.personal_id)
            let horasGeneradas = parseInt(item.cantidad_turnos_generados) * parseInt(item.dias_generados)
            let horasRealizadas = parseInt(item.realizados) + parseInt(item.pendientes)
            if (existe < 0) {
                arr.push({
                    personal_id: item.personal_id,
                    personaDatos: item.personaDatos,
                    especialidadNombre: item.especialidadNombre,
                    total_turnos: horasGeneradas,
                    total_turnosHoras: parseFloat((horasGeneradas * item.duracion_turno) / 60),
                    total_citas: horasRealizadas,
                    total_citasHoras: parseFloat((horasRealizadas * item.duracion_turno) / 60),
                })
            } else {
                arr[existe].total_turnos += horasGeneradas
                arr[existe].total_turnosHoras += parseFloat((horasGeneradas * item.duracion_turno) / 60)
            }
            return arr
        }, [])

        setSubValores([{
            title: titulo,
            datos: medicos,
            mostrar: true
        }])
        Highcharts.chart('subcontainer_' + itemId, {
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: `Reporte generado desde ${valores.find(x => x.id === itemId).text.find(x => x.id === 'fechaInicio').value} hasta ${valores.find(x => x.id === itemId).text.find(x => x.id === 'fechaFin').value}`,
                align: 'center'
            },
            subtitle: {
                text: 'Agrupado por cantidad de citas por horas solicitadas',
                align: 'left'
            },
            xAxis: [{
                categories: medicos.map(x => x.personaDatos),
                crosshair: true
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                title: {
                    text: 'Cantidad de turnos',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                opposite: true

            }, { // Secondary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'Tunos en hora',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                }

            }],
            /*
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    events: {
                        click: function (event) {
                            let arrayFilter = array.find(x => x.especialidadNombre === event.point.category)
                            handleReporteCantidadMedico(arrayFilter, item.id, rpta.data);
                        }
                    }
                }
            },
            */
            tooltip: {
                shared: true
            },
            legend: {
                align: 'left',
                x: 80,
                verticalAlign: 'top',
                y: 60,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || // theme
                    'rgba(255,255,255,0.25)'
            },
            series: [{
                name: 'Total turnos solicitados',
                type: 'column',
                yAxis: 1,
                data: medicos.map(x => x.total_turnos),

            },
            {
                name: 'Total citas generadas',
                type: 'column',
                yAxis: 1,
                data: medicos.map(x => x.total_citas),

            },
            {
                name: 'Total turnos solicitados(horas)',
                type: 'spline',
                data: medicos.map(x => x.total_turnosHoras)
            },
            {
                name: 'Total citas generadas(horas)',
                type: 'spline',
                data: medicos.map(x => x.total_citasHoras)
            }]
        });

    }

    const handleGuardar = (item) => {
        switch (item.id) {
            case 1:
                reporteCantidad(item)
                break;
            default:
                console.log("lskfgd");
                break;
        }

    }
    const handleVolver = () => {
        setSubValores([{
            title: '',
            datos: [],
            mostrar: false
        }])
    }
    return (
        <>
            {
                valores.map((item, ix) => <Card key={ix} sx={{ mb: 2 }}>
                    <CardHeader
                        action={
                            <>
                                <IconButton
                                    size="medium"
                                    color="secondary"
                                    onClick={() => handleChangedDisplay(item.id)}
                                >
                                    <ExpandMoreTwoToneIcon fontSize="small" />
                                </IconButton>
                            </>
                        }
                        title={item.titulo}
                    />
                    <Divider />
                    <CardContent sx={{ display: item.display ? '' : 'none' }}>
                        <Grid
                            sx={{
                                px: 4
                            }}
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="stretch"
                            spacing={1}
                        >

                            {
                                item.text.map((subItem, ixx) => <Grid item lg={4} key={ixx}>
                                    <TextField
                                        fullWidth
                                        type={"date"}
                                        value={subItem.value}
                                        variant="outlined"

                                        onChange={(e) => handleChangedText(e.target.value, item.id, subItem.id)}
                                    />

                                </Grid>)
                            }
                            <Grid item lg={4}  >
                                <Button

                                    variant="outlined"
                                    size='large'
                                    endIcon={<SearchIcon fontSize="small" />}
                                    onClick={() => handleGuardar(item)}
                                >
                                    Generar
                                </Button>
                            </Grid>

                            {
                                !subValores[0].mostrar && <>
                                    <Grid item lg={12} sx={{}}>
                                        <div id={`container_${item.id}`}>{' '}</div>
                                    </Grid>
                                    <Grid item lg={12} sx={{}}>
                                        <ListaCitasTabla listaPrimer={item.datos.reduce((arr, item) => {
                                            let existe = arr.findIndex(x => x.especialidad_id === item.especialidad_id)
                                            let horasGeneradas = parseInt(item.cantidad_turnos_generados) * parseInt(item.dias_generados)
                                            let horasRealizadas = parseInt(item.realizados) + parseInt(item.pendientes)
                                            if (existe < 0) {
                                                arr.push({
                                                    cantidadMedicos: [item.personal_id],
                                                    especialidad_id: item.especialidad_id,
                                                    especialidadNombre: item.especialidadNombre,
                                                    total_turnos: horasGeneradas,
                                                    total_turnosHoras: parseFloat((horasGeneradas * item.duracion_turno) / 60),
                                                    total_citas: horasRealizadas,
                                                    total_citasHoras: parseFloat((horasRealizadas * item.duracion_turno) / 60),
                                                })
                                            } else {
                                                if (arr[existe].cantidadMedicos.find(x => x === item.personal_id) === undefined) {
                                                    arr[existe].cantidadMedicos.push(item.personal_id)
                                                    arr[existe].total_citas += horasRealizadas
                                                    arr[existe].total_citasHoras += parseFloat((horasRealizadas * item.duracion_turno) / 60)
                                                }
                                                arr[existe].total_turnos += horasGeneradas
                                                arr[existe].total_turnosHoras += parseFloat((horasGeneradas * item.duracion_turno) / 60)

                                            }
                                            return arr;
                                        }, [])} />
                                    </Grid>
                                </>
                            }

                            {
                                subValores[0].mostrar && <>
                                    <Grid item lg={12} sx={{}}>
                                        <Button

                                            variant="outlined"
                                            size='large'
                                            startIcon={<KeyboardArrowLeftIcon fontSize="small" />}
                                            onClick={() => handleVolver()}
                                        >
                                            Volver
                                        </Button>
                                        <Typography variant='h3'>{subValores[0].title}</Typography>
                                    </Grid>

                                    <Grid item lg={12} sx={{}}>
                                        <div id={`subcontainer_${item.id}`}>{' '}</div>
                                    </Grid>
                                    <Grid item lg={12} sx={{}}>
                                        <ListaSub listaPrimer={subValores[0].datos} />
                                    </Grid>
                                </>
                            }


                        </Grid>
                    </CardContent>
                    <Divider />

                </Card>)
            }
        </>
    )
}
