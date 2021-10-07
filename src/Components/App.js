// import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactForm from "./contactForm/ContactForm";
import ContactList from "./contactList/ContactList";
import Filter from "./filter/Filter";

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem("contacts")) || []
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (addNewContact) => {
    setContacts((prevState) => [
      ...prevState,
      { id: uuidv4(), ...addNewContact },
    ]);
  };

  const isContactExist = (name) =>
    contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

  const onHandleFilter = (e) => {
    setFilter(e.target.value);
  };
  const getOnHandleFilter = () =>
    contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  const onDeleteContact = (e) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== e.target.id));
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} isContactExist={isContactExist} />

      <h2>Contacts</h2>

      <Filter onHandleFilter={onHandleFilter} filter={filter} />
      <ContactList
        getOnHandleFilter={getOnHandleFilter()}
        onDeleteContact={onDeleteContact}
      />
    </>
  );
}
