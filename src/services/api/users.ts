import type { User } from "../../types/user";

// External Mock API URL (using mocky.io)
const MOCK_API_URL = 'https://run.mocky.io/v3/f7b3c3e0-8b1a-4b1a-8b1a-8b1a8b1a8b1a';

// Fallback mock data generator for development
const generateMockUsers = (count: number): User[] => {
  const users: User[] = [];
  const organizations = ['Lendsqr', 'Irorun', 'Lendstar', 'Kiakia', 'Renmoney'];
  const statuses: User['status'][] = ['Active', 'Inactive', 'Pending', 'Blacklisted'];
  
  for (let i = 1; i <= count; i++) {
    const user: User = {
      id: `user-${i}`,
      organization: organizations[Math.floor(Math.random() * organizations.length)],
      username: `User ${i}`,
      email: `user${i}@example.com`,
      phoneNumber: `+234${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      dateJoined: new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      bankBalance: Math.floor(Math.random() * 1000000) + 10000,
      accountNumber: (Math.floor(Math.random() * 9000000000) + 1000000000).toString(),
      tier: Math.floor(Math.random() * 3) + 1,
      personalInfo: {
        fullName: `User ${i}`,
        phoneNumber: `+234${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        emailAddress: `user${i}@example.com`,
        bvn: `${Math.floor(Math.random() * 90000000000) + 10000000000}`,
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        maritalStatus: Math.random() > 0.5 ? 'Single' : 'Married',
        children: Math.floor(Math.random() * 4).toString(),
        typeOfResidence: Math.random() > 0.5 ? 'Parent\'s Apartment' : 'Rented Apartment'
      },
      educationEmployment: {
        levelOfEducation: ['B.Sc', 'M.Sc', 'Ph.D', 'HND'][Math.floor(Math.random() * 4)],
        employmentStatus: ['Employed', 'Unemployed', 'Self-employed'][Math.floor(Math.random() * 3)],
        sectorOfEmployment: ['FinTech', 'Healthcare', 'Education', 'Technology'][Math.floor(Math.random() * 4)],
        durationOfEmployment: `${Math.floor(Math.random() * 10) + 1} years`,
        officeEmail: `user${i}@example.com`,
        monthlyIncome: Math.floor(Math.random() * 500000) + 50000,
        loanRepayment: Math.floor(Math.random() * 50000) + 5000
      },
      socials: {
        twitter: `@user${i}`,
        facebook: `User ${i}`,
        instagram: `@user${i}`
      },
      guarantor: {
        fullName: `Guarantor ${i}`,
        phoneNumber: `+234${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        emailAddress: `guarantor${i}@example.com`,
        relationship: ['Sister', 'Brother', 'Friend', 'Colleague'][Math.floor(Math.random() * 4)]
      }
    };
    users.push(user);
  }
  
  return users;
};

// Generate fallback data
const fallbackUsers = generateMockUsers(500);

export const fetchUsers = async (): Promise<User[]> => {
  try {
    // Try to fetch from external mock API first
    const response = await fetch(MOCK_API_URL);
    if (response.ok) {
      const data = await response.json();
      return data.users || data;
    }
  } catch (error) {
    console.warn('External API failed, using fallback data:', error);
  }
  
  // Fallback to local mock data
  await new Promise(resolve => setTimeout(resolve, 1000));
  return fallbackUsers;
};

export const fetchUserById = async (id: string): Promise<User | null> => {
  try {
    // Try to fetch from external mock API first
    const response = await fetch(`${MOCK_API_URL}/${id}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.warn('External API failed, using fallback data:', error);
  }
  
  // Fallback to local mock data
  await new Promise(resolve => setTimeout(resolve, 500));
  return fallbackUsers.find(user => user.id === id) || null;
};

export const getUserStats = async () => {
  let users = fallbackUsers;
  
  try {
    // Try to get users from API first
    users = await fetchUsers();
  } catch (error) {
    console.warn('Using fallback data for stats');
  }
  
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'Active').length;
  const usersWithLoans = users.filter(user => user.educationEmployment.loanRepayment > 0).length;
  const usersWithSavings = users.filter(user => user.bankBalance > 50000).length;
  
  return {
    totalUsers,
    activeUsers,
    usersWithLoans,
    usersWithSavings
  };
};

// Store users in localStorage
export const storeUserInLocalStorage = (user: User): void => {
  try {
    localStorage.setItem(`user-${user.id}`, JSON.stringify(user));
  } catch (error) {
    console.error("Error storing user in localStorage:", error);
  }
};

// Retrieve user from localStorage
export const getUserFromLocalStorage = (id: string): User | null => {
  try {
    const userData = localStorage.getItem(`user-${id}`);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error retrieving user from localStorage:", error);
    return null;
  }
};
