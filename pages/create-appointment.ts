import { type Locator, type Page, expect } from '@playwright/test'

export class CreateAppointment {
    
    constructor(private readonly page: Page){}

    /*
    await page
    .getByRole('listitem')
    .filter({ hasText: 'Product 2' })
    .getByRole('button', { name: 'Add to cart' })
    .click();
    */

    // locators
    get newBtn(): Locator { return this.page.locator('[itemid="am_calendar_hdr_btn_new"]') }
    get cadAppointment(): Locator { return this.page.locator('[itemid="cad_appointment"]') }
    
    // select service 
    get serviceCategories(): Locator { return this.page.locator('[itemid="chm_services_selectCategory"]').nth(0) }
    get services(): Locator { return this.page.locator('[itemid^="appointment-service-"]').nth(0) } 
    get selectStafferBtn(): Locator { return this.page.locator('[itemid="am_form_btn_selectStaffer"]') }
    get assignStaffer(): Locator { return this.page.locator('[itemid="chm_services_assignDx_btn_assignStaff"]') }
    get allStaffTab(): Locator { return this.page.locator('[itemid="am_form_btn_allStaff"]') }
    // service modifier/s
    get radioModifier(): Locator { return this.page.getByRole('radio') }
    get checkboxModifier(): Locator { return this.page.getByRole('checkbox') }
    get modifierConfirmBtn(): Locator { return this.page.getByRole('button', { name: 'Confirm'}) }
    
    // select customer
    get selectCustomerBtn(): Locator { return this.page.getByRole('heading', { name: 'Select a customer'}) }
    get customerRow(): Locator { return this.page.locator('[itemid="chm_clientList_item_selectMember"]').nth(0) }
    get customerConfirmBtn(): Locator { return this.page.locator('[itemid="chm_clientDx_btn_confirm"]') }
    // select date
    get selectDateBtn(): Locator { return this.page.getByRole('heading', { name: 'Select Date'}) }
    get submitBtn(): Locator { return this.page.locator('[itemid="am_form_btn_date_confirm"]') } 

    get finishBtn(): Locator { return this.page.locator('[itemid="am_form_btn_finish"]') }

    async clickNewBtn(){
        await this.newBtn.click()        
    }
    
    async clickAppointmentOption(){
        await this.cadAppointment.click()
    }

    async selectServiceCategory(){
        await this.serviceCategories.click()
    }

    async selectService(){
        await this.services.click()
        
        for (let i = 0; i < 20; i++) {
            const radio = this.radioModifier.nth(i)
            if (await radio.isVisible()) {
                await radio.click()
                console.log('Radio button modifier/s selected!')
            } else {
                console.log('No radio button modifier/s available.')
            }
        }

        for (let i = 0; i < 20; i++) {
            const cb = this.checkboxModifier.nth(i)
            if (await cb.isVisible() && await cb.isEnabled()) {
                await cb.click()
                console.log('Checkbox modifier/s selected!')
            } else {
                console.log('No checkbox modifier/s available.')
            }
        }

        if (await this.modifierConfirmBtn.isVisible()){
            await this.modifierConfirmBtn.click()
            console.log('Modifier confirm button clicked!')
        } else {
            console.log('No modifier confirm button available.')
        }
        
        await this.selectStafferBtn.click()
        await this.allStaffTab.click()
        await this.assignStaffer.first().click()

    }

    async selectCustomer(){
        await this.selectCustomerBtn.click()
        await this.customerRow.click()
        await this.customerConfirmBtn.click()
    }

    async selectDate(){
        await this.selectDateBtn.click()
        await this.submitBtn.click()
    }

    async clickFinishBtn(){
        await expect(this.finishBtn).toBeEnabled()
        await this.finishBtn.click()
    }
}
