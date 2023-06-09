import axios from 'axios';
import { useEffect, useState } from 'react'
import Lista from './Lista'

export default function Emergencia({ alephoo }) {
    const [datos, setDatos] = useState([])
    useEffect(() => {
        const getDatos = async (dni) => {
            const rpta = await axios.get(`http://200.121.91.211:4001/recuperarEmergencia/${dni}`)
            setDatos(rpta.data);
        }
        getDatos(alephoo.documento)
    }, [alephoo])

    return (
        <>
            <Lista datos={datos} />
        </>
    )
}
