import { faker } from "@faker-js/faker";

const allowedCountries = ['India', 'United States', 'Canada', 'Australia', 'New Zealand', 'Singapore']
export function createUser(overrides = {}){
    return{
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        dob : createBirthDate(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        company: faker.company.name(),
        addressLn1: faker.location.streetAddress(),
        addressLn2: faker.location.secondaryAddress(),
        country: faker.helpers.arrayElement(allowedCountries),
        state: faker.location.state(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        phone: faker.phone.number(),
        ...overrides
    }
}

export function createBirthDate(){
    const date = faker.date.birthdate({min: 18, max: 70, mode: 'age'})

    return{
        day: date.getDate().toString().padStart(1,'0'),
        month: (date.getMonth() + 1).toString().padStart(1,'0'),
        year: date.getFullYear().toString()
    }
}