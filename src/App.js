import {useEffect} from "react";
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import {AddContact, EditContact, ViewContact, Contacts, Navbar} from "./components";
import {useImmer} from 'use-immer';
import {ToastContainer,toast} from 'react-toastify';

import _ from 'lodash';

import {ContactContext} from "./context/contactContext";
import "./App.css";
import {confirmAlert} from 'react-confirm-alert';
import {createContact, getAllContacts, getAllGroups, deleteContact} from "./services/contactService";
import {CURRENTLINE, FOREGROUND, PURPLE, YELLOW, COMMENT} from "./helpers/colors";
import {Button} from "bootstrap";


const App = () => {
    const [loading, setLoading] = useImmer(false);
    const [contacts, setContacts] = useImmer([]);
    const [filteredContacts, setFilteredContacts] = useImmer([]);
    const [groups, setGroups] = useImmer([]);

    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true);

                const {data: contactsData} = await getAllContacts();
                const {data: groupsData} = await getAllGroups();

                setContacts(contactsData);
                setFilteredContacts(contactsData);
                setGroups(groupsData);
                setLoading(false);
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        }
        fetchData();
    }, []);


    const createContactForm = async (values) => {

        try {
            setLoading(draft => !draft);

            const {status, data} = await createContact(values);


            if (status === 201) {
                toast.success("مخاطب با موفقیت افزوده شد",{icon:<i className="fas fa-plus"/>});
                setContacts(draft => {
                    draft.push(data)
                });
                setFilteredContacts(draft => {
                    draft.push(data)
                });

                setLoading((prevLoading) => !prevLoading)
                navigate("/contacts")
            }
        } catch (err) {
            console.log(err.message);
            setLoading((prevLoading) => !prevLoading)
        }
    }

    const confirmDelete = (contactId, contactFullName) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div dir="rtl" style={{
                        backgroundColor: CURRENTLINE,
                        border: `1px solid ${PURPLE}`,
                        borderRadius: "1em"
                    }}
                         className="p-4"
                    >
                        <h2 style={{color: YELLOW}}>پاک کردن مخاطب</h2>
                        <p style={{color: FOREGROUND}}>
                            مطمئنی که می خواهی مخاطب {contactFullName} رو پاک کنی ؟
                        </p>
                        <button onClick={() => {
                            removeContact(contactId);
                            onClose();
                        }}
                                className="btn mx-2"
                                style={{backgroundColor: PURPLE}}
                        >
                            مطمئن هستم
                        </button>

                        <button onClick={() => {
                            onClose()
                        }}
                                className="btn" style={{backgroundColor: COMMENT}}>
                            انصراف
                        </button>
                    </div>
                )
            }
        })
    };

    const removeContact = async (contactId) => {

        const contactsBackup = [...contacts];
        try {
            setContacts(draft => draft.filter(c => c.id !== contactId));
            setFilteredContacts(draft => draft.filter(c => c.id !== contactId));

            //Sending delete request to server
            const {status} = await deleteContact(contactId);


            if (status !== 200) {
                setContacts(contactsBackup);
                setFilteredContacts(contactsBackup);
            }else {
                toast.error("مخاطب با موفقیت حذف شد",{icon:<i className="fas fa-trash"/>});
            }
        } catch (err) {
            console.log(err.message);
            setContacts(contactsBackup);
            setFilteredContacts(contactsBackup);
        }
    }


    const contactSearch = _.debounce((query) => {
        if (!query) return setFilteredContacts([...contacts]);

        setFilteredContacts((draft) =>
            draft.filter((c) =>
                c.fullname.toLowerCase().includes(query.toLowerCase())
            )
        );
    }, 1000);

    return (
        <ContactContext.Provider value={{
            loading: loading,
            setLoading,
            setContacts,
            contacts,
            filteredContacts,
            setFilteredContacts,
            groups,
            deleteContact: confirmDelete,
            createContact: createContactForm,
            contactSearch
        }}>
            <div className="App">
                <ToastContainer rtl={true} position={"top-right"} theme="colored"/>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Navigate to="/contacts"/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                    <Route path="/contacts/add" element={<AddContact/>}/>
                    <Route path="/contacts/:contactId" element={<ViewContact/>}/>
                    <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>
                </Routes>
            </div>
        </ContactContext.Provider>

    );
};

export default App;
