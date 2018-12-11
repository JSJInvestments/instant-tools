/**
 * @template react/api/firestore
 * Firestore API template
 *
 * @author Craig Myles
 * @version 1.0.1
 * Last updated Wed 12 Dec
 *
 * Instructions:
 *
 * 1. Ensure the Firebase collection exists as referenced below in `db.collection(...)`.
 *
 * 2. Modify the code as neccessary.
 *
 * 3. Delete these instructions from your file.
 */

import { FirestoreRepository } from 'instant-firestore';
import { db } from '@hbagroup/instant-react/utils/firebase';

export default new FirestoreRepository(db, db.collection('__name__'));

// Or, longhand:
//
// export const create = async attributes => {
//   try {
//     return await api.create(attributes);
//   } catch (error) {
//     throw error;
//   }
// };

// export const createMany = async arr => {
//   try {
//     return await api.createMany(arr);
//   } catch (error) {
//     throw error;
//   }
// };

// export const find = async query => {
//   try {
//     return await api.find(query);
//   } catch (error) {
//     throw error;
//   }
// };

// export const findOne = async query => {
//   try {
//     return await api.findOne(query);
//   } catch (error) {
//     throw error;
//   }
// };

// export const findById = async id => {
//   try {
//     return await api.findById(id);
//   } catch (error) {
//     throw error;
//   }
// };

// export const createWithId = async (id, attributes) => {
//   try {
//     return await api.createWithId(id, attributes);
//   } catch (error) {
//     throw error;
//   }
// };

// export const update = async id => {
//   try {
//     return await api.update(id);
//   } catch (error) {
//     throw error;
//   }
// };

// export const remove = async id => {
//   try {
//     return await api.delete(id);
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateOrCreate = async (query, attributes) => {
//   try {
//     return await api.updateOrCreate(query, attributes);
//   } catch (error) {
//     throw error;
//   }
// };

// Or, shorthand:
//
// export const create = api.create;
// export const createMany = api.createMany;
// export const find = api.find;
// export const findOne = api.findOne;
// export const findById = api.findById;
// export const createWithId = api.createWithId;
// export const update = api.update;
// export const remove = api.delete;
// export const updateOrCreate = api.updateOrCreate;
