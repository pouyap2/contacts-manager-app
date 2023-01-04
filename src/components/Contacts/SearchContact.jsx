import React, {useContext} from 'react';
import {PURPLE} from '../../helpers/colors';
import {ContactContext} from "../../context/contactContext";


const SearchContact = () => {
    const {contactSearch}=useContext(ContactContext);
    return (
        <div className="input-group mx-2 w-75 d-flex flex-row-reverse">
                           <span className="input-group-text"
                                 id="basic-addon1"
                                 style={{backgroundColor: PURPLE}}>
                               <i className="fas fa-search"/>
                           </span>
            <input
                dir="rtl"
                type="text"
                onChange={event => contactSearch(event.target.value)}
                className="form-control"
                placeholder="جستجوی مخاطب"
                aria-label="search"
                aria-describedby="basic-addon1"
            />
        </div>
    );
};

export default SearchContact;
