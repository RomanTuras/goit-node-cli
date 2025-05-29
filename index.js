import { listContacts, getContactById, removeContact, addContact } from "./contacts.js";
import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  let contact = null;

  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      contact = await getContactById(id);
      console.log(contact);
      break;

    case "add":
      contact = await addContact(name, email, phone);
      console.log(contact);
      break;

    case "remove":
      contact = await removeContact(id);
      console.log(contact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);