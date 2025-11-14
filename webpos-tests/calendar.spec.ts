import { test, expect } from '@playwright/test'
import { userCredentials } from '../fixtures/user-data'
import { LoginPage } from '../pages/login-page'
import { CreateAppointment } from '../pages/create-appointment'
import { Calendar } from '../pages/calendar'
import { ai } from '@zerostep/playwright'
import { ToastComponent } from '../toast'

test.describe('Calendar Tests', () => {
    let loginPage: LoginPage
    let createAppointment: CreateAppointment
    let toastComponent: ToastComponent
    let calendarPage: Calendar

    test.slow()

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        createAppointment = new CreateAppointment(page)
        toastComponent = new ToastComponent(page)
        calendarPage = new Calendar(page)
        await loginPage.goto()
        await expect(page).toHaveURL(/login/)
        await loginPage.login(userCredentials.validUser.email, userCredentials.validUser.password)
        await loginPage.selectLocationOption()
        console.log('=== Login successful.')
    })

    for (let i = 1; i <= 7; i++) {
        test(`[TC-106] Create Appointment --- run #${i} `, async () => {
            await createAppointment.clickNewBtn()
            // const cadOptions = await ai('Get the text of the two buttons in the "New" modal', { page, test })
            // console.log('Cad Options: ' +cadOptions)
            await createAppointment.clickAppointmentOption()
            await createAppointment.selectServiceCategory()
            await createAppointment.selectService()
            // const firstCategory = await ai('Get the text of the next category below the "All Services" text', {page,test})
            // console.log('Second Category: ' +firstCategory)
            // const firstService = await ai('Get the text of the first service option below the search bar', {page,test})
            // console.log('First Service: ' +firstService)
            // const modalView = await ai('Verify that the page displays "New Appointment", "Categories", and "Search service" texts', { page, test })
            // console.log('Is the modal view correct?: ' +modalView)
            await createAppointment.selectCustomer()
            await createAppointment.selectDate()
            await createAppointment.addMemo('This is an automated test memo')
            await createAppointment.clickFinishBtn()
            await toastComponent.verifyToastMsg('Created successfully')
            console.log('=== Appointment created successfully.')
        })
    }

    test('[TC-130] Create appointment via calendar shortcut', async () => {
        await createAppointment.clickValidCell()
        await createAppointment.clickAppointmentOption()
        await createAppointment.selectServiceCategory()
        await createAppointment.selectService()
        await createAppointment.selectCustomer()
        await createAppointment.addMemo('This is an automated test memo via Calendar Shortcut')
        await createAppointment.clickFinishBtn()
        await toastComponent.verifyToastMsg('Created successfully')
        console.log('=== Appointment created successfully.')
    })

    test('[TC-107] View Appointment', async () => {        
        await calendarPage.clickAppointmentBlock()
        await calendarPage.verifyActivitiesModal()
    })

    test('[TC-108] Update Appointment Status - Confirmed', async () => {
        await calendarPage.clickAppointmentBlock()
        await calendarPage.verifyActivitiesModal()
        await calendarPage.changeAppointmentStatus('Confirmed')
        await toastComponent.verifyToastMsg('The group appointment is confirmed')
        console.log('=== Appointment status changed to Confirmed.')
    })

    test('[TC-109] Update Appointment Status - Arrived', async () => {
        await calendarPage.clickAppointmentBlock()
        await calendarPage.verifyActivitiesModal()
        await calendarPage.changeAppointmentStatus('Arrived')
        await toastComponent.verifyToastMsg('The group appointment has been checked in')
        console.log('=== Appointment status changed to Arrived.')
    })

    test('[TC-110] Update Appointment Status - Serving', async () => {
        await calendarPage.clickAppointmentBlock()
        await calendarPage.verifyActivitiesModal()
        await calendarPage.changeAppointmentStatus('Serving')
        await toastComponent.verifyToastMsg('Start serving the group appointment')
        console.log('=== Appointment status changed to Serving.')
    })

    test('[TC-111] Update Appointment Status - Completed', async () => {
        await calendarPage.clickAppointmentBlock()
        await calendarPage.verifyActivitiesModal()
        await calendarPage.changeAppointmentStatus('Completed')
        await toastComponent.verifyToastMsg('The group appointment is completed')
        console.log('=== Appointment status changed to Completed.')
    })

    test('[TC-112] Update Appointment Status - No-Show', async () => {
        await calendarPage.clickAppointmentBlock()
        await calendarPage.verifyActivitiesModal()
        await calendarPage.changeAppointmentStatus('No-Show')
        await toastComponent.verifyToastMsg('The group appointment has been marked as no-show')
        console.log('=== Appointment status changed to No-Show.')
    })

    test('[TC-113] Update Appointment Status - Cancelled', async () => {
        await calendarPage.clickAppointmentBlock()
        await calendarPage.verifyActivitiesModal()
        await calendarPage.changeAppointmentStatus('Cancel')
        await toastComponent.verifyToastMsg('The group appointment has been cancelled')
        console.log('=== Appointment status changed to Cancelled.')
    })
})