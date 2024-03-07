const patientCardTemplate = document.querySelector("[data-patient-template]")
const patientCardContainer = document.querySelector("[data-patient-cards-container]")
const searchName = document.querySelector("[data-search-name]")
const searchDOB = document.querySelector("[data-search-DOB]")
const searchSex = document.querySelector("[data-search-sex]")
const searchBloodType = document.querySelector("[data-search-bloodtype]")

let patients = []

searchName.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    patients.forEach(patient => {
        const isVisible = patient.name.toLowerCase().includes(value)
        patient.element.classList.toggle("hide", !isVisible)
    })
})
searchDOB.addEventListener("input", (e) => {
    const value = e.target.value
    patients.forEach(patient => {
        const isVisible = patient.DOB.includes(value)
        patient.element.classList.toggle("hide", !isVisible)
    })
})
searchSex.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    patients.forEach(patient => {
        const isVisible = patient.Sex.toLowerCase().includes(value)
        patient.element.classList.toggle("hide", !isVisible)
    })
})
searchBloodType.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    patients.forEach(patient => {
        const isVisible = patient.Bloodtype.toLowerCase().includes(value)
        patient.element.classList.toggle("hide", !isVisible)
    })
})

fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()).then(data => {
    patients = data.map(patient => {
        const card = patientCardTemplate.content.cloneNode(true).children[0]
        const name = card.querySelector("[data-name]")
        const DOB = card.querySelector("[data-DOB]")
        const Sex = card.querySelector("[data-Sex]")
        const Bloodtype = card.querySelector("[data-Bloodtype]")
        const currentMedication = card.querySelector("[data-Current-Medication]")
        //make sure to change the data given to their names, dob, sex, bloodtype, and current meds
        name.textContent = 'Name: ' + patient.name
        DOB.textContent = 'DOB: ' + patient.id
        Sex.textContent = 'Sex: ' + patient.username
        Bloodtype.textContent = 'Blood Type: ' + patient.email
        currentMedication.textContent = 'Current Medication: ' +

        patientCardContainer.append(card)
        return{name: patient.name, DOB: patient.id, Sex: patient.username, Bloodtype: patient.email, element: card}
    })
})

// fetch("http://localhost:3000/patientdata").then(res => res.json()).then(data => {
//     patients = data.map(patient => {
//         const card = patientCardTemplate.content.cloneNode(true).children[0]
//         const name = card.querySelector("[data-name]")
//         const DOB = card.querySelector("[data-DOB]")
//         const Sex = card.querySelector("[data-Sex]")
//         const Bloodtype = card.querySelector("[data-Bloodtype]")
//         const currentMedication = card.querySelector("[data-Current-Medication]")
//         //make sure to change the data given to their names, dob, sex, bloodtype, and current meds
//         name.textContent = 'Name: ' + patient.name
//         DOB.textContent = 'DOB: ' + patient.id
//         Sex.textContent = 'Sex: ' + patient.username
//         Bloodtype.textContent = 'Blood Type: ' + patient.email
//         currentMedication.textContent = 'Current Medication: ' +

//         patientCardContainer.append(card)
//         return{name: patient.name, DOB: patient.id, Sex: patient.username, Bloodtype: patient.email, element: card}
//     })
// })