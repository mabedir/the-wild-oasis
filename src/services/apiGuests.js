import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';

/**
 * Fetch all guests from the database.
 */
export async function getGuests({ sortBy, page, all = false }) {
  let query = supabase.from('guests').select('*', { count: 'exact' });

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });
  }

  if (page && !all) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('Failed to fetch guests');
  }

  return { data, count };
}

/**
 * Fetch a single guest by ID.
 * @param {number} id - The ID of the guest to fetch.
 */
export async function getGuestById(id) {
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Guest not found');
  }

  return data;
}

/**
 * Create a new guest in the database.
 * @param {Object} newGuest - The guest data to insert.
 */
export async function createGuest(newGuest) {
  const { data, error } = await supabase
    .from('guests')
    .insert([newGuest])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Guest could not be created');
  }

  return data;
}

/**
 * Update an existing guest in the database.
 * @param {number} id - The ID of the guest to update.
 * @param {Object} updatedGuest - The updated guest data.
 */
export async function updateGuest(newGuestData, id) {
  const { data, error } = await supabase
    .from('guests')
    .update(newGuestData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }

  // if (!data) {
  //   throw new Error(`Guest with ID ${newGuestData.id} not found`);
  // }

  return data;
}

/**
 * Delete a guest from the database.
 * @param {number} id - The ID of the guest to delete.
 */
export async function deleteGuest(id) {
  const { data, error } = await supabase.from('guests').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Guest could not be deleted');
  }

  return data;
}
