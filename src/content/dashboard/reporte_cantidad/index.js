import { Button, Card, CardContent, CardHeader, Divider, Grid, IconButton, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import Highcharts from 'highcharts'
import ListaMedicosEspecialidad from './ListaMedicosEspecialidad'
import ListaFinanciador from './ListaFinanciador'

export default function Index() {

    const [valores, setValores] = useState([])

    useEffect(() => {
        let tmp = []
        for (let i = 1; i < 8; i++) {
            let titulo = ''
            switch (i) {
                case 1:
                    titulo = 'Cuenta de citas generadas por mes y día'
                    break;
                case 2:
                    titulo = 'Cuenta de citas generadas  por tipo de usuario'
                    break;
                case 3:
                    titulo = 'Cuenta de citas (cuando asistirá el paciente)  por especialidad'
                    break;
                case 4:
                    titulo = 'Cuenta de citas (cuando asistirá el paciente)  por médico y especialidad'
                    break;
                case 5:
                    titulo = 'Cuenta de citas generadas por especialidad'
                    break;
                case 6:
                    titulo = 'Cuenta de citas generadas por medico'
                    break;
                case 7:
                    titulo = 'Cuenta de citas por financiador'
                    break;
                case 8:
                    titulo = 'Cuenta de citas por financiador por fecha de generación'
                    break;
                default:
                    titulo = ''
                    break;

            }
            tmp.push(
                {
                    id: i,
                    text: [{
                        id: 'fecha',
                        value: ''
                    },
                    {
                        id: 'fecha2',
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
        const rpta = await axios.post(`http://200.121.91.211:4001/reporteCantidad`, {
            fecha: item.text.find(x => x.id === 'fecha').value,
            fecha2: item.text.find(x => x.id === 'fecha2').value
        })

        let array = rpta.data.reduce((arr, it) => {
            let found = arr.findIndex(x => x.fecha === it.fecha)
            if (found < 0) {
                arr.push({
                    fecha: it.fecha,
                    [it.nombre]: it.cantidad
                })
            } else {
                arr[found][it.nombre] = it.cantidad
            }
            return arr
        }, [])

        setValores(x => x.reduce((arr, itx) => {
            if (itx.id === item.id) {
                arr.push({
                    ...item,
                    datos: array
                })
            } else {
                arr.push(itx)
            }
            return arr
        }, []))
        console.log(array);
        Highcharts.chart('container_' + item.id, {

            title: {
                text: `Reporte generado desde ${item.text.find(x => x.id === 'fecha').value} hasta ${item.text.find(x => x.id === 'fecha2').value}`,
                align: 'center'
            },

            subtitle: {
                text: 'Agrupado por cantidad de citas generadas',
                align: 'left'
            },

            yAxis: {
                title: {
                    text: 'Cantidad'
                }
            },
            xAxis: {
                categories: array.map(x => x.fecha),
            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            series: [{
                name: 'Anuladas',
                data: array.map(x => x.Cancelado)
            }, {
                name: 'Generadas',
                data: array.map(x => parseInt(x.Pendiente) + parseInt(x.Realizado))
            }
            ],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });

    }
    const reporteUsuario = async (item) => {
        const rpta = await axios.post(`http://200.121.91.211:4001/reporteUsuario`, {
            fecha: item.text.find(x => x.id === 'fecha').value,
            fecha2: item.text.find(x => x.id === 'fecha2').value
        })
        let array = rpta.data.reduce((arr, item) => {
            let existe = arr.findIndex(x => x.id === item.cuenta.id)
            if (existe < 0) {
                arr.push({
                    id: item.cuenta.id,
                    detalle: item.cuenta.descripcion,
                    cantidad: 1,
                    anulado: item.anulado.estado ? 1 : 0,
                    reservado: item.anulado.estado ? 0 : 1,
                })
            } else {
                arr[existe].cantidad += 1
                arr[existe].anulado += item.anulado.estado ? 1 : 0
                arr[existe].reservado += item.anulado.estado ? 0 : 1
            }
            return arr
        }, []);

        setValores(x => x.reduce((arr, itx) => {
            if (itx.id === item.id) {
                arr.push({
                    ...item,
                    datos: array
                })
            } else {
                arr.push(itx)
            }
            return arr
        }, []))

        Highcharts.chart('container_' + item.id, {
            chart: {
                type: 'column'
            },
            title: {
                text: `Reporte generado desde ${item.text.find(x => x.id === 'fecha').value} hasta ${item.text.find(x => x.id === 'fecha2').value}`,
                align: 'center'
            },
            subtitle: {
                text: 'Agrupado por cantidad de citas generadas',
                align: 'left'
            },
            xAxis: {
                categories: array.map(x => x.detalle),
                crosshair: true
            },

            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Anuladas',
                data: array.map(x => x.anulado)

            }, {
                name: 'Total',
                data: array.map(x => x.cantidad)

            },

            {
                name: 'Generadas',
                data: array.map(x => x.reservado)

            }]
        });

    }
    const reporteEspecialidad = async (item) => {
        const rpta = await axios.post(`http://200.121.91.211:4001/reporteCantidadPorEspecialidad`, {
            fecha: item.text.find(x => x.id === 'fecha').value,
            fecha2: item.text.find(x => x.id === 'fecha2').value
        })
        console.log(rpta.data)
        let array = rpta.data.reduce((arr, it) => {
            let found = arr.findIndex(x => x.nombre === it.nombre)
            if (found < 0) {
                arr.push({
                    nombre: it.nombre,
                    cantidad: 1,
                    pendiente: parseInt(it.estado) === 1 ? 1 : 0,
                    reservado: parseInt(it.estado) === 5 ? 1 : 0,
                })
            } else {
                arr[found].cantidad += 1
                arr[found].pendiente += parseInt(it.estado) === 1 ? 1 : 0
                arr[found].reservado += parseInt(it.estado) === 5 ? 1 : 0
            }
            return arr
        }, [])

        setValores(x => x.reduce((arr, itx) => {
            if (itx.id === item.id) {
                arr.push({
                    ...item,
                    datos: array
                })
            } else {
                arr.push(itx)
            }
            return arr
        }, []))
        console.log(array);
        Highcharts.chart('container_' + item.id, {
            chart: {
                type: 'column'
            },
            title: {
                text: `Reporte generado desde ${item.text.find(x => x.id === 'fecha').value} hasta ${item.text.find(x => x.id === 'fecha2').value}`,
                align: 'center'
            },
            subtitle: {
                text: 'Agrupado por cantidad de citas',
                align: 'left'
            },
            xAxis: {
                categories: array.map(x => x.nombre),
                crosshair: true
            },

            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Pendiente',
                data: array.map(x => x.pendiente)

            }, {
                name: 'Total',
                data: array.map(x => x.cantidad)

            },

            {
                name: 'Realizadas',
                data: array.map(x => x.reservado)

            }]
        });

    }
    const reporteMedico = async (item) => {
        const rpta = await axios.post(`http://200.121.91.211:4001/reporteCantidadPorMedico`, {
            fecha: item.text.find(x => x.id === 'fecha').value,
            fecha2: item.text.find(x => x.id === 'fecha2').value
        })
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
        console.log(rpta.data);
        Highcharts.chart('container_' + item.id, {
            chart: {
                type: 'bar'
            },
            title: {
                text: `Reporte generado desde ${item.text.find(x => x.id === 'fecha').value} hasta ${item.text.find(x => x.id === 'fecha2').value}`,
                align: 'center'
            },
            subtitle: {
                text: 'Agrupado por cantidad de citas',
                align: 'left'
            },
            xAxis: {
                categories: rpta.data.filter((x, ix) => ix <= 20).map(x => x.apellidos),
            },


            series: [{
                name: 'Pendientes',
                data: rpta.data.filter((x, ix) => ix <= 20).map(x => parseInt(x.pendientes))
            }, {
                name: 'Total',
                data: rpta.data.filter((x, ix) => ix <= 20).map(x => x.cantidad)
            }, {
                name: 'Realizadas',
                data: rpta.data.filter((x, ix) => ix <= 20).map(x => parseInt(x.realizadas))
            }]
        });

    }
    const reporteMedicoGenerado = async (item) => {
        const rpta = await axios.post(`http://200.121.91.211:4001/reporteCantidadPorMedicoGenerado`, {
            fecha: item.text.find(x => x.id === 'fecha').value,
            fecha2: item.text.find(x => x.id === 'fecha2').value
        })
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
        console.log(rpta.data);
        Highcharts.chart('container_' + item.id, {
            chart: {
                type: 'bar'
            },
            title: {
                text: `Reporte generado desde ${item.text.find(x => x.id === 'fecha').value} hasta ${item.text.find(x => x.id === 'fecha2').value}`,
                align: 'center'
            },
            subtitle: {
                text: 'Agrupado por cantidad de citas',
                align: 'left'
            },
            xAxis: {
                categories: rpta.data.filter((x, ix) => ix <= 20).map(x => x.apellidos),
            },


            series: [{
                name: 'Pendientes',
                data: rpta.data.filter((x, ix) => ix <= 20).map(x => parseInt(x.pendientes))
            }, {
                name: 'Total',
                data: rpta.data.filter((x, ix) => ix <= 20).map(x => x.cantidad)
            }, {
                name: 'Realizadas',
                data: rpta.data.filter((x, ix) => ix <= 20).map(x => parseInt(x.realizadas))
            }]
        });

    }
    const reporteGnerarEspecialidad = async (item) => {
        const rpta = await axios.post(`http://200.121.91.211:4001/reporteGnerarEspecialidad`, {
            fecha: item.text.find(x => x.id === 'fecha').value,
            fecha2: item.text.find(x => x.id === 'fecha2').value
        })
        console.log(rpta.data)
        let array = rpta.data.reduce((arr, it) => {
            let found = arr.findIndex(x => x.nombre === it.nombre)
            if (found < 0) {
                arr.push({
                    nombre: it.nombre,
                    cantidad: 1,
                    pendiente: parseInt(it.estado) === 1 ? 1 : 0,
                    reservado: parseInt(it.estado) === 5 ? 1 : 0,
                })
            } else {
                arr[found].cantidad += 1
                arr[found].pendiente += parseInt(it.estado) === 1 ? 1 : 0
                arr[found].reservado += parseInt(it.estado) === 5 ? 1 : 0
            }
            return arr
        }, [])

        setValores(x => x.reduce((arr, itx) => {
            if (itx.id === item.id) {
                arr.push({
                    ...item,
                    datos: array
                })
            } else {
                arr.push(itx)
            }
            return arr
        }, []))
        console.log(array);
        Highcharts.chart('container_' + item.id, {
            chart: {
                type: 'column'
            },
            title: {
                text: `Reporte generado desde ${item.text.find(x => x.id === 'fecha').value} hasta ${item.text.find(x => x.id === 'fecha2').value}`,
                align: 'center'
            },
            subtitle: {
                text: 'Agrupado por cantidad de citas',
                align: 'left'
            },
            xAxis: {
                categories: array.map(x => x.nombre),
                crosshair: true
            },

            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Pendiente',
                data: array.map(x => x.pendiente)

            }, {
                name: 'Total',
                data: array.map(x => x.cantidad)

            },

            {
                name: 'Realizadas',
                data: array.map(x => x.reservado)

            }]
        });

    }
    const reporteFinanciador = async (item) => {
        const rpta = await axios.post(`http://200.121.91.211:4001/reporteFinanciadores`, {
            fecha: item.text.find(x => x.id === 'fecha').value,
            fecha2: item.text.find(x => x.id === 'fecha2').value
        })
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
        console.log(rpta.data);
        Highcharts.chart('container_' + item.id, {
            chart: {
                type: 'bar'
            },
            title: {
                text: `Reporte generado desde ${item.text.find(x => x.id === 'fecha').value} hasta ${item.text.find(x => x.id === 'fecha2').value}`,
                align: 'center'
            },
            subtitle: {
                text: 'Agrupado por cantidad de citas',
                align: 'left'
            },
            xAxis: {
                categories: rpta.data.filter((x, ix) => ix <= 20).map(x => x.nombre),
            },


            series: [{
                name: 'Pendientes',
                data: rpta.data.filter((x, ix) => ix <= 20).map(x => parseInt(x.pendientes))
            }, {
                name: 'Total',
                data: rpta.data.filter((x, ix) => ix <= 20).map(x => x.cantidad)
            }, {
                name: 'Realizadas',
                data: rpta.data.filter((x, ix) => ix <= 20).map(x => parseInt(x.realizadas))
            }]
        });

    }
    const reporteFinanciadorGenerado = async (item) => {
        const rpta = await axios.post(`http://200.121.91.211:4001/reporteFinanciadoresGenerado`, {
            fecha: item.text.find(x => x.id === 'fecha').value,
            fecha2: item.text.find(x => x.id === 'fecha2').value
        })
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
        console.log(rpta.data);
        Highcharts.chart('container_' + item.id, {
            chart: {
                type: 'bar'
            },
            title: {
                text: `Reporte generado desde ${item.text.find(x => x.id === 'fecha').value} hasta ${item.text.find(x => x.id === 'fecha2').value}`,
                align: 'center'
            },
            subtitle: {
                text: 'Agrupado por cantidad de citas',
                align: 'left'
            },
            xAxis: {
                categories: rpta.data.filter((x, ix) => ix <= 20).map(x => x.nombre),
            },


            series: [{
                name: 'Pendientes',
                data: rpta.data.filter((x, ix) => ix <= 20).map(x => parseInt(x.pendientes))
            }, {
                name: 'Total',
                data: rpta.data.filter((x, ix) => ix <= 20).map(x => x.cantidad)
            }, {
                name: 'Realizadas',
                data: rpta.data.filter((x, ix) => ix <= 20).map(x => parseInt(x.realizadas))
            }]
        });

    }
    const handleGuardar = (item) => {
        switch (item.id) {
            case 1:
                reporteCantidad(item)
                break;
            case 2:
                reporteUsuario(item)
                break;
            case 3:
                reporteEspecialidad(item)
                break;
            case 4:
                reporteMedico(item)
                break;
            case 5:
                reporteGnerarEspecialidad(item)
                break;
            case 6:
                reporteMedicoGenerado(item)
                break;
            case 7:
                reporteFinanciador(item)
                break;
            case 8:
                reporteFinanciadorGenerado(item)
                break;
            default:
                console.log("lskfgd");
                break;
        }

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
                            <Grid item lg={12} sx={{}}>
                                <div id={`container_${item.id}`}>-</div>
                            </Grid>
                            <Grid item lg={12} sx={{}}>
                                {
                                    item.id === 4 && <ListaMedicosEspecialidad listaPrimer={item.datos} />
                                }
                                {
                                    item.id === 6 && <ListaMedicosEspecialidad listaPrimer={item.datos} />
                                }
                                {
                                    item.id === 7 && <ListaFinanciador listaPrimer={item.datos} />
                                }
                                {
                                    item.id === 8 && <ListaFinanciador listaPrimer={item.datos} />
                                }
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />

                </Card>)
            }
        </>
    )
}
