import { test, expect } from '@playwright/test'
import { userCredentials } from '../fixtures/user-data'
import { LoginPage } from '../pages/login-page'
import { CreateAppointment } from '../pages/create-appointment'
// import { ai } from '@zerostep/playwright'
import { ToastComponent } from '../toast'

test.describe('Calendar Tests', () => {
    let loginPage: LoginPage
    let createAppointment: CreateAppointment
    let toastComponent: ToastComponent

    test.slow()

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        createAppointment = new CreateAppointment(page)
        toastComponent = new ToastComponent(page)

        await loginPage.goto()
        await expect(page).toHaveURL(/login/)
        await loginPage.login(userCredentials.validUser.email, userCredentials.validUser.password)
        await loginPage.selectLocationOption()
    })
    
    test('[TC-106] Create Appointment', async ({page}) => {
        await createAppointment.clickNewBtn()
        // console.warn('AI assertion')
        // const cadOptions = await ai('Get the text of the two buttons in the "New" modal', { page, test })
        // console.log('Cad Options: ' +cadOptions)
        await createAppointment.clickAppointmentOption()
        await createAppointment.selectServiceCategory()
        await createAppointment.selectService()
        // console.warn('AI assertion')
        // const firstCategory = await ai('Get the text of the second category below the Categories text', {page,test})
        // console.log('Second Category: ' +firstCategory)
        // console.warn('AI assertion')
        // const firstService = await ai('Get the text of the second service option below the search bar', {page,test})
        // console.log('First Service: ' +firstService)
        // console.warn('AI assertion')
        // const modalView = await ai('Verify that the page displays "New Appointment", "Categories", and "Search service" texts', { page, test })
        // console.log('Is the modal view correct?: ' +modalView)
        await createAppointment.selectCustomer()
        await createAppointment.selectDate()
        await createAppointment.clickFinishBtn()
        await toastComponent.verifyMessage('Created successfully')
    })

    test('[TC-130] Create appointment via calendar shortcut', async () => {
        await createAppointment.clickValidCell()
        await createAppointment.clickAppointmentOption()
        await createAppointment.selectServiceCategory()
        await createAppointment.selectService()
        await createAppointment.selectCustomer()
        await createAppointment.clickFinishBtn()
    })
})