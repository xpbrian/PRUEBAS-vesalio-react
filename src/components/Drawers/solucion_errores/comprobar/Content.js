import { Button, Card, CardContent, CardHeader, Divider } from '@mui/material'
import Label from 'src/components/Label'
import Lista from './Lista'

export default function Content({ objeto }) {
    console.log(objeto);

    return (
        <>
            <Card sx={{ m: 2 }}>
                <CardHeader
                    title={objeto.titulo}
                />
                <Divider />
                <CardContent>
                    {
                        objeto.item === null && <Button
                            variant="outlined"
                            size='large'
                            onClick={() => objeto.handleClick()}
                        >

                            Registrar
                        </Button>
                    }
                    {
                        objeto.item !== null && <Label color='success'>Correcto</Label>
                    }

                    {
                        objeto.mostrarTabla && <Lista datos={objeto.table} />
                    }
                </CardContent>

            </Card>

        </>
    )
}
