import {
    CardContent,
    Avatar,
    Typography,
    ListItemAvatar,
    Card,
    ListItemText,
    ListItem,
    styled,
    Button,
    Divider
} from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { useEffect, useState } from 'react';
import useLayoutContext from 'src/hooks/useAuthLayout';

const AvatarSuccess = styled(Avatar)(
    ({ theme }) => `
        background-color: ${theme.colors.success.main};
        color: ${theme.palette.primary.contrastText};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
        box-shadow: ${theme.colors.shadows.success};
  `
);

const CardContentWrapper = styled(CardContent)(
    ({ theme }) => `
       padding: ${theme.spacing(2.5, 3, 3)};
       &:last-child {
       padding-bottom: 0;
       }
  `
);

function ActiveReferrals({ item }) {
    const [hoy, sethoy] = useState(false)
    const { mostrarComponent } = useLayoutContext();
    const [value, setValue] = useState(null)
    useEffect(() => {
        let existeHoy = new Date()
        if (existeHoy.toISOString().split('T')[0] === item.fecha) {
            sethoy(true)
        }
        setValue(item)
    }, [item])

    const anularCita = async (id) => {
        mostrarComponent({
            contenido: 'anularCita',
            estado: true,
            size: 'xs',
            item: id
        }, 'modalOpen')
    }

    return (
        <>

            {
                value !== null && 
                <Card sx={{ background: hoy ? "#bdecb6" : 'white' }}>
                    <CardContentWrapper>
                        <Typography variant="overline" color="text.primary">
                            {`${value.nombre_paciente}`}
                        </Typography>

                        <ListItem
                            disableGutters
                            sx={{
                                my: 1
                            }}
                            component="div"
                        >
                            <ListItemAvatar>
                                <AvatarSuccess variant="rounded">
                                    <HealthAndSafetyIcon fontSize="large" />
                                </AvatarSuccess>
                            </ListItemAvatar>

                            <ListItemText
                                primary={`${value.especialidad_nombre} ${hoy ? "(HOY)" : ''}`}
                                primaryTypographyProps={{
                                    variant: 'h3',
                                    sx: {
                                        ml: 2
                                    },
                                    noWrap: true
                                }}
                                secondary={'Dr. ' + value.nombre_doctor}
                                secondaryTypographyProps={{
                                    variant: 'h6',
                                    sx: {
                                        ml: 2
                                    },
                                    noWrap: true
                                }}
                            />
                        </ListItem>

                        <ListItem
                            disableGutters

                            component="div"
                        >
                            <ListItemText
                                primary={
                                    <>
                                        <Typography variant="overline" color="text.primary">
                                            {value.lugar_nombre}
                                        </Typography>
                                        <Typography variant="overline" color="text.primary" sx={{ float: 'right' }}>
                                            {value.fecha.split('-')[2] + '-' + value.fecha.split('-')[1] + '-' + value.fecha.split('-')[0] + ' ' + value.hora.split(':')[0] + ':' + value.hora.split(':')[1]}
                                        </Typography>
                                    </>
                                }
                                primaryTypographyProps={{ variant: 'body2', noWrap: true }}
                            />
                        </ListItem>
                        <Divider />
                    </CardContentWrapper>

                    <Button
                        variant="outlined"
                        color={"error"}
                        sx={{ mx: 2, mb: 2 }}
                        onClick={() => anularCita(value.id)}>
                        Anular cita
                    </Button>


                </Card>
            }

        </>

    );
}

export default ActiveReferrals;
