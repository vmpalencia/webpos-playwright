import { type Locator, type Page, expect } from '@playwright/test'
import { AppointmentHistory } from '../pages/appointment-history'

export class LoginPage {

    constructor(private readonly page: Page) {}

    get emailField(): Locator { return this.page.getByRole('textbox', { name: 'Email' }) }
    get passwordField(): Locator { return this.page.getByRole('textbox', { name: 'Password' }) }
    get loginBtn(): Locator { return this.page.getByRole('button', { name: 'Login' }) }
    get errorMsg(): Locator { return this.page.locator('.css-18s5xoe') } // change
    get emailErrorMsg(): Locator { return this.page.getByText('email is a required field') }
    get passwordErrorMsg(): Locator { return this.page.getByText('password must be at least 5 characters') }
    get locationBtn(): Locator { return this.page.getByText('Select') }
    get selectLocation(): Locator { return this.page.getByRole('button', { name: "Select"}).first() }
    get userAvatar(): Locator { return this.page.locator('.css-13ez59u') } // change
    get signOutBtn(): Locator { return this.page.getByRole('menuitem', { name: "Sign Out" })}

    async goto(){
        await this.page.goto('/login/') 
        await expect(this.loginBtn).toBeVisible()
    }

    async login(email: string = "", password: string = ""){
        await this.emailField.fill(email)
        await this.passwordField.fill(password)
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle' }),
            this.loginBtn.click()
        ])
        await expect(this.locationBtn).toBeVisible({ timeout: 60000 })
    }

    async clickLoginBtn(){
        await this.loginBtn.click()
    }

    async assertErrorMsg(errorTxt: string){
        await expect(this.errorMsg).toBeVisible()    
        await expect(this.errorMsg).toHaveText(errorTxt)
    }

    async assertEmailError(errorTxt: string){
        await expect(this.emailErrorMsg).toBeVisible()    
        await expect(this.emailErrorMsg).toHaveText(errorTxt)
    }

    async assertPasswordError(errorTxt: string){  
        await expect(this.passwordErrorMsg).toHaveText(errorTxt)
    }

    async logoutUser(){
        await this.userAvatar.click()
        await this.signOutBtn.click()
    }

    async selectLocationOption(){
        await expect(this.selectLocation).toBeVisible()
        await this.selectLocation.click()
    }
}

