import { test, expect } from '@playwright/test'
import { userCredentials } from '../fixtures/user-data'
import { LoginPage } from '../pages/login-page'
import { CreateAppointment } from '../pages/create-appointment'

test.describe('Calendar Tests', () => {
    let loginPage: LoginPage
    let createAppointment: CreateAppointment

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        createAppointment = new CreateAppointment(page)

        await loginPage.goto()
        await expect(page).toHaveURL('/login/')
        await loginPage.login(userCredentials.validUser.email, userCredentials.validUser.password)
        // console.log('URL after login:', page.url())
        // await expect.soft(page).toHaveURL('/\/locations/')
        // await expect(page).not.toHaveURL('/\/login/')
        await loginPage.selectLocationOption()
    })
    
    test('Create Appointment', async () => {
        await createAppointment.clickNewBtn()
        await createAppointment.clickAppointmentOption()
        // await createAppointment.selectServiceCategory()
        await createAppointment.selectService()
        await createAppointment.selectCustomer()
        await createAppointment.selectDate()
        await createAppointment.clickFinishBtn()
    })
})