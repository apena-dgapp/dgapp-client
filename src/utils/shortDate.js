export const shortDate = (date) => {
    const meses = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
    ];

    const dias_semana = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
    ];

    const fecha = new Date(date);
    // Construimos el formato de salida
    const fechaES =
        dias_semana[fecha.getDay()] +
        ", " +
        fecha.getUTCDate() +
        " de " +
        meses[fecha.getMonth()] +
        " de " +
        fecha.getUTCFullYear();

    return fechaES
}
