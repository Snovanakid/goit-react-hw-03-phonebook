import PropTypes from 'prop-types';
import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import s from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { value, name } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
  e.preventDefault();
  const { contacts, addContact } = this.props;
  const { name, number } = this.state;
  const isHasContact = contacts.find(
    el => el.name.toLowerCase() === name.toLowerCase()
  );
  if (isHasContact) {
    alert(`${name} is already in contacts`);
    return;
  }
  const contact = { id: uuidv4(), name, number };
  addContact(contact);
  e.target.reset();
};

  render() {
    return (
      <>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <label className={s.label}>
            <span>Name</span>
            <input
              className={s.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.handleChange}
            />
          </label>
          <label className={s.label}>
            <span>Number</span>
            <input
              className={s.input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.handleChange}
            />
          </label>
          <button className={s.btn} type="submit">
            Add contact
          </button>
        </form>
      </>
    );
  }
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
};

export default ContactForm;