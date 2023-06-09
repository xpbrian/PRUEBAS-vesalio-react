import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, Grid, InputAdornment, InputLabel, Menu, MenuItem, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Label from 'src/components/Label';
import axios from 'axios';
import { ports } from 'src/config';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import useLayoutContext from 'src/hooks/useAuthLayout';

export default function Paciente({ datos, buscar, getPersonaFull }) {
    const tipos = [{ id: 'emergencia', nombre: 'Recuperar emergencia' }, { id: 'comprobar', nombre: 'Comprobar doctor' }]
    const actionRef1 = useRef(null);
    const { mostrarComponent } = useLayoutContext()
    const [alephoo, setAlephoo] = useState(null)
    const [sistComp, setSistComp] = useState(null)
    const [mongo, setMongo] = useState(null)
    const [openPeriod, setOpenMenuPeriod] = useState(false);
    const [period, setPeriod] = useState(tipos[0]);
    const [textAlephoo, setTextAlephoo] = useState([{
        id: "documento",
        value: '',
        text: 'N° Documento'
    }, {
        id: "apellidos",
        value: '',
        text: 'Apellidos'
    }, {
        id: "nombres",
        value: '',
        text: 'Nombres'
    }])
    const [textSistComp, setTextSistComp] = useState([{
        id: "documento",
        value: '',
        text: 'N° Documento'
    }, {
        id: "paternos",
        value: '',
        text: 'Apellidos paternos'
    }, {
        id: "maternos",
        value: '',
        text: 'Apellidos maternos'
    }, {
        id: "nombres",
        value: '',
        text: 'Nombres'
    }])
    const getDatosReniec = async (dni) => {
        let config = {
            method: 'get',
            url: `https://apiperu.net/api/dni/${dni}`,
            headers: {
                'Authorization': `Bearer ${ports.reniecApi}`,
            }
        };
        const rpta = await axios(config)
        console.log(rpta);
        if (rpta.data.success) {
            setTextAlephoo([
                {
                    id: "documento",
                    value: rpta.data.data.numero,
                    text: 'N° Documento'
                }, {
                    id: "apellidos",
                    value: rpta.data.data.apellido_paterno + ' ' + rpta.data.data.apellido_materno,
                    text: 'Apellidos'
                }, {
                    id: "nombres",
                    value: rpta.data.data.nombres,
                    text: 'Nombres'
                }])
            setTextSistComp(
                [{
                    id: "documento",
                    value: rpta.data.data.numero,
                    text: 'N° Documento'
                }, {
                    id: "paternos",
                    value: rpta.data.data.apellido_paterno,
                    text: 'Apellidos paternos'
                }, {
                    id: "maternos",
                    value: rpta.data.data.apellido_materno,
                    text: 'Apellidos maternos'
                }, {
                    id: "nombres",
                    value: rpta.data.data.nombres,
                    text: 'Nombres'
                }])
        }


    }
    useEffect(() => {
        if (datos.length > 0) {
            setAlephoo(datos[0].alephoo.length > 0 ? datos[0].alephoo[0] : null)
            setSistComp(datos[0].sistcomp.length > 0 ? datos[0].sistcomp[0] : null)
            setMongo(datos[0].mongodb.length > 0 ? datos[0].mongodb[0] : null)
            if (buscar.length === 8) {
                getDatosReniec(buscar)
            }
        }
    }, [datos, buscar])
    const handleClickRegistrarAlephoo = async () => {

        if (buscar.length === 8) {
            let config = {
                method: 'get',
                url: `https://apiperu.net/api/dni/${buscar}`,
                headers: {
                    'Authorization': `Bearer ${ports.reniecApi}`,
                }
            };
            const rpta = await axios(config)
            console.log(rpta);
            if (rpta.data.success) {
                console.log({
                    documento: rpta.data.data.numero,
                    apellidos: rpta.data.data.apellido_paterno + ' ' + rpta.data.data.apellido_materno,
                    nombres: rpta.data.data.nombres,
                })
                const enviar = await axios.post(`http://200.121.91.211:4001/insertPersonaAlephoo`, {
                    documento: rpta.data.data.numero,
                    apellidos: rpta.data.data.apellido_paterno + ' ' + rpta.data.data.apellido_materno,
                    nombres: rpta.data.data.nombres,
                })
                if (enviar.status === 200) {
                    getPersonaFull(rpta.data.data.numero)
                }
            }
        } else {
            console.log("dd")
        }

    }
    const handleChangedText = (e) => {
        setTextAlephoo(x => x.reduce((arr, item) => {
            arr.push({
                ...item,
                value: e.target.name === item.id ? e.target.value : item.value
            })
            return arr
        }, []))
    }
    const handleChangedTextS = (e) => {
        setTextAlephoo(x => x.reduce((arr, item) => {
            arr.push({
                ...item,
                value: e.target.name === item.id ? e.target.value : item.value
            })
            return arr
        }, []))
    }
    const handleModalOpen = (item) => {
        mostrarComponent({
            contenido: 'solucionErrores',
            estado: true,
            title: item.nombre,
            subtitle: `${alephoo.apellidos} ${alephoo.nombres}`,
            item: {
                alephoo,
                tipoContenido: item
            }
        }, 'drawerOpen')
    }
    const handleClickRegistrarSistComp = async () => {
        console.log("rbd");
    }
    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={1}
            >
                <Grid item lg={4}>
                    <Card>
                        <CardHeader
                            title="Datos Personales Alephoo"
                        />
                        <Divider />
                        <CardContent>
                            {
                                alephoo === null ? <>
                                    <Typography>No existe</Typography>

                                    {
                                        textAlephoo.map(x => <TextField
                                            sx={{ m: 1 }}
                                            key={x.id}
                                            value={x.value}
                                            label={x.text}
                                            name={x.name}
                                            onChange={(e) => handleChangedText(e)}
                                            fullWidth
                                            variant="outlined"
                                        />)
                                    }

                                    <Button
                                        variant="outlined"
                                        size='large'
                                        onClick={handleClickRegistrarAlephoo}
                                    >
                                        Registrar
                                    </Button>
                                </> : <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">{alephoo.documento}</InputLabel>
                                    <OutlinedInput
                                        endAdornment={<InputAdornment position="start"><RemoveRedEyeIcon /></InputAdornment>}
                                        label={alephoo.documento}
                                        value={`${alephoo.apellidos} ${alephoo.nombres}`}
                                    />
                                </FormControl>
                            }

                        </CardContent>
                    </Card>

                </Grid>
                <Grid item lg={4}>
                    <Card>
                        <CardHeader
                            title="Datos Personales Sistcomp"
                        />
                        <Divider />
                        <CardContent>
                            {
                                sistComp === null ? <>
                                    <Typography>No existe</Typography>
                                    {
                                        textSistComp.map(x => <TextField
                                            sx={{ m: 1 }}
                                            key={x.id}
                                            value={x.value}
                                            label={x.text}
                                            name={x.name}
                                            onChange={(e) => handleChangedTextS(e)}
                                            fullWidth
                                            variant="outlined"
                                        />)
                                    }

                                    <Button
                                        variant="outlined"
                                        size='large'
                                        onClick={handleClickRegistrarSistComp}
                                    >
                                        Registrar
                                    </Button>
                                </> : <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">{sistComp.Nro_DocIdenti}</InputLabel>
                                    <OutlinedInput
                                        endAdornment={<InputAdornment position="start"><RemoveRedEyeIcon /></InputAdornment>}
                                        label={sistComp.Nro_DocIdenti}
                                        value={`${sistComp.Des_ApePaterno} ${sistComp.Des_ApeMaterno} ${sistComp.Des_Nombres}`}
                                    />
                                </FormControl>
                            }

                        </CardContent>
                    </Card>

                </Grid>
                <Grid item lg={4}>
                    <Card>
                        <CardHeader
                            title="Datos SISTEMA HCE"
                            action={<>
                                {(alephoo !== null && sistComp !== null) && <Button
                                    variant="outlined"
                                    ref={actionRef1}
                                    onClick={() => setOpenMenuPeriod(true)}
                                    sx={{
                                        mr: 1
                                    }}
                                    endIcon={<KeyboardArrowDownTwoToneIcon fontSize="small" />}
                                >
                                    {period.nombre}
                                </Button>}
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
                                    {tipos.map((_period) => (
                                        <MenuItem
                                            key={_period.id}
                                            onClick={() => {
                                                setPeriod(_period);
                                                setOpenMenuPeriod(false);
                                                handleModalOpen(_period)
                                            }}
                                        >
                                            {_period.nombre}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>}
                        />
                        <Divider />
                        <CardContent>
                            {
                                mongo === null ? <>

                                    {
                                        (alephoo !== null && sistComp !== null) && <Button
                                            variant="outlined"
                                            size='large'
                                        >
                                            Vincular
                                        </Button>
                                    }

                                </> : <>
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">{mongo.datos.numero_documento}</InputLabel>
                                        <OutlinedInput
                                            endAdornment={<InputAdornment position="start"><RemoveRedEyeIcon /></InputAdornment>}
                                            label={mongo.datos.numero_documento}
                                            value={`${mongo.datos.ape_paterno} ${mongo.datos.ape_materno} ${mongo.datos.nombres}`}
                                        />
                                    </FormControl>
                                    <Box sx={{ alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column", justifyItems: "center" }}>
                                        <Label color={mongo.alepho.existe === undefined ? 'success' : 'error'}>{mongo.alepho.existe === undefined ? 'Conectado con Alephoo' : 'No conectado con Alephoo'}</Label>
                                        <Label sx={{ mt: .5 }} color={mongo.siscomp.existe === undefined ? 'success' : 'error'}>{mongo.siscomp.existe === undefined ? 'Conectado con Sistcomp' : 'No Conectado con Sistcomp'}</Label>
                                    </Box>
                                </>
                            }

                        </CardContent>
                    </Card>

                </Grid>
            </Grid>



        </>
    )
}
