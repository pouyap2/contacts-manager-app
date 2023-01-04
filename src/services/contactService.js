import axios from "axios";


/*const SERVER_URL = "http://localhost:9000";*/
const SERVER_URL = "https://contactsapi.testreact.ir";

//@desc GET All Contacts
//@route GET http://localhost:9000/:contacts
export const getAllContacts = () => {
    const url = `${SERVER_URL}/contacts`;
    return axios.get(url);
}
//@desc GET Contact With ContactId
//@route GET http://localhost:9000/contacts/:contactId
export const getContact=(contactId)=>{
    const url=`${SERVER_URL}/contacts/${contactId}`;
    return axios.get(url)
}


//@desc GET All Group
//@route GET http://localhost:9000/groups
export const getAllGroups = () => {
    const url = `${SERVER_URL}/groups`;
    return axios.get(url);
}

//@desc Get Group
//@route GET http://localhost:9000/groups/:groupId
export const getGroup=(groupId)=>{
    const url=`${SERVER_URL}/groups/${groupId}`;
    return axios.get(url);
}

//@desc  Create New contact
//@route POST http://localhost:9000/contacts
export const createContact=(contact)=>{
    const url=`${SERVER_URL}/contacts`;
    return axios.post(url,contact);
}

//@desc  Update contact
//@route PUT http://localhost:9000/contacts
export const updateContact=(contact,contactId)=>{
    const url=`${SERVER_URL}/contacts/${contactId}`;
    return axios.put(url,contact);
}

//@desc  Delete contact
//@route DELETE http://localhost:9000/contacts/:contactId
export const deleteContact=(contactId)=>{
    const url=`${SERVER_URL}/contacts/${contactId}`;
    return axios.delete(url);
}