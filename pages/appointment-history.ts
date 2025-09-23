import { type Locator, type Page, expect } from '@playwright/test'

export class AppointmentHistory { 

    constructor(private readonly page: Page) {}

    // locators
    get pageTitle(): Locator { return this.page.getByText('Appointment List') }
    get rangeDropdown(): Locator { return this.page.locator('#demo-simple-select') }
    get statusDropdown(): Locator { return this.page.locator('#status-select')}
    // get fromDropdown(): Locator { return this.page.getByRole('textbox', { name: 'From'}) }
    get fromDropdown(): Locator { return this.page.getByPlaceholder('YYYY-MM-DD').nth(0) }
    get toDropdown(): Locator { return this.page.getByRole('textbox', { name: 'To', exact: true }) }
    get searchBar(): Locator { return this.page.getByPlaceholder('Search by Appointment ID# and Customer Name') }
    get appointmentID_column(): Locator { return this.page.getByRole('columnheader', { name: "Appointment ID"}) }
    get customer_column(): Locator { return this.page.getByRole('columnheader', { name: "Appointment ID"}) }
    get createdDate_column(): Locator { return this.page.getByRole('columnheader', { name: "Appointment ID"}) }
    get dateFrom_column(): Locator { return this.page.getByRole('columnheader', { name: "Appointment ID"}) }
    get dateEnd_column(): Locator { return this.page.getByRole('columnheader', { name: "Appointment ID"}) }
    get source_column(): Locator { return this.page.getByRole('columnheader', { name: "Appointment ID"}) }
    get appointmentRow(): Locator { return this.page.getByRole('row').nth(1) }
    get appointmentID(): Locator { return this.page.locator('div[data-field="id"]').nth(1) }
    get appointmentHistoryTab(): Locator { return this.page.getByRole('link', { name: 'Appointments History' }) }
    get customerName(): Locator { return this.page.locator('[data-field="name"]').nth(1) }
    
    // Appointment Details Side Panel
    get appointmentsTab(): Locator { return this.page.getByRole('tab', { name: 'Appointments'}) }
    get customersTab(): Locator { return this.page.getByRole('tab', { name: 'Customer'}) }
    get reassignBtn(): Locator { return this.page.getByRole('button', { name: 'Reassign'}) }
    get contactInfo(): Locator { return this.page.locator('.css-1unk1dn') }

    async clickAppointmentHistoryTab(){
        await this.appointmentHistoryTab.click()
    }

    async assertPageView(){
        await expect(this.pageTitle).toBeVisible()
        await expect(this.rangeDropdown).toBeVisible()
        await expect(this.statusDropdown).toBeVisible()
        await expect(this.fromDropdown).toBeVisible()
        await expect(this.toDropdown).toBeVisible()
        await expect(this.searchBar).toBeVisible()
        await expect(this.appointmentID_column).toBeVisible()
        await expect(this.customer_column).toBeVisible()
        await expect(this.createdDate_column).toBeVisible()
        await expect(this.dateFrom_column).toBeVisible()
        await expect(this.dateEnd_column).toBeVisible()
        await expect(this.source_column).toBeVisible()
        await expect(this.appointmentRow).toBeVisible()
        await expect(this.appointmentID).toBeVisible()
        await expect(this.appointmentHistoryTab).toBeVisible()
    }

    async selectRange(option: string){
        await this.rangeDropdown.click()
        await this.page.getByRole('option', { name: option }).click()
    }

    async selectStatus(status: string){
        await this.statusDropdown.click()
        await this.page.getByRole('option', { name: status }).click()
    }

    async search(entry: string){
        await this.searchBar.click()
        await this.searchBar.fill(entry)
    }

    async openAppointmentDetails(){
        await this.appointmentID.click()
    }

    async assertAppointmentDetailsPanel(){
        await expect(this.appointmentsTab).toBeVisible()
        await expect(this.customersTab).toBeVisible()
        await expect(this.reassignBtn).toBeVisible()
        await expect(this.contactInfo).toBeVisible()
    }
} 