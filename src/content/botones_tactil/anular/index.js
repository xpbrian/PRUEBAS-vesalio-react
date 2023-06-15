
import React, { useRef, useState } from "react";
import { Box, styled, OutlinedInput, InputAdornment, Button, FormControl, Menu, MenuItem, Divider, Typography, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useLayoutContext from 'src/hooks/useAuthLayout';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import axios from 'axios';
import ResultBuscaPaciente from 'src/content/tactil/ResultBuscaPaciente'
import Citas from "./Citas";

const OutlinedInputWrapper = styled(OutlinedInput)(
    ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};
  `
);
const ButtonSearch = styled(Button)(
    ({ theme }) => `
      margin-right: -${theme.spacing(1)};
  `
);

export default function index() {



    const { t } = useTranslation();
    const { tipoDocumentosSistComp } = useLayoutContext()
    const actionRef1 = useRef(null);
    const [openPeriod, setOpenMenuPeriod] = useState(false);
    const [period, setPeriod] = useState(tipoDocumentosSistComp[0]);
    const [text, setText] = useState('')
    const [lista, setlista] = useState([]);
    const [datos, setDatos] = useState([]);
    const [mostrar, setMostrar] = useState(false);
    const [selected, setSelected] = useState({ paciente: { item: null, selected: false } })


    const handleBuscarPaciente = async () => {


        const rpta = await axios.post(`http://apis-vesalio.com.pe/historiaSistcomp`, {
            numero: text, tipo: period.id
        })
        setlista(rpta.data.recordset.sort(function (a, b) {
            if (a.Nro_Historia > b.Nro_Historia) {
                return 1;
            }
            if (a.Nro_Historia < b.Nro_Historia) {
                return -1;
            }
            return 0;
        }));
        setMostrar(rpta.data.recordset.length === 0 && true)

    }

    const handleSleccionarPaciente = async (id, item) => {
        setSelected(x => {
            return {
                ...x,
                [id]: {
                    item,
                    selected: true
                }
            }
        })
        let rpta = await axios.post(`http://apis-vesalio.com.pe/turnoProgamadoListaTactil`, {
            paciente: item.Nro_DocIdenti
        })
        setDatos(rpta.data);
    }

    return (
        <div className="App">

            <Box style={{ height: "100vh", overflowY: "hidden" }}>

                <Box style={{ display: "flex", justifyContent: "center", justifyItems: "center", alignContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <img style={{ width: "100%" }} src={"https://www.vesalio.com.pe/wp-content/uploads/2017/08/Logo-Vesalio-fondo-blanco.jpg"} alt="ImgVesalio" />
                    <Typography style={{ marginTop: "30px" }} variant="h4">Para buscar su cita, primero digite su numero de documento</Typography>
                </Box>

                <Box style={{ border: "1px solid transparent", overflowY: "scroll", display: "flex", justifyContent: "center", justifyItems: "center", height: "100vh" }}>

                    <Box style={{ marginTop: "0px" }} className="dni">

                        <Box p={2}>
                            <FormControl variant="outlined" fullWidth>
                                <OutlinedInputWrapper
                                    style={{ width: "100%" }}
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    type="number"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleBuscarPaciente()
                                        }
                                    }}
                                    placeholder={t('Ingrese número de documento de identidad')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <ButtonSearch variant="contained" size="small"
                                                onClick={() => handleBuscarPaciente()}>
                                                {t('Buscar')}
                                            </ButtonSearch>
                                        </InputAdornment>
                                    }
                                    startAdornment={
                                        <InputAdornment position="start">

                                            <Button
                                                variant="outlined"
                                                ref={actionRef1}
                                                onClick={() => setOpenMenuPeriod(true)}
                                                sx={{
                                                    mr: 1
                                                }}
                                                endIcon={<KeyboardArrowDownTwoToneIcon fontSize="small" />}
                                            >
                                                {period.title}
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
                                                {tipoDocumentosSistComp.map((_period) => (
                                                    <MenuItem
                                                        key={_period.id}
                                                        onClick={() => {
                                                            setPeriod(_period);
                                                            setOpenMenuPeriod(false);
                                                        }}
                                                    >
                                                        {_period.title}
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Box>
                        <Divider />
                        {
                            lista.length > 0 && <ResultBuscaPaciente lista={lista} handleSleccionarPaciente={handleSleccionarPaciente} selected={selected} />
                        }

                        {
                            mostrar && <Box my={2}
                                mx={2}
                                flexDirection='column'
                                display="flex"
                                justifyContent="center"
                                alignItems="center">
                                <Typography
                                    variant="h4"
                                    color="text.secondary"
                                    fontWeight="normal"
                                >
                                    No se encontro paciente con el documento ingresado
                                </Typography>
                            </Box>
                        }

                        {selected.paciente.selected &&
                            <Box>

                                {datos.length === 0 ? <Typography>No existe Citas</Typography> :
                                    <Grid spacing={2} style={{ justifyContent: "center", justifyItems: "center", alignContent: "center", alignItems: "center" }} container>
                                        {
                                            datos.map((item, ix) =>

                                                <Grid item xs={5.5} sm={5.5} md={5.5} lg={5.5} key={ix}>
                                                    <Citas item={item} />
                                                </Grid>)
                                        }
                                    </Grid>

                                }
                            </Box>
                        }
                    </Box>

                </Box>

            </Box>

        </div>


    );
}

