import React from 'react';
import { List, Item, Button, Text } from './ContactList.styled'

// import PropTypes from 'prop-types';


export const  ContactList = ({ contacts, onDeleteContact }) => (
  <List>
    {contacts.map(contact => (
      <Item key={contact.id}>
        <Text>
        {contact.name + ' : ' + contact.number}
        </Text>
        
        
          <Button
            type="button"
            name="delete"
            onClick={() => onDeleteContact(contact.id)}
          >
            Delete
          </Button>
        
      </Item>
    ))}
  </List>
);

// ContactList.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.exact({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     })
//   ),
//   onDeleteContact: PropTypes.func.isRequired,

// };
