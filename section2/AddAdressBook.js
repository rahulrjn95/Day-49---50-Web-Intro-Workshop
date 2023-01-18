window.addEventListener('DOMContentLoaded', (event) => {
    const name=document.querySelector('#name');
        const nameError=document.querySelector('.name-error');
            name.addEventListener('input',function(){
                let nameRegex=RegExp('^[A-Z]{1}[a-z]{3,}\\s{1,}[A-Z]{1}[a-z]{2,}$');
                if (nameRegex.test(name.value))
                nameError.textContent="";
                else nameError.textContent="Name is Incorrect!";
            });
    const address=document.querySelector('#address');
        const addressError=document.querySelector('.address-error');
            address.addEventListener('input',function(){
                let addressRegex=RegExp('^[a-zA-z0-9!@#$%^&*/-]{3,}\\s{0,}[a-zA-z0-9!@#$%^&*/-]{3,}\\s{0,}$');
                if (addressRegex.test(address.value))
                addressError.textContent="";
                else addressError.textContent="Address is Incorrect!";
            });
    const phoneNumber=document.querySelector('#phone');
        const numberError=document.querySelector('.number-error');
            phoneNumber.addEventListener('input',function(){
                let numberRegex=RegExp("^[0-9!+-]{10,}$");
                if (numberRegex.test(phoneNumber.value))
                numberError.textContent="";
                else numberError.textContent="Phone number is Incorrect!";
            });
        });
    const save = () => {
        try{
            let addressBookData = createAddressBook();
            createAndUpdateStorage(addressBookData);
        }catch (e){
            return;
            }
        }
        function createAndUpdateStorage(addressBookData){
            let addressBookList=JSON.parse(localStorage.getItem("AddressBookList"));
            if(addressBookList !=undefined){
                addressBookList.push(addressBookData);
            }else{
                addressBookList=[addressBookData]
            }
            alert(addressBookList.toString());
            localStorage.setItem("AddressBookList", JSON.stringify(addressBookList))
        }
        const createAddressBook=()=>{
            let addressBook=new AddressBook();
            try{
                addressBook.name=getInputValueById('#name');
           }catch (e){
                setTextValue('.name-error',e);
                throw e;
            }
            try{
                addressBook.address=getInputValueById('#address');
            }catch (e){
                setTextValue('.address-error',e);
                throw e;
            }
            addressBook.city=getInputValueById('[name=city]');
            addressBook.state=getInputValueById('[name=state]');
            addressBook.zip=getInputValueById('#zip');
            try{
                addressBook.phoneNumber=getInputValueById('#phone');
            }catch (e){
                setTextValue('.number-error', e);
                throw e;
            }
            alert(addressBook.toString());
            return addressBook;
        }
        const getInputValueById=(id)=>{
            let value=document.querySelector(id).value;
            return value;
        }
        const getSelectedValues=(propertyValue)=>{
            let allItems=document.querySelectorAll(propertyValue);
            let setItems= [];
            allItems.forEach(item =>{
                if(item.checked) setItems.push(item.value);
            });
            return setItems;
        }
        const resetForm = () =>{
            setValue("#name", "");
            setValue("#address", "");
            setValue("#city", "");
            setValue("#state", "");
            setValue("#zip", "");
            setValue("#phone", "");
        }
        const setValue = (id, value) => {
            const element = document.querySelector(id);
            element.value = value;
        }