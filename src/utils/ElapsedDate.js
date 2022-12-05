export function getElapsedDate(date) {
    var nacimiento = new Date(date)
    var hoy = new Date()

    var tiempoPasado = hoy - nacimiento
    var segs = 1000;
    var mins = segs * 60;
    var hours = mins * 60;
    var days = hours * 24;
    var months = days * 30.416666666666668;
    var years = months * 12;

    //calculo 
    var anos = Math.floor(tiempoPasado / years);

    tiempoPasado = tiempoPasado - (anos * years);
    var meses = Math.floor(tiempoPasado / months)

    tiempoPasado = tiempoPasado - (meses * months);
    var dias = Math.floor(tiempoPasado / days)

    tiempoPasado = tiempoPasado - (dias * days);
    var horas = Math.floor(tiempoPasado / hours)

    tiempoPasado = tiempoPasado - (horas * hours);
    var minutos = Math.floor(tiempoPasado / mins)

    tiempoPasado = tiempoPasado - (minutos * mins);
    // var segundos = Math.floor(tiempoPasado / segs)

    const value = {
        year: anos,
        month: meses,
        day: dias
    }

    return value

    // console.log(`Han pasado ${anos} años, ${meses} meses,  ${dias} dias, ${horas} horas, y ${minutos} minutos desde que naciste. Ya chocheas...!!`)
}