import React, { useState, useEffect } from 'react';
import { Container, Title, SubTitle, Wrapper } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import {ContactList} from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';


  
const phoneContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
    
export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? phoneContacts;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const isInContacts = contacts.some(
      ({ name, number }) => name.toLowerCase() === contact.name.toLowerCase() || 
      number === contact.number 
    );
  
    if(isInContacts) {
      Notiflix.Notify.info(
        `${contact.name} or ${contact.number} is already in contacts`
      )
      return;
    }

    setContacts(prevContacts => [
      { id: nanoid(), ...contact },
      ...prevContacts,
    ]);
  }

  const changeFilter = event => {
    setFilter(event.target.value);
  }
  const getVisualContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(
      contact => 
      contact.name.toLowerCase().includes(normalizedFilter) ||
      contact.number.includes(normalizedFilter)
    )
  }
  const visualContacts = getVisualContacts();

  const deleteContact = contactId => {
    setContacts(prevContacts => 
      prevContacts.filter(contact => contact.id !== contactId)
    )
  };

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={addContact} />
      <SubTitle>Contacts</SubTitle>
      {contacts.length > 0 ? (
        <Filter value={filter} onChangeFilter={changeFilter} />
      ) : (
        <Wrapper>The contact book is empty! Add new contact!</Wrapper>
      )}
      {contacts.length > 0 && (
        <ContactList
          contacts={visualContacts}
          onDeleteContact={deleteContact}
        />
      )}
    </Container>
  )
}
 
export default App;
  

  
 

 

 