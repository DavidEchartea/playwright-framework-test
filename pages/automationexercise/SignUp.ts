import {Page, Locator, expect} from "@playwright/test"

export class Signup{
    readonly page: Page
    readonly signupName: Locator
    readonly signupEmail: Locator
    readonly signupBtn: Locator
    readonly signupEmailMsg: Locator
    readonly registerTitleMr: Locator
    readonly registerTitleMrs: Locator
    readonly registerName: Locator
    readonly registerEmail: Locator
    readonly registerPassword: Locator
    readonly registerDOB: Locator
    readonly registerMOB: Locator   
    readonly registerYOB: Locator
    readonly registerNewsletter: Locator
    readonly registerOffers: Locator
    readonly registerFirstName: Locator
    readonly registerLastName: Locator
    readonly registerCompany: Locator
    readonly registerAddress: Locator
    readonly registerAddressLn2: Locator
    readonly registerCountry: Locator
    readonly registerState: Locator
    readonly registerCity: Locator
    readonly registerZipCode: Locator
    readonly registerPhone: Locator
    readonly registerBtn: Locator
    readonly accountCreatedMsg: Locator
    readonly continueBtn: Locator
    readonly username: Locator

    readonly loginEmail: Locator
    readonly loginPassword: Locator
    readonly loginBtn: Locator
    readonly loginIncorrectPwdMsg: Locator

    constructor(page: Page){
        this.page = page
        this.signupName = page.locator('input[data-qa="signup-name"]')
        this.signupEmail = page.locator('input[data-qa="signup-email"]')
        this.signupBtn = page.getByRole("button", {name: 'Signup'})
        this.signupEmailMsg = page.locator('form[action="/signup"]').locator(':text-is("Email Address already exist!")')
        this.registerTitleMr = page.locator('#id_gender1')
        this.registerTitleMrs = page.locator('#id_gender2')
        this.registerName = page.locator('#name')
        this.registerEmail = page.locator('#email')
        this.registerPassword = page.locator('#password')
        this.registerDOB = page.locator('select[data-qa="days"]')
        this.registerMOB = page.locator('select[data-qa="months"]')
        this.registerYOB = page.locator('select[data-qa="years"]')
        this.registerNewsletter = page.locator('#newsletter')
        this.registerOffers = page.locator('#optin')
        this.registerFirstName = page.locator('input[data-qa="first_name"]')
        this.registerLastName = page.locator('input[data-qa="last_name"]')
        this.registerCompany = page.locator('input[data-qa="company"]')
        this.registerAddress = page.locator('input[data-qa="address"]')
        this.registerAddressLn2 = page.locator('input[data-qa="address2"]')
        this.registerCountry = page.locator('select[data-qa="country"]')
        this.registerState = page.locator('input[data-qa="state"]')
        this.registerCity = page.locator('input[data-qa="city"]')
        this.registerZipCode = page.locator('input[data-qa="zipcode"]')
        this.registerPhone = page.locator('input[data-qa="mobile_number"]')
        this.registerBtn = page.getByRole("button", {name: 'Create Account'})
        this.accountCreatedMsg = page.locator('h2[data-qa="account-created"]')
        this.continueBtn = page.locator('a[data-qa="continue-button"]')

        this.loginEmail = page.locator('input[data-qa="login-email"]')
        this.loginPassword = page.locator('input[data-qa="login-password"]')
        this.loginBtn = page.getByRole("button", {name: 'Login'})
        this.username = page.getByText("Logged in as")
        this.loginIncorrectPwdMsg = page.locator("form[action='/login']").locator(":text-is('Your email or password is incorrect!')")

    }
    
    async login(loginEmail: string, loginPassword: string){
        await this.loginEmail.fill(loginEmail)
        await this.loginPassword.fill(loginPassword)
        await this.loginBtn.click()
    }

    async signUp(signupName: string, signupEmail: string){
        await this.signupName.fill(signupName)
        await this.signupEmail.fill(signupEmail)
        await this.signupBtn.click()
    }

    async registerNewUser(signupName: string, signupEmail: string, registerPassword: string, registerDOB: string, registerMOB: string, registerYOB: string, registerFirstName: string, registerLastName: string, 
        registerCompany: string, registerAddress: string, registerAddressLn2: string, registerCountry: string, registerState: string, registerCity: string, registerZipCode: string, registerPhone: string){
            await this.signUp(signupName, signupEmail)
            await this.registerTitleMr.click()
            await this.registerPassword.fill(registerPassword)
            await this.registerDOB.selectOption(registerDOB)
            await this.registerMOB.selectOption(registerMOB)
            await this.registerYOB.selectOption(registerYOB)
            await this.registerFirstName.fill(registerFirstName)
            await this.registerLastName.fill(registerLastName)
            await this.registerCompany.fill(registerCompany)
            await this.registerAddress.fill(registerAddress)
            await this.registerAddressLn2.fill(registerAddressLn2)
            await this.registerCountry.selectOption(registerCountry)
            await this.registerState.fill(registerState)
            await this.registerCity.fill(registerCity)
            await this.registerZipCode.fill(registerZipCode)
            await this.registerPhone.fill(registerPhone)
            await this.registerBtn.click()
    }

    async signUpEmptyInputs(){
        await this.signupBtn.click()
    }

    async loginEmptyInputs(){
        await this.loginBtn.click()
    }

    async getAccountCreatedMessage(): Promise<string> {
        return await this.accountCreatedMsg.textContent() ?? "";
    }   

}