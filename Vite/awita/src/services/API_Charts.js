//Data for the Charts
const getIngresosPlan = 'http://localhost:9099/api/sp/ingresosPlan'
const getSuscripcionPlan = 'http://localhost:9099/api/sp/suscripcionesPlan'

const apiAnalysis = async (option) => {
    let url = option == 1 ? getIngresosPlan : getSuscripcionPlan
    await fetch(url)
        .then((res) => {
            if (res.ok) {
                console.log(`HTTP sp request GET successful`)
            } else {
                consol.log(`HTTP sp request GET unsuccessful`)
            }
            return res
        })
        .then((res) => res.json())
        .then((data) => {
            return data
        })
        .catch((error) => console.log(error))
}

export default{
    apiAnalysis
}