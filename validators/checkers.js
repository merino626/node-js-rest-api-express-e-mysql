function validateConsultPost(consultPost){
    const invalid = 
        !consultPost.customer       ||
        !consultPost.pet            ||
        !consultPost.service        ||
        !consultPost.consult_status ||
        !consultPost.observations   ||
        !consultPost.consult_date   ||
        !ValidStrings(consultPost)  ||
        !validateCustomerSize(consultPost.customer) ||
        !validatePetSize(consultPost.pet) ||        
        !validateServiceSize(consultPost.service) ||
        !validateConsultStatusSize(consultPost.consult_status) ||
        !validateConsultDateSize(consultPost.consult_date)

    return invalid
}

// Estou bolando ainda esta função
function validacoes(consultPost){
    const customer = consultPost.customer
    const pet = consultPost.pet
    const service = consultPost.service
    const consult_status = consultPost.consult_status
    const date = consultPost.date

    const validacoes = [
        {
            nome:"customer",
            validation: validateCustomerSize.bind(customer),
            message: 'The customer size should have at least 3 digits minimum and 50 digits maximum'
        },
        {
            nome:"pet",
            validation: validatePetSize.bind(pet),
            message: 'The pet size should have at least 3 digits minimum and 20 digits maximum'
        },
        {
            nome:"service",
            validation: validateServiceSize.bind(service),
            message: 'The service size should have at least 4 digits minimum and 20 digits maximum'
        },
        {
            nome:"consultStatus",
            validation: validateConsultStatusSize.bind(consult_status),
            message: 'The consult status size should have at least 4 digits minimum and 20 digits maximum'
        },
        {
            nome:"consultDate",
            validation: validateConsultDateSize.bind(date),
            message: 'The date size should have 19 characters exacly. Eg: DD/MM/YYYY HH:MM:SS'
        },
    ]
    return validacoes
}

function ValidStrings(object){
    let validString = Object.values(object).filter(item => {
        return !(typeof item === 'string')
    })
    return validString.length > 0 ? false : true
}


function validateCustomerSize(customer){
    return !(customer.length < 3 || customer.length > 50)
}

function validatePetSize(pet){
    return !(pet.length < 3 || pet.length > 20)
}

function validateServiceSize(service){
    return !(service.length < 4 || service.length > 20)
}

function validateConsultStatusSize(consultStatus){
    return !(consultStatus.length < 4 || consultStatus.length > 20)
}

function validateConsultDateSize(consultdate){
    return !(consultdate.length !== 19)
}

module.exports = {validateConsultPost, validacoes}