import { Component } from 'react';

import ContactList from './ContactList/ContactList';
import contactsList from '../data/contacts.json';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';

class App extends Component {
  state = {
    contacts: contactsList,
    filter: '',
  };

  componentDidMount() {
    const contacts =
      JSON.parse(localStorage.getItem('contacts')) || contactsList;

    this.setState({ contacts });
  }

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = contact => {
    this.setState(prev => ({
      contacts: [...prev.contacts, contact],
      name: contact.name,
      number: contact.number,
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
    // if (filter === '') return contacts;
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
          contacts={this.state.contacts}
          removeContact={this.removeContact}
        />
      </div>
    );
  }
}

export default App;
