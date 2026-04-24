import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { createUser } from "../../resources/faker-js";
import { homedir } from "os";

test.beforeEach(async ({page, homePage}) =>{
    //console.log(process.env.BASE_URL)
    await page.goto('/')
    await expect(homePage.home).toBeVisible()
})

test.describe("Login scenarios", () =>{

    test("Login - Successful", async ({homePage, signUpPage, credentials}) =>{
    await homePage.navigateLogin()
    await signUpPage.login(credentials.user, credentials.password)
    })

    test("Login - Incorrect password", async ({homePage, signUpPage, credentials}) =>{
        const user = createUser()
        await homePage.navigateLogin()
        await signUpPage.failLogin(credentials.user, user.password)
    })

    test("Login - Incorrect email", async ({homePage, signUpPage, credentials}) =>{
        const user = createUser()
        await homePage.navigateLogin()
        await signUpPage.failLogin(user.email, credentials.password)
    })

    test("Login - Empty inputs", async ({homePage, signUpPage, credentials}) =>{
        await homePage.navigateLogin()
        await signUpPage.loginEmptyInputs()
    })

})

test.describe("Create account scenarios", () =>{

    test("Create account - Successful", async ({homePage, signUpPage, user}) =>{
        //const userOR = createUser({country: 'Mexico'}) //use override to insert custom value instead of random
        await homePage.navigateLogin()
        await signUpPage.registerNewUser(user.name, user.email, user.password, user.dob.day, user.dob.month, user.dob.year, user.firstName, user.lastName,
             user.company, user.addressLn1, user.addressLn2, user.country, user.state, user.city, user.zipcode, user.phone)
    })

    test("Create account - email already in used", async ({homePage, signUpPage, testData}) =>{
        await homePage.navigateLogin()
        await signUpPage.signUpExistingEmail(testData["createUser-emailUsed"].name, testData["createUser-emailUsed"].email)
    })

    test("Create account - empty inputs", async ({homePage, signUpPage}) =>{
        await homePage.navigateLogin()
        await signUpPage.signUpEmptyInputs()
    })

    test("Create account - Invalid email", async({homePage, signUpPage, user}) =>{
        const userOverride = createUser({ email: 'invalidemail'})
        await homePage.navigateLogin()
        await signUpPage.signUpInvalidEmail(user.name, userOverride.email)

    })
})

test.afterEach(async ({page})=>{
    await page.close()
})