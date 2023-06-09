import React, { useEffect, useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout'
import Comprobar from './comprobar'
import Emergencia from './emergencia'

export default function Index() {
    const [contenido, setContenido] = useState(null)
    const { drawerOpen } = useLayoutContext()

    useEffect(() => {
        setContenido(drawerOpen.item.tipoContenido.id)
    }, [drawerOpen])

    return (
        <>
            {
                contenido === 'comprobar' && <Comprobar alephoo={drawerOpen.item.alephoo} />
            }
            {
                contenido === 'emergencia' && <Emergencia alephoo={drawerOpen.item.alephoo} />
            }
        </>
    )
}
