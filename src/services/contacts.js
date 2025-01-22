import { SORT_ORDER } from "../constants/index.js";
import { contactsCollection } from "../db/models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = "_id",
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = contactsCollection.find();
  if (filter.type) {
    contactsQuery.where("contactType").equals(filter.type);
  }
  if (typeof filter.isFavourite === "boolean") {
    contactsQuery.where("isFavourite").equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    contactsCollection.find(contactsQuery.getFilter()).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
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
