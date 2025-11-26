import { type Locator, type Page, expect } from '@playwright/test'

export class CreateAppointment {
    
    constructor(private readonly page: Page){}

    get newBtn(): Locator { return this.page.locator('[itemid="am_calendar_hdr_btn_new"]') }
    get cadAppointment(): Locator { return this.page.locator('[itemid="cad_appointment"]') }
    
    // select service 
    get serviceCategories(): Locator { return this.page.locator('[itemid="chm_services_selectCategory"]').nth(3) }
    get allServicesCategory(): Locator { return this.page.locator('[itemid="am_form_btn_selectAllService"]') }
    get services(): Locator { return this.page.locator('[itemid^="appointment-service-"]').nth(0) } 
    get selectStafferBtn(): Locator { return this.page.locator('[itemid="am_form_btn_selectStaffer"]') }
    get assignStaffer(): Locator { return this.page.locator('[itemid="chm_services_assignDx_btn_assignStaff"]') }
    get allStaffTab(): Locator { return this.page.locator('[itemid="am_form_btn_allStaff"]') }
    get serviceOptionTitle(): Locator { return this.page.locator('[id="Select service option"]') }
    get serviceOption(): Locator { return this.page.locator('.css-bwb7tk').nth(0) }
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

    // add memo
    get memoIcon(): Locator { return this.page.locator('[itemid="am_form_note_btn_edit"]') }
    get memoField(): Locator { return this.page.locator('[itemid="am_form_noteDx_tf_note"]')}
    get memoSubmitBtn(): Locator { return this.page.locator('[itemid="am_form_noteDx_btn_submit"]') }

    get finishBtn(): Locator { return this.page.locator('[itemid="am_form_btn_finish"]') }
    
    // calendar shortcut
    get validCell(): Locator { return this.page.locator('.fc-non-business').first()}

    async clickValidCell(){
        await this.validCell.click()
    }

    async clickNewBtn(){
        await this.newBtn.click()        
    }
    
    async clickAppointmentOption(){
        await this.cadAppointment.click()
    }

    async selectServiceCategory(){
        await this.serviceCategories.click()
    }

    async addMemo(memoText: string){
        await this.memoIcon.click()
        await this.memoField.fill(memoText)
        await this.memoSubmitBtn.click()
    }

    async selectAllServicesCategory(){
        await this.allServicesCategory.click()
    }

    async selectService(){
        await this.services.click()

        const radioCount = await this.radioModifier.count()
        console.log('Radio Count: ' +radioCount)
        const checkboxCount = await this.checkboxModifier.count()
        console.log('Checkbox Count: ' +checkboxCount)
        const serviceOptionCount = await this.serviceOption.count()
        console.log('Service Option Count: ' +serviceOptionCount)
        
        for (let i = 0; i < radioCount; i++) {
            const radio = this.radioModifier.nth(i)
            if (await radio.isVisible()) {
                await radio.click()
                console.log('Radio button modifier/s selected!')
            } else {
                console.log('No radio button modifier/s available.')
            }
        }

        for (let i = 0; i < checkboxCount; i++) {
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

        if (await this.serviceOptionTitle.isVisible()){
            await this.serviceOption.click()
            console.log('Service option selected!')
        } else {
            console.log('No service option/s available.')
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
