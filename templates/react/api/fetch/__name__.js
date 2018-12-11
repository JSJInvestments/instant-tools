/**
 * @template react/api/fetch
 * API request (via fetch) template
 *
 * @author Craig Myles
 * @version 1.0.1
 * Last updated Wed 12 Dec
 *
 * Instructions:
 *
 * 1. Ensure the `lib/utils/request.js` file has been configured to point at your chosen API.
 *
 * 2. Modify the code as neccessary.
 *
 * 3. Delete these instructions from your file.
 */

import request from 'lib/utils/request';

export const create = async attributes => {
  try {
    return await request.post('/__name__', attributes);
  } catch (error) {
    throw error;
  }
};

export const findById = async id => {
  try {
    return await request.get(`/__name__/${id}`);
  } catch (error) {
    throw error;
  }
};

export const update = async (id, attributes) => {
  try {
    return await request.put(id, attributes);
  } catch (error) {
    throw error;
  }
};

export const remove = async id => {
  try {
    return await request.delete(id);
  } catch (error) {
    throw error;
  }
};
