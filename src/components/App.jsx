import { Component } from 'react';

import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = contact => {
    this.setState(prev => ({
      contacts: [...prev.contacts, contact],
    }));
  };
  removeContact = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(el => el.id !== id),
    }));
  };

  changeFilter = e => {
    const { value } = e.target;
    this.setState({ filter: value.toLowerCase() });
  };

  filterContactsList = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(el => el.name.toLowerCase().includes(filter));
  };

  render() {
    const filteredContacts = this.filterContactsList();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          addContact={this.addContact}
          contacts={this.state.contacts}
        />

        <h2>Contacts</h2>
        <Filter changeFilter={this.changeFilter} />
        <ContactList
          filteredContacts={filteredContacts}
          removeContact={this.removeContact}
        />
      </div>
    );
  }
}
