import PropTypes from 'prop-types';
import s from './ContactList.module.css';

const ContactList = ({ filteredContacts, removeContact }) => {
  return (
    <>
      <ul className={s.contactList}>
        {filteredContacts.map(({ name, number, id }) => (
          <li key={id} className={s.contactItem}>
            <p className={s.text}>{name}:</p>
            <p className={s.text}>{number}</p>
            <button className={s.contactBtn} onClick={e => removeContact(id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

ContactList.propTypes = {
  removeContact: PropTypes.func.isRequired,
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
