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


  



}
 

  

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
        filter: '',
      };
    });
  };

  changeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  addContact = contact => {
    const isContacts = this.state.contacts.some(
      ({ name, number }) =>
        name.toLowerCase() === contact.name.toLowerCase() ||
        contact.number === number
    );

    if (isContacts) {
      Notiflix.Notify.info(
        `${contact.name} or ${contact.number} is already in contacts`
      );
      return;
    }
    this.setState(prevState => ({
      contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
    }));
  };

  getVisualContacts = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  };

  render() {
    const visualContacts = this.getVisualContacts();
    const { filter } = this.state;
    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.addContact} />
        <SubTitle>Contacts</SubTitle>
        {this.state.contacts.length > 0 ? (
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        ) : (
          <Wrapper>The contact book is empty! Add new contacts</Wrapper>
        )}
        {this.state.contacts.length > 0 && (
          <ContactList
            contacts={visualContacts}
            onDeleteContact={this.deleteContact}
           
          />
        )}
      </Container>
    );
  }
}
