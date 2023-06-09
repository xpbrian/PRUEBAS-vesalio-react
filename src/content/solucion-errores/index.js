import React, { useEffect, useState } from 'react'
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import { Button, Card, CardContent, CardHeader, Divider, Grid, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import Persona from './Persona'


export default function Index() {
    const [valores, setValores] = useState([])

    useEffect(() => {
        let tmp = []
        for (let i = 1; i < 2; i++) {
            let titulo = '';
            let text = []

            switch (i) {
                case 1:
                    titulo = 'Pacientes'
                    text = [{
                        id: 'documento',
                        value: '',
                        type: 'text'
                    }]
                    break;
                case 2:
                    titulo = 'Doctores'
                    text = [{
                        id: 'documento',
                        value: '',
                        type: 'text'
                    }]
                    break;
                default:
                    titulo = ''
                    break;
            }
            tmp.push(
                {
                    id: i,
                    text: text,
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
    const getPersona = async (item) => {
        const rpta = await axios.get(`http://200.121.91.211:4001/personaTotal/${item.text.find(x => x.id === 'documento').value}`)
        setValores(x => x.reduce((arr, itx) => {
            if (itx.id === item.id) {
                arr.push({
                    ...itx,
                    datos: [rpta.data]
                })
            } else {
                arr.push(itx)
            }
            return arr
        }, []))

    }
    const getPersonaFull = async (documento) => {
        const rpta = await axios.get(`http://200.121.91.211:4001/personaTotal/${documento}`)
        setValores(x => x.reduce((arr, itx) => {
            if (itx.id === 1) {
                arr.push({
                    ...itx,
                    datos: [rpta.data]
                })
            } else {
                arr.push(itx)
            }
            return arr
        }, []))

    }
    const handleGuardar = (item) => {
        console.log(item);
        switch (item.id) {
            case 1:
                getPersona(item)
                break;
            default:
                console.log("lskfgd");
                break;
        }
    }

    return (
        <> {
            valores.map((item, ix) => <Card key={ix} sx={{ m: 2 }}>
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
                                    type={subItem.type}
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

                        <Grid item lg={12}>
                            {
                                item.id === 1 && <Persona datos={item.datos} buscar={item.text.find(x => x.id === 'documento').value} getPersonaFull={getPersonaFull} />
                            }
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />

            </Card>)
        }</>
    )
}
