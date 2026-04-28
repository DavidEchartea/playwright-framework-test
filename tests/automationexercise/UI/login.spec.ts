import { expect } from "@playwright/test";
import { test } from "../../fixtures/fixtures";
import { createUser } from "../../../resources/faker-js";

test.beforeEach(async ({page, homePage}) =>{
    //console.log(process.env.BASE_URL)
    await page.goto('/')
    await expect(homePage.home).toBeVisible()
})

test.describe("Login scenarios", () =>{

    test("Login - Successful", async ({homePage, signUpPage, credentials}) =>{
    await homePage.navigateLogin()
    await signUpPage.login(credentials.user, credentials.password)
    await expect(signUpPage.username).toBeVisible()
    const text = await signUpPage.username.innerText();
    console.log(text);
    })

    test("Login - Incorrect password", async ({homePage, signUpPage, credentials}) =>{
        const user = createUser()
        await homePage.navigateLogin()
        await signUpPage.login(credentials.user, user.password)
        await expect(signUpPage.loginIncorrectPwdMsg).toHaveText("Your email or password is incorrect!")
    })

    test("Login - Incorrect email", async ({homePage, signUpPage, credentials}) =>{
        const user = createUser()
        await homePage.navigateLogin()
        await signUpPage.login(user.email, credentials.password)
        await expect(signUpPage.loginIncorrectPwdMsg).toHaveText("Your email or password is incorrect!")
    })

    test("Login - Empty inputs", async ({homePage, signUpPage, credentials}) =>{
        await homePage.navigateLogin()
        await signUpPage.loginEmptyInputs()
        const message = await signUpPage.loginEmail.evaluate( (el:HTMLInputElement) => !el.validity.valid)
        expect(message).toBe(true);
    })

})

test.afterEach(async ({page})=>{
    await page.close()
})