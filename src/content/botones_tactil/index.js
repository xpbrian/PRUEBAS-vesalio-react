
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Helmet } from 'react-helmet-async';
import { Divider, Grid, Typography, styled, Card, Tooltip, CardActionArea, CardContent, Avatar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useNavigate } from 'react-router';

const CardAddAction = styled(Card)(
    ({ theme }) => `
          border: ${theme.colors.primary.main} dashed 1px;
          height: 100%;
          color: ${theme.colors.primary.main};
          transition: ${theme.transitions.create(['all'])};
          
          .MuiCardActionArea-root {
            height: 100%;
            justify-content: center;
            align-items: center;
            display: flex;
          }
          
          .MuiTouchRipple-root {
            opacity: .2;
          }
          
          &:hover {
            border-color: ${theme.colors.alpha.black[70]};
          }
  `
);
const CardAddActionError = styled(Card)(
    ({ theme }) => `
          border: ${theme.colors.error.main} dashed 1px;
          height: 100%;
          color: ${theme.colors.error.main};
          transition: ${theme.transitions.create(['all'])};
          
          .MuiCardActionArea-root {
            height: 100%;
            justify-content: center;
            align-items: center;
            display: flex;
          }
          
          .MuiTouchRipple-root {
            opacity: .2;
          }
          
          &:hover {
            border-color: ${theme.colors.alpha.black[70]};
          }
  `
);
const AvatarAddWrapper = styled(Avatar)(
    ({ theme }) => `
          background: ${theme.colors.alpha.black[10]};
          color: ${theme.colors.primary.main};
          width: ${theme.spacing(8)};
          height: ${theme.spacing(8)};
  `
);
const AvatarAddWrapperError = styled(Avatar)(
    ({ theme }) => `
          background: ${theme.colors.alpha.black[10]};
          color: ${theme.colors.error.main};
          width: ${theme.spacing(8)};
          height: ${theme.spacing(8)};
  `
);
function DashboardAnalytics() {
    const { t } = useTranslation();
    const navigate = useNavigate()
    const anularCita = () => {
        navigate(`/citas/anular-cita`);
    }
    const generarCita =()=>{
        console.log("estoy aqui");
        navigate(`/citas/tactil`);
    }
    return (
        <>
            <Helmet>
                <title>Clínica vesalio -  Mis citas</title>
            </Helmet>
            <PageTitleWrapper>
                <Grid container alignItems="center">
                    <Grid item xs={12} lg={12}>
                        <Typography variant={'h3'} component={'h3'} gutterBottom>
                            {t('Bienvenido al modulo de citas de la clinica Vesalio')}
                        </Typography>
                        <Typography variant="subtitle2">
                            <b>{'Seleccione una opción'}</b>
                        </Typography>

                    </Grid>
                </Grid>
            </PageTitleWrapper>
            <Divider />
            <Grid
                sx={{
                    px: 4,
                    mt: 1,
                    pb: 2
                }}
                container
                direction="row"

                alignItems="stretch"
                spacing={4}
            >
                <Grid item lg={12} md={12} xs={12}>
                    <Grid
                        container
                        spacing={4}
                        direction="row"
                        alignItems="stretch"
                        justifyContent={"center"}
                    >
                        <Grid xs={12} sm={3} md={3} lg={3} item>
                            <Tooltip arrow title={t('Generar cita rápida')}>
                                <CardAddAction>
                                    <CardActionArea
                                        sx={{
                                            px: 1
                                        }}
                                        onClick={generarCita}
                                    >
                                        <CardContent>
                                            <AvatarAddWrapper>
                                                <AddTwoToneIcon fontSize="large" />
                                            </AvatarAddWrapper>
                                            <Typography>Generar Cita</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </CardAddAction>
                            </Tooltip>
                        </Grid>
                        <Grid xs={12} sm={3} md={3} lg={3} item>
                            <Tooltip arrow title={t('Anular Cita')}>
                                <CardAddActionError>
                                    <CardActionArea
                                        sx={{
                                            px: 1
                                        }}
                                        onClick={anularCita}
                                    >
                                        <CardContent>
                                            <AvatarAddWrapperError>
                                                <HighlightOffIcon fontSize="large" />
                                            </AvatarAddWrapperError>
                                            <Typography>Anular Cita</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </CardAddActionError>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default DashboardAnalytics;
