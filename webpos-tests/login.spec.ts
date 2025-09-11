import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { userCredentials } from '../fixtures/user-data'

test.describe('Login Tests', () => {
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        await loginPage.goto()
        await expect(page).toHaveURL('/\/login(\/|$)/')
    })

    test('[TC-101] Login using valid credentials', async ({ page }) => {
        await loginPage.login(userCredentials.validUser.email, userCredentials.validUser.password)
        await expect(page).toHaveURL('/\/locations(\/|$)/')
    })

    test('[TC-102] Login using invalid credentials', async () => {
        await loginPage.login(userCredentials.invalidUser.email, userCredentials.invalidUser.password)
        await loginPage.assertErrorMsg('Email or Password is invalid')
    })

    test('[TC-367] Login with invalid email format input in email field', async () => {
        await loginPage.login(userCredentials.invalidUser.invalidEmail, userCredentials.invalidUser.password)
        await loginPage.assertErrorMsg('email must be a valid email')
    })

    test('[TC-103] Login with empty input fields', async () => {
        await loginPage.clickLoginBtn()
        await loginPage.assertEmailError('email is a required field')
        await loginPage.assertPasswordError ('password must be at least 5 characters')
    })

    test('[TC-105] Logout user', async ({ page }) => {
        await loginPage.login(userCredentials.validUser.email, userCredentials.validUser.password)
        await loginPage.logoutUser()
        await expect(page).toHaveURL('/\/login(\/|$)/')
    })
})