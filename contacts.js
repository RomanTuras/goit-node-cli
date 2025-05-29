import * as fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.join("db", "contacts.json");


/**
 * Getting a list of contacts
 * 
 * @returns {Array}
 */
export async function listContacts() {
  const text = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(text);
}


/**
 * Getting contact by ID
 * 
 * @param {string} contactId
 * @returns {Promise<Object|null>}
 */
export async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.filter((contact) => contact.id == contactId);

  return contact.length > 0 ? contact[0] : null;
}


/**
 * Removing contact by ID
 * 
 * @param {string} contactId
 * @returns {Promise<Object|null>}
 */
export async function removeContact(contactId) {
  const contacts = await listContacts();
  const removedContact = contacts.filter((contact) => contact.id == contactId);
  if (removedContact.length > 0) {
    const newContacts = contacts.filter( contact => contact.id != contactId);
    const text = JSON.stringify(newContacts);
    await fs.writeFile(contactsPath, text);
    return removedContact[0];
  }

  return null;
}


/**
 * Adding contact
 * 
 * @param {string} name
 * @param {string} email
 * @param {string} phone
 * @returns {Promise<Object>}
 */
export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const contact = {
    "id": nanoid(),
    "name":name,
    "email":email,
    "phone":phone
  };
  contacts.push(contact);

  const text = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, text);

  return contact;
}
