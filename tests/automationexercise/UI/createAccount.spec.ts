import { expect } from "@playwright/test";
import { test } from "../../fixtures/fixtures";
import { createUser } from "../../../resources/faker-js";

test.beforeEach(async ({page, homePage}) =>{
    //console.log(process.env.BASE_URL)
    await page.goto('/')
    await expect(homePage.home).toBeVisible()
})

test.describe("Create account scenarios", () =>{

    test("Create account - Successful", async ({homePage, signUpPage, user}) =>{
        //const userOR = createUser({country: 'Mexico'}) //use override to insert custom value instead of random
        const accountCreatedMessage = "Account Created!"
        await homePage.navigateLogin()
        await signUpPage.registerNewUser(user.name, user.email, user.password, user.dob.day, user.dob.month, user.dob.year,
             user.firstName, user.lastName,user.company, user.addressLn1, user.addressLn2, user.country, user.state, user.city, user.zipcode, user.phone)
             
        await expect(await signUpPage.getAccountCreatedMessage()).toContain(accountCreatedMessage)
        await signUpPage.continueBtn.click()
        
    })

    test("Create account - email already in used", async ({homePage, signUpPage, testData}) =>{
        const signupEmailMsg = "Email Address already exist!"
        await homePage.navigateLogin()
        await signUpPage.signUp(testData["createUser-emailUsed"].name, testData["createUser-emailUsed"].email)
        await expect(signUpPage.signupEmailMsg).toHaveText(signupEmailMsg)
    })

    test("Create account - empty inputs", async ({homePage, signUpPage}) =>{
        await homePage.navigateLogin()
        await signUpPage.signUpEmptyInputs()
        const message = await signUpPage.signupName.evaluate( (el:HTMLInputElement) => !el.validity.valid)
        expect(message).toBe(true);
    })

    test("Create account - Invalid email", async({homePage, signUpPage, user}) =>{
        const userOverride = createUser({ email: 'invalidemail'})
        await homePage.navigateLogin()
        await signUpPage.signUp(user.name, userOverride.email)
        const message = await signUpPage.signupEmail.evaluate( (el:HTMLInputElement) => !el.validity.valid)
        expect(message).toBe(true);

    })
})

test.afterEach(async ({page})=>{
    await page.close()
})