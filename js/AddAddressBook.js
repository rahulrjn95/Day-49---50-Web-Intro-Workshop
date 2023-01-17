let isUpdate = false;
let addressBookObj = {};
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
        checkForUpdate();
    });
const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try{
        setAddressBookObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    }catch (e){
        return;
        }
    }
    const setAddressBookObject = () => {
        addressBookObj._name=getInputValueById('#name');
        addressBookObj._address=getInputValueById('#address');
        addressBookObj._city=getInputValueById('#city');
        addressBookObj._state=getInputValueById('#state');
        addressBookObj._zip=getInputValueById('#zip');
        addressBookObj._phoneNumber=getInputValueById('#phone');
    }
    const createAndUpdateStorage= () => {
        let addressBookList=JSON.parse(localStorage.getItem("AddressBookList"));
        if(addressBookList){
            let addressBookData=addressBookList.
                           find(personData => personData._name == addressBookObj._name);
        if(!addressBookData){
                            addressBookList.push(createAddressBookData());
        }else{
                const index=addressBookList
                                         .map(personData => personData._name)
                                         .indexOf(addressBookData._name);
                            addressBookList.splice(index, 1,createAddressBookData(addressBookData._name));
                            }
                        }else{
                            addressBookList=[createAddressBookData()]
    }
        localStorage.setItem("AddressBookList", JSON.stringify(addressBookList))
    }
    const createAddressBookData = (id) =>{
        let addressBookData=new AddressBook();
        if(!id) addressBookData.id=createNewBookId();
        else addressBookData.id=id;
        setAddressBookData(addressBookData);
        return addressBookData;
    }
    const setAddressBookData = (addressBookData) => {
        try{
            addressBookData.name=addressBookObj._name;
        }catch (e){
            setTextValue('.name-error', e);
            throw e;
        }
        try{
            addressBookData.address=addressBookObj._address;
        }catch (e){
            setTextValue('.address-error', e);
            throw e;
        }
        addressBookData.city=addressBookObj._city;
        addressBookData.state=addressBookObj._state;
        addressBookData.zip=addressBookObj._zip;
        try{
        addressBookData.phoneNumber=addressBookObj._phoneNumber;
        }catch (e){
        setTextValue('.number-error', e);
        throw e;
        }
        alert(addressBookData.toString());
    }
    const createNewBookId= () => {
        let bookID = localStorage.getItem("PersonID");
        bookID=!bookID ? 1 : (parseInt(bookID)+1).toString();
        localStorage.setItem("PersonID",bookID);
        return bookID;
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
    const setForm = () => {
        setValue('#name', addressBookObj._name);
        setValue('#address', addressBookObj._address);
        setValue('#city', addressBookObj._city);
        setValue('#state', addressBookObj._state);
        setValue('#zip', addressBookObj._zip);
        setValue('#phone', addressBookObj._phoneNumber);
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
    const checkForUpdate = () => {
        const addressBookJson = localStorage.getItem('editBook');
        isUpdate = addressBookJson ? true : false;
        if (!isUpdate) return;
        addressBookObj = JSON.parse(addressBookJson);
        setForm();
    }
    const setTextValue = (id, value) => {
        const element = document.querySelector(id); element.textContent = value;
    }