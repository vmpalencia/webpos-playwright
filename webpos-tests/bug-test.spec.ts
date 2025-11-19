// import { test, expect } from '@playwright/test'
// import { LoginPage } from '../pages/login-page'
// import { userCredentials } from '../fixtures/user-data'
// import { AppointmentHistory } from '../pages/appointment-history'

// test.describe('Bug Tests', () => {
//     let loginPage: LoginPage
//     let appmtHistoryPage: AppointmentHistory

//     test.beforeEach(async ({ page }) => {
//         loginPage = new LoginPage(page)
//         appmtHistoryPage = new AppointmentHistory(page)

//         await loginPage.goto()
//         // await page.waitForLoadState('networkidle')
//         // await expect(page).toHaveURL(/login/)
//         await loginPage.login(userCredentials.validUser.email, 
//                             userCredentials.validUser.password)
//         // await page.waitForLoadState('networkidle')
//         // await expect(page).toHaveURL(/locations/)
//         await loginPage.selectLocationOption()
//     })

//     test('Client Side Exception Test', async({ page }) => {
//         test.slow()
//         await appmtHistoryPage.clickAppointmentsTab()
//         await appmtHistoryPage.clickAppointmentHistoryTab()
//         await expect(page).toHaveURL(/history/)
//         await appmtHistoryPage.openAppointmentDetails()
//         await appmtHistoryPage.clickUpdateBtn()
//         page.reload()
//         await appmtHistoryPage.openAppointmentDetails()
//         await appmtHistoryPage.clickUpdateBtn()
//         page.reload()
//         await appmtHistoryPage.clickAppointmentsTab()
//         await appmtHistoryPage.clickAppointmentHistoryTab()
//         await appmtHistoryPage.openAppointmentDetails()
//         await appmtHistoryPage.clickUpdateBtn()
//     })

// })