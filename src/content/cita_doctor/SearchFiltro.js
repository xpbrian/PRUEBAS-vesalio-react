// import { DatePicker } from '@mui/lab';
import { Button, FormControl, Grid, InputAdornment, Menu, MenuItem, OutlinedInput, styled, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import SearchIcon from '@mui/icons-material/Search';

const OutlinedInputWrapper = styled(OutlinedInput)(
    ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};
  `
);

export default function SearchFiltro({ filter, handleChangedFilter, handleBuscarFiltro }) {
    const tipos = [{ id: 'documento_paciente', nombre: '#Documento' }, { id: 'nombre_paciente', nombre: 'Apellidos' }]
    const { t } = useTranslation();
    const actionRef1 = useRef(null);
    const [openPeriod, setOpenMenuPeriod] = useState(false);
    const [period, setPeriod] = useState(tipos[0]);

    return (
        <>
            <Grid
                container
                direction="row"
                sx={{ px: 2 }}
                justifyContent="center"
                alignItems="stretch"
                spacing={1}
            >
                <Grid item xs={12} lg={2} md={2}>
                    <TextField fullWidth
                        type={'date'}
                        onChange={(e) => {
                            handleChangedFilter('fecha', e.target.value)
                        }}
                        value={filter.fecha}
                        variant="outlined" />
                </Grid>
                <Grid item xs={12} lg={4} md={3}>
                    <FormControl variant="outlined" fullWidth>
                        <OutlinedInputWrapper
                            value={filter.paciente === null ? '' : filter.paciente}
                            onChange={(e) => handleChangedFilter('paciente', e.target.value)}
                            type="text"
                            placeholder={t('Ingrese datos del paciente...')}
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
                                        {period.nombre}
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
                                        {tipos.map((_period) => (
                                            <MenuItem
                                                key={_period.id}
                                                onClick={() => {
                                                    setPeriod(_period);
                                                    setOpenMenuPeriod(false);
                                                    handleChangedFilter('tipo_paciente', _period.id)
                                                }}
                                            >
                                                {_period.nombre}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} lg={2} md={2}>
                    <Button style={{ height: "53px", fontSize:'17px' }} variant='contained'
                        onClick={() => handleBuscarFiltro()}
                        fullWidth startIcon={<SearchIcon fontSize='large' />}>Buscar</Button>
                </Grid>
            </Grid>
        </>
    )
}
