/**
 * TestUser interface — all fields required by the ParaBank registration form.
 */
import { ENV } from '../config/env';

export interface TestUser {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  ssn: string;
  username: string;
  password: string;
}

/**
 * Generates a unique test user for each invocation.
 */
export function generateTestUser(): TestUser {
  const randomSuffix = Math.floor(Math.random() * 1_000_000);
  return {
    firstName: 'Madhu',
    lastName: 'TestUser',
    address: '123 Automation Lane',
    city: 'Bangalore',
    state: 'Karnataka',
    zipCode: '903210',
    phone: '8242423536',
    ssn: '123456789',
    username: `M$hreetestuser${randomSuffix}`,
    password: 'MadhuSePass@123',
  };
}

/**
 * Pre-existing ParaBank demo account — used to test duplicate-username rejection.
 */
export const existingUser: TestUser = {
  firstName: 'Kamala',
  lastName: 'Janes',
  address: '42th Street',
  city: 'Bangalore',
  state: 'Karnataka',
  zipCode: '560001',
  phone: '9999999999',
  ssn: '123456789',
  username: ENV.EXISTING_USERNAME,
  password: ENV.EXISTING_PASSWORD,
};
