let addressBookList;
window.addEventListener('DOMContentLoaded',(even) => {
    addressBookList = getAddressBookDataFromStorage();
    document.querySelector(".person-count").textContent = addressBookList.length;
    createInnerHtml();
    });
    const getAddressBookDataFromStorage = () => {
        return localStorage.getItem('AddressBookList') ?
                            JSON.parse(localStorage.getItem('AddressBookList')) : []; 
    }
    const createInnerHtml=() =>{
        if(addressBookList.length == 0)
        return;
        const headerHtml="<th>Full Name</th><th>Address</th><th>City</th>"+
                           "<th>State</th><th>Zip Code</th><th>Phone Number</th>";
    let innerHtml = `${headerHtml}`;
    for(const addressBookData of addressBookList){
        innerHtml = `${innerHtml}
         <tr>
            <td>${addressBookData._name}</td>
            <td>${addressBookData._address}</td>
            <td>${addressBookData._city}</td>
            <td>${addressBookData._state}</td>
            <td>${addressBookData._zip}</td>
            <td>${addressBookData._phoneNumber}</td>
            <td>
            <img id="${addressBookData._name}" onclick="remove(this)" alt="delete" src="./assests/icons/delete-black-18dp.svg">
            <img name="${addressBookData._name}" onclick="update(this)" alt="edit" src="./assests/iconscreate-black-18dp.svg">
            </td>
         </tr>
        `;
        }
        document.querySelector('#display').innerHTML=innerHtml;
    } 
    const remove = (node) => {
        let addressBookData = addressBookList.find(personData => personData._name == node.id);
        if (!addressBookData) return;
        const index = addressBookList
                      .map(personData => personData._name)
                      .indexOf(addressBookData._name);
        addressBookList.splice(index, 1);
        localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
        document.querySelector(".person-count").textContent=addressBookList.length;
        createInnerHtml();
    } 