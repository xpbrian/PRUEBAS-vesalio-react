
import React, { useEffect, useRef, useState } from "react";
// import Keyboard from "react-simple-keyboard";
// import "react-simple-keyboard/build/css/index.css";
// import "./index.css";

import { Box, styled, OutlinedInput, InputAdornment, Button, FormControl, Menu, MenuItem, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useLayoutContext from 'src/hooks/useAuthLayout';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import axios from 'axios';
import ResultBuscaPaciente from './ResultBuscaPaciente'
import MedicosLista from './medicos'
import CitasTactil from "./CitasTactil";

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

    // const [inputs, setInputs] = useState({});
    // const [layoutName, setLayoutName] = useState("default");
    // const [inputName, setInputName] = useState("default");
    // const keyboard = useRef();

    // const onChangeAll = inputs => {
    //     setInputs({ ...inputs });
    //     console.log("Inputs changed", inputs);
    // };

    // const handleShift = () => {
    //     const newLayoutName = layoutName === "default" ? "shift" : "default";
    //     setLayoutName(newLayoutName);
    // };

    // const onKeyPress = button => {
    //     console.log("Button pressed", button);

    //     if (button === "{shift}" || button === "{lock}") handleShift();
    // };

    // const onChangeInput = event => {
    //     const inputVal = event.target.value;

    //     setInputs({
    //         ...inputs,
    //         [inputName]: inputVal
    //     });

    //     keyboard.current.setInput(inputVal);
    // };

    // const getInputValue = inputName => {
    //     return inputs[inputName] || "";
    // };

    // ----------------Identificarse con Dni

    const { t } = useTranslation();
    const { tipoDocumentosSistComp, mostrarComponent } = useLayoutContext()
    const actionRef1 = useRef(null);
    const [openPeriod, setOpenMenuPeriod] = useState(false);
    const [period, setPeriod] = useState(tipoDocumentosSistComp[0]);
    const [text, setText] = useState('')
    const [lista, setlista] = useState([]);
    const [mostrar, setMostrar] = useState(false);
    const [selected, setSelected] = useState({ paciente: { item: null, selected: false } })
    const [agignacion, setAsignacion] = useState([])
    const [agignacionSelecteds, setAsignacionSelecteds] = useState([])
    const [mostrarCalendario, setMostrarCalendario] = useState(0);

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
    }

    useEffect(() => {
        console.log(selected)

    }, [selected])

    const [pagina1, setPagina1] = useState(true);

    const handleContinuar1 = () => {
        setPagina1(false)
    }
    useEffect(() => {
        setAsignacionSelecteds(agignacion)
        if (agignacion.length > 0) {
            setMostrarCalendario(1)
        }
    }, [agignacion])

    const handleVolver = () => {
        setMostrarCalendario(0)
        setAsignacion([])
        setAsignacionSelecteds([])
    }
 
    return (
        <div className="App">

            {pagina1 ?
                <>
                    <Box style={{ height: "100vh", overflowY: "hidden" }}>

                        <Box style={{ display: "flex", justifyContent: "center", justifyItems: "center", alignContent: "center", alignItems: "center", flexDirection: "column" }}>
                            {/* <Typography style={{ backgroundColor: "white", display: "block" }} variant="h1">Bienvenido</Typography> */}
                            <img style={{ width: "100%" }} src={"https://www.vesalio.com.pe/wp-content/uploads/2017/08/Logo-Vesalio-fondo-blanco.jpg"} alt="ImgVesalio" />
                            <Typography style={{ marginTop: "30px" }} variant="h4">Para generar su cita digite su documento</Typography>
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
                                        <br />
                                        <Button variant="outlined"
                                            onClick={() => mostrarComponent({
                                                contenido: 'registrarPacienteAdminsion',
                                                estado: true,
                                                size: 'xs',
                                                item: text
                                            }, 'modalOpen')}
                                        >
                                            Registrar nuevo paciente
                                        </Button>
                                    </Box>
                                }

                                {selected.paciente.selected &&
                                    <Box>
                                        <Button onClick={handleContinuar1} style={{ position: "absolute", right: "20px" }} variant="contained">Continuar →</Button>
                                    </Box>
                                }
                            </Box>

                        </Box>

                    </Box>

                </>

                :

                <>
                    {
                        mostrarCalendario === 0 ? <MedicosLista setAsignacion={setAsignacion} /> :
                            <CitasTactil lista={lista} selected={selected} agignacionSelecteds={agignacionSelecteds} setAsignacionSelecteds={setAsignacionSelecteds} agignacion={agignacion} handleVolver={handleVolver} />

                    }


                </>

            }

        </div>


    );
}

