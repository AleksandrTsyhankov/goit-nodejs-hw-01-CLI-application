const fs = require('fs/promises');
const path = require('path');



const contactsPath = path.join(__dirname, '../../db/contacts.json');
 
const readData = async () => {
    const result = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(result);
}

const getContactById = async (contactId) => {
    const contacts = await readData();
    const [result] = contacts.filter((contact) => JSON.stringify(contact.id) === contactId);
    return result;
};

module.exports = getContactById;