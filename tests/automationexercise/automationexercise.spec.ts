import { expect } from "@playwright/test";
import { Home } from "../../pages/automationexercise/Home";
import { Signup } from "../../pages/automationexercise/SignUp";
import { test } from "../fixtures/fixtures";

test.beforeEach(async ({page, homePage}) =>{
    console.log(process.env.BASE_URL)
    await page.goto('/')
    await expect(homePage.home).toBeVisible()
})

test.describe("Login scenarios", () =>{

    test("Login - Successful", async ({homePage, signUpPage, credentials}) =>{
    await homePage.login.click()
    await signUpPage.login(credentials.user, credentials.password)
    })

})

test.describe("Create account scenarios", () =>{

    test("Create account - Successful", async ({homePage, signUpPage}) =>{
        const number = Math.floor(Math.random() * 999) + 1
        const randomEmail = "testingpw"+number+"@test.com"
    
        await homePage.login.click()
        await signUpPage.signup("Testing Automation", randomEmail, "automationpw", "6", "7", "1997", "Testing", "Automation", "Google", "Blvd Hill", "", "United States", "Texas", "Houston", "123545", "999999999")
    })
})

test.afterEach(async ({page})=>{
    await page.close()
})