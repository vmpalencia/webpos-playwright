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
    get services(): Locator { return this.page.locator('.css-1gla7er').nth(0) } // best practice -> not use randomly generated class names
    get selectStafferBtn(): Locator { return this.page.locator('[itemid="am_form_btn_selectStaffer"]') }
    get assignStaffer(): Locator { return this.page.locator('.css-87n7gs') }
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
    
    get radioTitle(): Locator { return this.page.locator('#demo-controlled-checkbox-buttons-group')}
    get checkboxTitle(): Locator { return this.page.locator('#demo-controlled-radio-buttons-group')}
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
        const radioCount = await this.radioTitle.count()
        const checkboxCount = await this.checkboxTitle.count()

        for (let i = 0; i < radioCount && checkboxCount; i++){
            await this.radioModifier.nth(i).click()
            console.log(i)
            await this.checkboxModifier.nth(i).click()
            console.log(i)
            
            if (await this.modifierConfirmBtn.isEnabled){
                console.log('Confirm button is enabled')
                break;
            }
        }    
        
        await expect(this.modifierConfirmBtn).toBeEnabled()
        await this.modifierConfirmBtn.click()
        // while (await this.modifierConfirmBtn.isDisabled){
        //     await this.radioModifier.click()
        //     await this.checkboxModifier.click()
        // } 
        
        // if (await this.modifierConfirmBtn.isEnabled){
        //     await this.modifierConfirmBtn.click()
        // }
        
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
