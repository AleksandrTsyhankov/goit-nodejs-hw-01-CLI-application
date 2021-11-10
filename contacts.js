const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
// contacts.js

/*
 * Раскомментируй и запиши значение
*/
const contactsPath = path.join(__dirname, 'db/contacts.json');
 
const readData = async () => {
    const result = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(result);
}

// TODO: задокументировать каждую функцию
const listContacts = async() => {
    return await readData();
}

const getContactById = async (contactId) => {
    const contacts = await readData();
    const [result] = contacts.filter((contact) => JSON.stringify(contact.id) === contactId);
    return result;
}

const removeContact = async (contactId) => {
    const allContacts = await readData();
    const filteredContacts = allContacts.filter(contact => JSON.stringify(contact.id) !== contactId);
    const removedContact = allContacts.filter(contact => JSON.stringify(contact.id) === contactId);

    await fs.writeFile(
        contactsPath,
        JSON.stringify(filteredContacts, null, 2),
    );
    return removedContact;
}

const addContact = async (name, email, phone) => {
    const contacts = await readData();
    const newContact = { id: crypto.randomUUID(), name, email, phone };
    contacts.push(newContact);

    await fs.writeFile(
        contactsPath,
        JSON.stringify(contacts, null, 2),
    )
    return newContact;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};