import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/contactForm';
import { Filter } from './Filter/filter';
import { ContactList } from './ContactList/contactList';
import styles from './appWrap.module.scss';
import { ContactItem } from './ContactItem/contactItem';
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

  addContact = data => {
    const { contacts } = this.state;
    const { name, number } = data;

    if (contacts.some(contact => contact.name === name)) {
      return alert(`${name} is already in contacts`);
    } else {
      const contact = {
        id: nanoid(),
        name,
        number,
      };

      this.setState(({ contacts }) => ({
        contacts: [...contacts, contact],
      }));
    }
  };

  onfilterInputType = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  filteredContactList = () => {
    const { contacts, filter } = this.state;
    const toLower = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(toLower)
    );
  };
  deleteContact = contactid => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactid),
    }));
  };
  render() {
    const { filter } = this.state;
    const filteredContacts = this.filteredContactList();

    return (
      <>
        <h1 className={styles.appTitle}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2 className={styles.appTitle}>Contacts</h2>
        {filteredContacts.length > 0 ? (
          <Filter onChange={this.onfilterInputType} value={filter} />
        ) : (
          <h2 className={styles.appTitle}>Your contact list is empty...</h2>
        )}

        {filteredContacts.length > 0 && (
          <ContactList>
            <ContactItem
              contacts={filteredContacts}
              onDeleteBtnClick={this.deleteContact}
            />
          </ContactList>
        )}
      </>
    );
  }
}
