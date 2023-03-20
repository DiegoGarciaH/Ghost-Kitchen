const formatearDinero = cantidad => {
    return cantidad.toLocaleString('es-Es', {
        style: 'currency',
        currency: "MXN"
    })
}


export { formatearDinero };