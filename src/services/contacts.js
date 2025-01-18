import { contactsCollection } from "../db/models/contacts.js";

export const getAllContacts = async () => {
  const contacts = await contactsCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await contactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await contactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await contactsCollection.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};

export const updateContact = async (contactId, payload) => {
  const updatedContact = await contactsCollection.findOneAndUpdate(
    {
      _id: contactId,
    },
    { $set: payload },
    { new: true, runValidators: true }
  );
  return updatedContact;
};
