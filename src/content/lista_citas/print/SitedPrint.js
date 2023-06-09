import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'


const SitedPrint = React.forwardRef(({ datos }, ref) => {

    const [antecedentes, setAntecedentes] = useState(false);
    const [comentarios, setComentarios] = useState(false);
    const [quirurgico, setQuirurgico] = useState(false);
    const [cubierto, setCubierto] = useState(false);
    const [auditado, setAuditado] = useState(false);


    useEffect(() => {
        if (datos) {
            setAntecedentes(!antecedentes)
            setComentarios(!comentarios)
            setQuirurgico(!quirurgico)
            setCubierto(!cubierto)
            setAuditado(!auditado)
        }
        console.log(datos)
    }, [datos])

    return (
        <div ref={ref}>
            {
                (datos !== null || datos !== undefined) &&

                <Box container style={{ paddingRight: "3.5rem", paddingLeft: "3rem", paddingTop: "3rem", paddingBottom: "1rem", fontSize: "9px", marginTop: "-15px" }}>
                    <Box>
                        <Grid style={{ padding: "0px" }} container rowSpacing={1} columnSpacing={{ xs: 0 }}>

                            <Grid style={{ padding: "0px", textAlign: "center" }} item xs={3}>
                                <img style={{ width: "100px", marginTop: "12px" }} src="/static/images/seguros/20002.JPG" alt="Imgen clinica vesalio" />
                                <h6 style={{ marginTop: "5px" }}>PACÍFICO EPS</h6>
                            </Grid>

                            <Grid style={{ padding: "5px", textAlign: "center" }} item xs={5}>
                                <img style={{ width: "100px", marginTop: "10px", textAlign: "center" }} src="/static/images/seguros/LogoSUSALUD.JPG" alt="Imgen clinica vesalio" />
                            </Grid>

                            <Grid style={{ padding: "5px", textAlign: "right" }} item xs={4}>
                                <h2>CLÍNICA VESALIO</h2>
                            </Grid>

                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "-35px" }}>
                        <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid style={{}} item xs={6}>
                                <div style={{ textAlign: "left", color: "white" }}>null</div>
                            </Grid>
                            <Grid style={{}} item xs={6}>
                                <div style={{ textAlign: "left", color: "white", fontSize: "13px", padding: "1px", backgroundColor: "#000" }}>{`ORDEN DE ATENCIÓN MÉDICA: ${datos.cabecera.CO_AUTOCODE}`}</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "3px" }}>
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={2}>
                                <div style={{ padding: "1px" }}>Datos del Paciente</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ padding: "1px" }}>N°de Asegurado:</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ border: "1px solid black", padding: "1px", minHeight: "18px" }}>{datos.cabecera.CO_ASEGCODE}</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div style={{ padding: "1px" }}>Producto:</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div style={{ border: "1px solid black", padding: "1px", minHeight: "18px" }}>{datos.detalleProducto[0].NO_PRODNAME}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div style={{ padding: "1px", color: "transparent" }}>null</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "3px" }}>
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={2}>
                                <div style={{ padding: "1px", fontSize: "10px" }}>Apellidos y Nombres:</div>
                            </Grid>
                            <Grid item xs={5}>
                                <div style={{ padding: "1px", border: "1px solid black", minHeight: "18px" }}>{`${datos.cabecera.AP_ASEGAPAT} ${datos.cabecera.AP_ASEGAMAT} ${datos.cabecera.NO_ASEGNAME}`}</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ padding: "1px", textAlign: "right", lineHeight: "0.85" }}>Parentesco:</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ padding: "1px", border: "1px solid black", lineHeight: "0.85", minHeight: "18px" }}>{datos.detalleTipoFilacion[0].NO_NAMEFILIACION}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div style={{ border: "1px solid black", borderBottom: "none", padding: "1px" }}>FOTO</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "4px" }}>
                        <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={2}>
                                <div style={{ textAlign: "right", paddingLeft: "3px" }}>Sexo:</div>
                            </Grid>
                            <Grid style={{ maxHeight: "10px" }} item xs={1.5}>
                                <div style={{ textAlign: "left", border: "1px solid black", paddingLeft: "3px", minHeight: "18px" }}>{datos.detalleGenero[0].NO_GENAME}</div>
                            </Grid>
                            <Grid item xs={0.7}>
                                <div style={{ textAlign: "left", paddingLeft: "3px" }}>Edad:</div>
                            </Grid>
                            <Grid item xs={0.5}>
                                <div style={{ textAlign: "left", border: "1px solid black", paddingLeft: "3px", minHeight: "18px" }}>{datos.cabecera.NU_EDADNUM}</div>
                            </Grid>
                            <Grid item xs={1.3}>
                                <div style={{ textAlign: "left", paddingLeft: "3px" }}>Tipo Doc:</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div style={{ textAlign: "left", border: "1px solid black", paddingLeft: "3px", minHeight: "18px" }}>{datos.detalleTipoDocumento[0].DE_NOMCORTO}</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ textAlign: "right", paddingLeft: "3px", fontSize: "9px", minHeight: "18px" }}>Doc. Identidad</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ textAlign: "left", border: "1px solid black", paddingLeft: "3px", minHeight: "18px" }}>{datos.cabecera.NO_DNINAME} </div>
                            </Grid>
                            <Grid style={{}} item xs={2}>
                                <div style={{ textAlign: "left", border: "1px solid black", borderTop: "none", borderBottom: "none", paddingLeft: "3px", color: "white" }}>FOTO</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "4px" }}>
                        <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={2}>
                                <div style={{ textAlign: "right", paddingLeft: "3px" }}>Inicio Vigencia:</div>
                            </Grid>
                            <Grid style={{ maxHeight: "10px" }} item xs={2}>
                                <div style={{ textAlign: "left", border: "1px solid black", paddingLeft: "3px", minHeight: "18px" }}>
                                    {
                                        datos.cabecera.FE_INIVIGDATE === null
                                            ? ''
                                            : datos.cabecera.FE_INIVIGDATE.split('T')[0].split('-')[2] + '/' + datos.cabecera.FE_INIVIGDATE.split('T')[0].split('-')[1] + '/' + datos.cabecera.FE_INIVIGDATE.split('T')[0].split('-')[0]
                                    }
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div style={{ textAlign: "left", paddingLeft: "3px" }}>N° Solicitud Origen:</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div style={{ textAlign: "left", border: "1px solid black", paddingLeft: "3px", minHeight: "18px" }}>{datos.cabecera.CO_ORIGENATE}</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ textAlign: "right", paddingLeft: "3px" }}>Fin Vigenvia:</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ textAlign: "left", border: "1px solid black", paddingLeft: "3px", minHeight: "18px" }}>
                                    {
                                        datos.cabecera.FE_FINVIGDATE === null
                                            ? ''
                                            : datos.cabecera.FE_FINVIGDATE.split('T')[0].split('-')[2] + '/' + datos.cabecera.FE_FINVIGDATE.split('T')[0].split('-')[1] + '/' + datos.cabecera.FE_FINVIGDATE.split('T')[0].split('-')[0]
                                    }
                                </div>
                            </Grid>
                            <Grid style={{}} item xs={2}>
                                <div style={{ textAlign: "left", border: "1px solid black", borderTop: "none", borderBottom: "none", paddingLeft: "3px", color: "white" }}>FOTO</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "4px" }}>
                        <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={2}>
                                <div style={{ textAlign: "right", paddingLeft: "3px" }}>Fecha Nacimiento:</div>
                            </Grid>
                            <Grid style={{ maxHeight: "10px" }} item xs={2}>
                                <div style={{ textAlign: "left", border: "1px solid black", paddingLeft: "3px", minHeight: "18px" }}>
                                    {
                                        datos.cabecera.FE_NACMDATE === null
                                            ? ''
                                            : datos.cabecera.FE_NACMDATE.split('T')[0].split('-')[2] + '/' + datos.cabecera.FE_NACMDATE.split('T')[0].split('-')[1] + '/' + datos.cabecera.FE_NACMDATE.split('T')[0].split('-')[0]
                                    }
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div style={{ textAlign: "left", paddingLeft: "3px" }}>N° Decl. Accidente:</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div style={{ textAlign: "left", border: "1px solid black", paddingLeft: "3px", minHeight: "18px" }}>{datos.cabecera.CO_ACCIDENTES}</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ textAlign: "right", paddingLeft: "3px" }}>Estado:</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ textAlign: "left", border: "1px solid black", paddingLeft: "3px", minHeight: "18px" }}>{datos.detalleEstado[0].NO_ESTADONAME} </div>
                            </Grid>
                            <Grid style={{}} item xs={2}>
                                <div style={{ textAlign: "left", border: "1px solid black", borderTop: "none", borderBottom: "none", paddingLeft: "3px", color: "white" }}>FOTO</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "3px" }}>
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={2}>
                                <div style={{ padding: "1px" }}>Datos del titular</div>
                            </Grid>
                            <Grid item xs={5}>
                                <div style={{ padding: "1px", border: "none", color: "transparent" }}>lorem</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ padding: "1px", textAlign: "right" }}>Estado Civil:</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ padding: "1px", border: "1px solid black", minHeight: "18px" }}>{datos.detalleEstadoCivil[0].NO_ESCIVIL}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div style={{ border: "1px solid black", borderTop: "none", padding: "1px", color: "white" }}>FOTO</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "3px" }}>
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={2}>
                                <div style={{ paddingLeft: "3px", fontSize: "10px" }}>Apellidos y Nombres:</div>
                            </Grid>
                            <Grid item xs={5}>
                                <div style={{ paddingLeft: "3px", border: "1px solid black", minHeight: "18px" }}>{`${datos.cabecera.AP_TITUAPAT} ${datos.cabecera.AP_TITUAMAT} ${datos.cabecera.NO_TITUNAME}`}</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ paddingLeft: "3px", textAlign: "right", fontSize: "9px" }}>N°Contrato/Poliza:</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ paddingLeft: "3px", border: "1px solid black", minHeight: "18px" }}>{datos.cabecera.NU_POLIZA}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div style={{ color: "white" }}>FOTO</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "4px" }}>
                        <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={2}>
                                <div style={{ textAlign: "right", paddingLeft: "3px" }}>Tipo. Doc:</div>
                            </Grid>
                            <Grid style={{ maxHeight: "10px" }} item xs={0.5}>
                                <div style={{ textAlign: "left", border: "1px solid black", paddingLeft: "3px", fontSize: "8px", minHeight: "18px" }}>{datos.detalleTipoDocumentoT[0].DE_NOMCORTO}</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ textAlign: "left", paddingLeft: "3px", fontSize: "10px" }}>Doc. Identidad:</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div style={{ textAlign: "left", border: "1px solid black", paddingLeft: "3px", fontSize: "9px", minHeight: "18px" }}>{datos.cabecera.NU_DNITITULAR}</div>
                            </Grid>
                            <Grid item xs={1.2}>
                                <div style={{ textAlign: "left", paddingLeft: "3px", fontSize: "8px", wordWrap: "break-word" }}>Tipo Afiliación:</div>
                            </Grid>
                            <Grid item xs={0.8}>
                                <div style={{ textAlign: "left", border: "1px solid black", paddingLeft: "3px", wordWrap: "break-word", lineHeight: "0.85", fontSize: "8px", minHeight: "30px" }}>{datos.detalleTipoAfiliacion[0].NO_AFINAME}</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ textAlign: "right", paddingLeft: "3px" }}>Moneda</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ textAlign: "left", border: "1px solid black", paddingLeft: "3px", minHeight: "18px" }}>{datos.detalleTipoMoneda[0].NO_MONENAME} </div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "4px" }}>
                        <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={2}>
                                <div style={{ textAlign: "right", paddingLeft: "3px" }}>N° Plan:</div>
                            </Grid>
                            <Grid style={{ maxHeight: "10px" }} item xs={1.5}>
                                <div style={{ textAlign: "left", border: "1px solid black", paddingLeft: "3px", minHeight: "18px" }}>{datos.cabecera.NU_ASEGPLAN}</div>
                            </Grid>
                            <Grid item xs={1.2}>
                                <div style={{ textAlign: "left", paddingLeft: "3px" }}>Plan Salud:</div>
                            </Grid>
                            <Grid item xs={2.3}>
                                <div style={{ textAlign: "left", border: "1px solid black", paddingLeft: "3px", fontSize: "8px", minHeight: "18px" }}>{datos.detalleTipoPlan[0].NO_TIPOPLAN} </div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "4px" }}>
                        <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={2}>
                                <div style={{ textAlign: "right", paddingLeft: "3px" }}>Contratante:</div>
                            </Grid>
                            <Grid style={{ maxHeight: "10px" }} item xs={5}>
                                <div style={{ textAlign: "left", border: "1px solid black", paddingLeft: "3px", minHeight: "18px" }}>{datos.cabecera.DE_CNTRNAME}</div>
                            </Grid>
                        </Grid>
                    </Box>


                    <Box sx={{ width: "100%", marginTop: "3px" }}>
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={2}>
                                <div style={{ padding: "1px", fontSize: "10px", color: "transparent" }}>null</div>
                            </Grid>
                            <Grid item xs={5}>
                                <div style={{ padding: "1px", color: "white" }}>lorem</div>
                            </Grid>
                            <Grid item xs={5}>
                                <div style={{ padding: "1px", textAlign: "left", fontSize: "8px", backgroundColor: "#ddd " }}>Las facturas y el informe médico correspondientes, deberán remitirlos a nuestra Oficina Principal, de acuerdo al convenio establecido</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "7px" }}>
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={3}>
                                <div style={{ paddingLeft: "3px", color: "transparent" }}>null</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div style={{ paddingLeft: "3px", borderTop: "1px solid black", textAlign: "center" }}>FIRMA DEL AFILIADO</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div style={{ paddingLeft: "3px", textAlign: "right" }}>Fecha y Hora Autorización:</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div style={{ paddingLeft: "3px" }}>{datos.cabecera.FE_AUTODATE}</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "0px" }}>
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={2}>
                                <div style={{ paddingLeft: "3px", textAlign: "right" }}>Especialidad</div>
                            </Grid>
                            <Grid item xs={5}>
                                <div style={{ paddingLeft: "3px", border: "1px solid black", textAlign: "left", minHeight: "18px" }}>{datos.detalleEspecialidad[0].NO_ESPENAME}</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div style={{ paddingLeft: "3px", textAlign: "right" }}>Fecha y Hora Impresión:</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div style={{ paddingLeft: "3px" }}>{datos.cabecera.FE_AUTODATE}</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "7px" }} style={{ fontSize: "7px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 1, md: 1 }}>
                            <Grid item xs={12}>
                                <div style={{ padding: "1px", textAlign: "center", backgroundColor: "#ddd", border: "1px solid black" }}>BENEFICIO AUTORIZADO</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "0px" }} style={{ fontSize: "7px" }} >
                        <Grid style={{ border: "1px solid black" }} container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                            <Grid item xs={1}>
                                <div style={{ padding: "1px", textAlign: "left", backgroundColor: "#ddd ", border: "0.2px solid black", borderTop: "none", borderRight: "none" }}>Código</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div style={{ padding: "1px", textAlign: "left", backgroundColor: "#ddd ", border: "0.2px solid black", borderTop: "none", borderRight: "none" }}>Benficio</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div style={{ padding: "1px", textAlign: "left", backgroundColor: "#ddd ", border: "0.2px solid black", borderTop: "none", borderRight: "none" }}>Restricciones</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ padding: "1px", textAlign: "left", backgroundColor: "#ddd ", border: "0.2px solid black", borderTop: "none", borderRight: "none" }}>Copago Fijo</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ padding: "1px", textAlign: "left", backgroundColor: "#ddd ", border: "0.2px solid black", borderTop: "none", borderRight: "none" }}>Copago Variable</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div style={{ padding: "1px", textAlign: "left", backgroundColor: "#ddd ", border: "0.2px solid black", borderTop: "none", borderRight: "none" }}>Fin Carencia</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div style={{ padding: "1px", textAlign: "left", backgroundColor: "#ddd ", border: "0.2px solid black", borderTop: "none", borderRight: "none" }}>Observación/Condiciones Esp.</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "0px" }} style={{ fontSize: "7px" }} >
                        <Grid style={{ border: "1px solid black" }} container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                            <Grid item xs={1}>
                                <div style={{ padding: "1px", textAlign: "left", border: "0.2px solid black", borderTop: "none", borderRight: "none", minHeight: "27px" }}>{`${datos.cabecera.CO_COBERCODE}${datos.cabecera.CO_SUBTIPOCOBER}`}</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div style={{ padding: "1px", textAlign: "left", border: "0.2px solid black", borderTop: "none", borderRight: "none", minHeight: "27px" }}>{datos.cabecera.NO_SUBTIPOCOBER}</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div style={{ padding: "1px", textAlign: "left", border: "0.2px solid black", borderTop: "none", borderRight: "none", minHeight: "27px" }}>{datos.cabecera.CO_INDIRESTRICODE === '0' ? 'NINGUNO' : 'VER DETALLE'}</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ padding: "1px", textAlign: "left", border: "0.2px solid black", borderTop: "none", borderRight: "none", minHeight: "27px" }}>{`${datos.cabecera.NU_COPGFIJO} ${datos.detalleTipoMoneda[0].NO_MONENAME} POR ATENCIÓN`}</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ padding: "1px", textAlign: "left", border: "0.2px solid black", borderTop: "none", borderRight: "none", minHeight: "27px" }}>{`CUBIERTO AL ${datos.cabecera.NU_COPGVARI}%`}</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div style={{ padding: "1px", textAlign: "left", border: "0.2px solid black", borderTop: "none", borderRight: "none", minHeight: "27px" }}>{
                                    datos.cabecera.FE_FECARDATE === null
                                        ? ''
                                        : datos.cabecera.FE_FECARDATE.split('T')[0].split('-')[2] + '/' + datos.cabecera.FE_FECARDATE.split('T')[0].split('-')[1] + '/' + datos.cabecera.FE_FECARDATE.split('T')[0].split('-')[0]
                                }</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div style={{ padding: "1px", textAlign: "left", border: "0.2px solid black", borderTop: "none", borderRight: "none", minHeight: "27px" }}>{datos.observaciones.segundo}</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "10px" }} style={{ fontSize: "7px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={2}>
                                <div style={{ paddingLeft: "3px", textAlign: "left" }}>Observaciones del Asegurante:</div>
                            </Grid>
                            <Grid item xs={10}>
                                <div style={{ paddingLeft: "3px", border: "1px solid black", lineHeight: "0.85", minHeight: "14px" }}>{datos.observaciones.primero}</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "3px" }} style={{ fontSize: "7px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={2}>
                                <div style={{ paddingLeft: "3px", textAlign: "left" }}>Observaciones Adicionales:</div>
                            </Grid>
                            <Grid item xs={10}>
                                <div style={{ paddingLeft: "3px", border: "1px solid black", lineHeight: "0.85", minHeight: "14px" }}>{datos.cabecera.DE_CONDESPECIALES}</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "2px" }} style={{ fontSize: "10px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 1, md: 1 }}>
                            <Grid item xs={12}>
                                <div style={{ padding: "1px", textAlign: "center", backgroundColor: "#ddd", border: "1px solid black", borderWidth: "0.5px" }}>PARA SER TRATADO POR EL MÉDICO TRATANTE</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "3px" }} style={{ fontSize: "12px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={5}>
                                <div style={{ paddingLeft: "3px", textAlign: "left" }}>¿Qué síntomas y signos presenta el paciente?</div>
                            </Grid>
                            <Grid item xs={7}>
                                <div style={{ paddingLeft: "3px", borderBottom: "1px solid black" }}>{'     '}</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "3px" }} style={{ fontSize: "12px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={3}>
                                <div style={{ paddingLeft: "3px", textAlign: "left" }}>Tiempo de enfermedad</div>
                            </Grid>
                            <Grid item xs={9}>
                                <div style={{ paddingLeft: "3px", borderBottom: "1px solid black", borderWidth: "0.5px" }}>{'     '}</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "7px", height: "18px" }} style={{ fontSize: "12px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                            <Grid item xs={3}>
                                <div style={{ padding: "1px", backgroundColor: "#fff ", }}>¿Antecedentes?</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div style={{ padding: "1px", textAlign: "center", backgroundColor: "#aaa ", border: "0.2px solid black" }}>CIE10</div>
                            </Grid>
                            <Grid item xs={7}>
                                <div style={{ padding: "1px", textAlign: "center", backgroundColor: "#aaa ", border: "0.2px solid black" }}>Descripción del Diagnóstico</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "0px", height: "18px" }} style={{ fontSize: "12px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                            <Grid item xs={1.5}>
                                <Box style={{ padding: "1px", backgroundColor: "#fff ", display: "flex" }}>
                                    <Box style={{ border: "1px solid black", backgroundColor: (antecedentes ? "#aaa" : "white"), color: "transparent", width: "15px", height: "15px", marginRight: "10px" }}>si</Box>
                                    <div>SI</div>
                                </Box>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ padding: "1px", backgroundColor: "#fff ", display: "flex" }}>
                                    <div style={{ border: "1px solid black", backgroundColor: (antecedentes ? "white" : "#aaa"), color: "transparent", width: "15px", height: "15px", marginRight: "10px" }}>no</div>
                                    <div>NO</div>
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div style={{ padding: "1px", textAlign: "center", backgroundColor: "#ddd ", borderTop: "none", border: "0.2px solid black" }}>{'     '}</div>
                            </Grid>
                            <Grid item xs={7}>
                                <div style={{ padding: "1px", textAlign: "center", backgroundColor: "#ddd ", borderTop: "none", border: "0.2px solid black" }}>{'     '}</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "0px", height: "18px" }} style={{ fontSize: "12px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                            <Grid item xs={2}>
                                <div style={{ padding: "1px", backgroundColor: "#fff ", }}>N° de Consultas:</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div style={{ padding: "1px", backgroundColor: "#fff " }}>{'     '}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div style={{ padding: "1px", textAlign: "center", backgroundColor: "#fff ", borderTop: "none", border: "0.2px solid black" }}>{'     '}</div>
                            </Grid>
                            <Grid item xs={7}>
                                <div style={{ padding: "1px", textAlign: "center", backgroundColor: "#fff ", borderTop: "none", border: "0.2px solid black" }}>{'     '}</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "0px", height: "18px" }} style={{ fontSize: "12px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                            <Grid item xs={1}>
                                <div style={{ padding: "1px", backgroundColor: "#fff ", }}>fechas:</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div style={{ padding: "1px", backgroundColor: "#fff " }}>{'     '}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div style={{ padding: "1px", textAlign: "center", backgroundColor: "#ddd ", borderTop: "none", border: "0.2px solid black" }}>{'     '}</div>
                            </Grid>
                            <Grid item xs={7}>
                                <div style={{ padding: "1px", textAlign: "center", backgroundColor: "#ddd ", borderTop: "none", border: "0.2px solid black" }}>{'     '}</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "3px", height: "15px" }} style={{ fontSize: "12px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={12}>
                                <div style={{ paddingLeft: "3px", textAlign: "left" }}>¿Ordenó usted interconsultas cons especialistas? En caso afirmativo</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "0px" }} style={{ fontSize: "12px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={3}>
                                <Box style={{ display: "flex", flexDirection: "column" }}>
                                    <Box style={{ textAlign: "center" }}>
                                        <div>Nombre del Médico:</div>
                                    </Box>
                                    <Box style={{ padding: "1px", backgroundColor: "#fff ", textAlign: "center", borderBottom: "0.2px solid black", marginBottom: "5px" }}>
                                        <div>{'     '}</div>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box style={{ display: "flex", flexDirection: "column" }}>
                                    <Box style={{ textAlign: "center" }}>
                                        <div>Especialidad:</div>
                                    </Box>
                                    <Box style={{ padding: "1px", backgroundColor: "#fff ", textAlign: "center", borderBottom: "0.2px solid black", marginBottom: "5px" }}>
                                        <div>{'     '}</div>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box style={{ display: "flex", flexDirection: "column" }}>
                                    <Box style={{ textAlign: "center" }}>
                                        <div>N° Consultas:</div>
                                    </Box>
                                    <Box style={{ padding: "1px", backgroundColor: "#fff ", textAlign: "center", borderBottom: "0.2px solid black", marginBottom: "5px" }}>
                                        <div>{'     '}</div>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box style={{ display: "flex", flexDirection: "column" }}>
                                    <Box style={{ textAlign: "center" }}>
                                        <div>Fecha:</div>
                                    </Box>
                                    <Box style={{ padding: "1px", backgroundColor: "#fff ", textAlign: "center", borderBottom: "0.2px solid black", marginBottom: "5px" }}>
                                        <div>{'     '}</div>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "10px" }} style={{ fontSize: "12px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                            <Grid item xs={5}>
                                <div style={{ padding: "1px", textAlign: "left", fontSize: "10px" }}>¿Usted ordenó examenes comentarios o especializados?</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <Box style={{ padding: "1px", backgroundColor: "#fff ", display: "flex" }}>
                                    <Box style={{ border: "1px solid black", backgroundColor: (comentarios ? "#aaa" : "white"), color: "transparent", width: "15px", height: "15px", marginRight: "10px" }}>si</Box>
                                    <div>SI</div>
                                </Box>
                            </Grid>
                            <Grid item xs={1.5}>
                                <Box style={{ padding: "1px", backgroundColor: "#fff ", display: "flex" }}>
                                    <Box style={{ border: "1px solid black", backgroundColor: (comentarios ? "white" : "#aaa"), color: "transparent", width: "15px", height: "15px", marginRight: "10px" }}>no</Box>
                                    <div>NO</div>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "5px" }} style={{ fontSize: "12px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                            <Grid item xs={3}>
                                <div style={{ padding: "1px", textAlign: "left", fontSize: "10px" }}>¿Cuáles?</div>
                            </Grid>
                            <Grid item xs={9}>
                                <div style={{ padding: "1px", textAlign: "left", fontSize: "10px", borderBottom: "1px solid black" }}>{'     '}</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "10px" }} style={{ fontSize: "12px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                            <Grid item xs={5}>
                                <div style={{ padding: "1px", textAlign: "left", fontSize: "10px" }}>¿Se practicó algún procedimiento quirúrgico en consulta?</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <Box style={{ padding: "1px", backgroundColor: "#fff ", display: "flex" }}>
                                    <Box style={{ border: "1px solid black", backgroundColor: (quirurgico ? "#aaa" : "white"), color: "transparent", width: "15px", height: "15px", marginRight: "10px" }}>si</Box>
                                    <div>SI</div>
                                </Box>
                            </Grid>
                            <Grid item xs={1.5}>
                                <Box style={{ padding: "1px", backgroundColor: "#fff ", display: "flex" }}>
                                    <Box style={{ border: "1px solid black", backgroundColor: (quirurgico ? "white" : "#aaa"), color: "transparent", width: "15px", height: "15px", marginRight: "10px" }}>no</Box>
                                    <div>NO</div>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "5px" }} style={{ fontSize: "12px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                            <Grid item xs={3}>
                                <div style={{ padding: "1px", textAlign: "left", fontSize: "10px" }}>Proporcionar detalles</div>
                            </Grid>
                            <Grid item xs={9}>
                                <div style={{ padding: "1px", textAlign: "left", fontSize: "10px", borderBottom: "1px solid black" }}>{'     '}</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "7px" }} style={{ fontSize: "10px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={6}>
                                <div style={{ padding: "1px", textAlign: "center", backgroundColor: "#aaa ", border: "0.2px solid black" }}>VISACIÓN EN EL PUNTO DE ATENCIÓN</div>
                            </Grid>
                            <Grid item xs={6}>
                                <div style={{ padding: "1px", textAlign: "center", backgroundColor: "#aaa ", border: "0.2px solid black" }}>VISACIÓN EN EL PUNTO DE TRAMITANTE</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "7px" }} style={{ fontSize: "8px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={6}>
                                <div style={{ padding: "1px", textAlign: "left", backgroundColor: "#fff " }}>Quines firman y suscriben, certifican la autenticidad de los datos del presente formulario correspondencia de la fotografía con el paciente atendido, veracidad del diagnóstico y correspondencia entre diagnóstico y prescripción</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ padding: "1px", textAlign: "left", backgroundColor: "#fff " }}>Nombre Médico</div>
                            </Grid>
                            <Grid item xs={2.5}>
                                <div style={{ padding: "1px", textAlign: "left", backgroundColor: "#fff ", borderBottom: "1px solid black" }}>{'     '}</div>
                            </Grid>
                            <Grid item xs={0.5}>
                                <div style={{ padding: "1px", textAlign: "left", backgroundColor: "#fff " }}>CMP</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ padding: "1px", textAlign: "left", backgroundColor: "#fff ", borderBottom: "1px solid black" }}>{'     '}</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "15px" }} style={{ fontSize: "10px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={6}>
                                <div style={{ padding: "1px", textAlign: "center", backgroundColor: "#fff ", borderTop: "1px solid black" }}>(Firma y sello del punto de atención del paciente)</div>
                            </Grid>
                            <Grid item xs={6}>
                                <div style={{ padding: "1px", textAlign: "center", backgroundColor: "#fff ", borderTop: "1px solid black" }}>(Firma y sello del Médico Tratante o Asistente Médico Tratante)</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "3px" }} style={{ fontSize: "10px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={12}>
                                <div style={{ padding: "1px", textAlign: "center", backgroundColor: "#aaa ", border: "0.2px solid black" }}>PARA SER LLENADO POR EL MÉDICO AUDITOR DE LA IAFAS</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "3px" }} style={{ fontSize: "8px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                            <Grid item xs={1}>
                                <div style={{ padding: "1px", textAlign: "left", fontSize: "10px" }}>Cubierto</div>
                            </Grid>
                            <Grid item xs={1}>
                                <Box style={{ padding: "1px", backgroundColor: "#fff ", display: "flex" }}>
                                    <Box style={{ border: "1px solid black", backgroundColor: (cubierto ? "#aaa" : "white"), color: "transparent", width: "15px", height: "15px", marginRight: "10px" }}>si</Box>
                                    <div>SI</div>
                                </Box>
                            </Grid>
                            <Grid item xs={1.5}>
                                <Box style={{ padding: "1px", backgroundColor: "#fff ", display: "flex" }}>
                                    <Box style={{ border: "1px solid black", backgroundColor: (cubierto ? "white" : "#aaa"), color: "transparent", width: "15px", height: "15px", marginRight: "10px" }}>no</Box>
                                    <div>NO</div>
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                                <div style={{ padding: "1px", textAlign: "left", fontSize: "10px" }}>Auditado</div>
                            </Grid>
                            <Grid item xs={1}>
                                <Box style={{ padding: "1px", backgroundColor: "#fff ", display: "flex" }}>
                                    <Box style={{ border: "1px solid black", backgroundColor: (auditado ? "#aaa" : "white"), color: "transparent", width: "15px", height: "15px", marginRight: "5px" }}>si</Box>
                                    <div>En Base</div>
                                </Box>
                            </Grid>
                            <Grid item xs={1.4}>
                                <Box style={{ padding: "1px", backgroundColor: "#fff ", display: "flex" }}>
                                    <Box style={{ border: "1px solid black", backgroundColor: (auditado ? "white" : "#aaa"), color: "transparent", width: "15px", height: "15px", marginRight: "5px" }}>no</Box>
                                    <div>En Clínica</div>
                                </Box>
                            </Grid>
                            <Grid item xs={1.1}>
                                <div style={{ padding: "1px", textAlign: "right" }}>Nombre:</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div style={{ padding: "1px", textAlign: "left", borderBottom: "1px solid black" }}>{'     '}</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "5px" }} style={{ fontSize: "12px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                            <Grid item xs={2}>
                                <div style={{ padding: "1px", textAlign: "left" }}>Motivo y/o Causa</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div style={{ padding: "1px", textAlign: "left", borderBottom: "1px solid black" }}>{'     '}</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div style={{ padding: "1px", textAlign: "center" }}>Fecha</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div style={{ padding: "1px", textAlign: "left", borderBottom: "1px solid black" }}>{'     '}</div>
                            </Grid>
                            <Grid item xs={1.5}>
                                <div style={{ padding: "1px", textAlign: "center" }}>Firma y Sello</div>
                            </Grid>
                            <Grid item xs={2.5}>
                                <div style={{ padding: "1px", textAlign: "left", borderBottom: "1px solid black" }}>{'     '}</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "30px" }} style={{ fontSize: "8px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={7}>
                                <div style={{ padding: "1px", textAlign: "left", fontSize: "7px", lineHeight: "1" }}><b>IMPORTANTE: La información suscrita es verídica y los médicos tratantes están autorizados para proporcionar cualquier información del acto médico relacionado a la atención, como historias clínicas, certificados, informes, intervenciones quirúrgicas, tratamientos, etc., dispensandolos de las reserva de información conforme a lo dispuesto en el artículo inciso a) de la Ley General de Salud</b></div>
                            </Grid>
                            <Grid item xs={1}>
                                <div style={{ padding: "1px", textAlign: "left", color: "white" }}>null</div>
                            </Grid>
                            <Grid style={{ textAlign: "center" }} item xs={4}>
                                <img src="https://static.vecteezy.com/system/resources/previews/017/059/478/non_2x/barcode-icon-free-png.png" style={{ width: "100px", height: "30px" }} alt="Código de barras" />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "1px" }} style={{ fontSize: "8px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                            <Grid item xs={4}>
                                <div style={{ padding: "1px", textAlign: "left" }}>TORRES, ROSA GRABRIELA LAGE</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div style={{ padding: "1px", textAlign: "left" }}>SITED - Cliente Versión</div>
                            </Grid>
                            <Grid item xs={6}>
                                <div style={{ padding: "1px", textAlign: "lerft" }}>00000401</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ width: "100%", marginTop: "1px" }} style={{ fontSize: "7px" }} >
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={0.5}>
                                <div style={{ padding: "1px", textAlign: "left" }}>Dpto.:</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div style={{ padding: "1px", textAlign: "left" }}>{'     '}</div>
                            </Grid>
                            <Grid item xs={0.6}>
                                <div style={{ padding: "1px", textAlign: "lerft" }}>Provincia:</div>
                            </Grid>
                            <Grid item xs={0.9}>
                                <div style={{ padding: "1px", textAlign: "lef1" }}>{'     '}</div>
                            </Grid>
                            <Grid item xs={0.5}>
                                <div style={{ padding: "1px", textAlign: "left" }}>Distrito:</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div style={{ padding: "1px", textAlign: "lerft" }}>{'     '}</div>
                            </Grid>
                            <Grid item xs={0.6}>
                                <div style={{ padding: "1px", textAlign: "left" }}>Dirección:</div>
                            </Grid>
                            <Grid item xs={4.9}>
                                <div style={{ padding: "1px", textAlign: "left" }}>{'     '}</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div style={{ padding: "1px", textAlign: "right" }}>Página(s):</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div style={{ padding: "1px", textAlign: "right" }}>1 de 1</div>
                            </Grid>
                        </Grid>
                    </Box>


                </Box>



            }
        </div>

    )
}
)


export default SitedPrint

