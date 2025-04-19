// src/utils/uuid.ts
import { v4 as uuidv4 } from 'uuid';

/**
 * Génère un identifiant UUIDv4 unique
 * @returns {string} UUID généré
 */
export const generateUUID = (): string => {
  return uuidv4();
};
