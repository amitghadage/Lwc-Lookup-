import { LightningElement, track, api } from 'lwc';
import getRecordsByName from '@salesforce/apex/LookupController.getRecordsByName'

export default class LookupLwc extends LightningElement {
    @api
    objectname;
    @track
    recordsList;
    @track
    selectedValue = "";
    error;
    recordselected = false;
    @api
    iconname;
    
    //Method to query data after typing search term
    onKeyChange(event) {
        if(event.keyCode === 38 || event.keyCode === 40){
            this.lookupKeyboardNavigation(event);
            return;
        }

        this.selectedValue = this.template.querySelector('.lookupInput').value;
        getRecordsByName({objectName : this.objectname, searchFor : this.selectedValue})
            .then(result => {
                this.selectedValue = this.template.querySelector('.lookupInput').value;
                this.recordsList = result;
            })
            .catch(error => {
                //exception handling
                this.error = error;
            })
        
    }

    //Method to clear search list and show selected value.
    clearSelection() {
        this.recordselected = false;
        this.selectedValue = "";
        this.recordsList = undefined;
    }

    //Method to pass selected record to parent component.
    setSelectedValue(event) {
        this.selectedValue = event.target.dataset.itemname;
        this.recordselected = true;
        this.recordsList = undefined;
        event.preventDefault();
        const selectedEvent = new CustomEvent('selected', {
            detail: {
                Name : this.selectedValue,
                Id : event.target.dataset.itemid,
                ObjectName : this.objectname
            } 
        });
        this.dispatchEvent(selectedEvent);
    }

    //keyboard keycodes:
        //up = 38
        //down = 40
        //enter = 13
    lookupKeyboardNavigation(event){
        if(event.keyCode == 13){
            this.firstTimeKeyboardNavigation = true;
            this.setSelectedValue(event);
            return;
        } 

        var itemSelected = this.template.querySelectorAll('.itemSelection');

        var keyUp = event.keyCode === 38 ? true : false;
        var keyDown = event.keyCode === 40 ? true : false;
        if(keyUp || keyDown){     
            if(this.firstTimeKeyboardNavigation){
                this.indexFocusOn = keyUp ? itemSelected.length - 1 : 0;
                this.firstTimeKeyboardNavigation = false;
            } else if(this.indexFocusOn === 0 && keyUp){
                this.indexFocusOn = itemSelected.length - 1;
            } else if(this.indexFocusOn === itemSelected.length - 1 && keyDown){
                this.indexFocusOn = 0;
            } else {
                this.indexFocusOn = keyUp ? this.indexFocusOn - 1  : this.indexFocusOn + 1;
            }

            itemSelected[this.indexFocusOn].focus();
            return;
        }

        this.firstTimeKeyboardNavigation = true;
        let lookupInput = this.template.querySelector('.lookupInput');
        this.selectedValue = lookupInput.value + event.charCode;
        lookupInput.selectionStart = lookupInput.value.length;
        lookupInput.focus();
        this.onKeyChange(event);
    }
}