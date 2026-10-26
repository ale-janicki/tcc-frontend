import axios from "axios";

type Deposit = {
  date_deposit: string;
  earned_credit: number;
  number_of_batteries: number;
};

type User = {
  id: number;
  name_user: string;
  email: string;
  password_user: string;
  terms_conditions: string;
  share_data: string;
  credits: number;
  deposits: Deposit[];
};

type LastDeposit = {
  informed: number;
  valid: number;
  returned: number;
  credits: number;
};

const DETECTION_DELAY_MS = 2000;

const users: User[] = [
  {
    id: 1,
    name_user: "Visitante",
    email: "demo@totem.dev",
    password_user: "demo123",
    terms_conditions: "true",
    share_data: "false",
    credits: 12,
    deposits: [
      { date_deposit: "2025-3-10", earned_credit: 5, number_of_batteries: 5 },
      { date_deposit: "2025-3-24", earned_credit: 7, number_of_batteries: 7 },
    ],
  },
];

const session: {
  userId: number | null;
  pendingQuantity: number;
  validBatteries: number;
  informedBatteries: number;
  lastDeposit: LastDeposit | null;
} = {
  userId: null,
  pendingQuantity: 0,
  validBatteries: 0,
  informedBatteries: 0,
  lastDeposit: null,
};

const httpError = (status: number) => ({ response: { status } });

const currentUser = () => users.find((u) => u.id === session.userId);

const publicUser = (user: User) => user;

export const getDate = () => {
  const dataAtual = new Date();

  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth() + 1;
  const dia = dataAtual.getDate();

  return `${ano}-${mes}-${dia}`;
};

export const isAuthenticated = () => session.userId !== null;

export const authLogin = (email: string, password: string) => {
  const user = users.find(
    (u) => u.email === email && u.password_user === password
  );
  if (!user) return Promise.reject(httpError(401));
  session.userId = user.id;
  return Promise.resolve({ data: { access_token: `demo-token-${user.id}` } });
};

export const checkToken = () => {
  const user = currentUser();
  if (!user) return Promise.reject(httpError(401));
  return Promise.resolve({ data: publicUser(user) });
};

export const createUser = async (
  name_user: string,
  email: string,
  password_user: string,
  terms_conditions: string,
  share_data: string
) => {
  if (users.some((u) => u.email === email)) throw httpError(409);
  users.push({
    id: users.length + 1,
    name_user,
    email,
    password_user,
    terms_conditions,
    share_data,
    credits: 0,
    deposits: [],
  });
  return { status: 201, data: {} };
};

export const getUserInfo = () => checkToken();

export const setBatteryQuantity = (quantity: number) => {
  session.pendingQuantity = quantity;
};

export const countBattery = () => {
  const informed = session.pendingQuantity;
  const rejected = Math.random() < 0.5 ? 0 : 1;
  const valid = Math.max(0, informed - rejected);
  session.informedBatteries = informed;
  session.validBatteries = valid;
  return new Promise<{ data: { count: number } }>((resolve) =>
    setTimeout(() => resolve({ data: { count: valid } }), DETECTION_DELAY_MS)
  );
};

export const createDeposit = () => {
  const user = currentUser();
  if (!user) return Promise.reject(httpError(401));
  const valid = session.validBatteries;
  const earnedCredits = valid * 1;
  user.credits += earnedCredits;
  user.deposits.push({
    date_deposit: getDate(),
    earned_credit: earnedCredits,
    number_of_batteries: valid,
  });
  session.lastDeposit = {
    informed: session.informedBatteries,
    valid,
    returned: session.informedBatteries - valid,
    credits: earnedCredits,
  };
  return Promise.resolve({ data: session.lastDeposit });
};

export const getLastDeposit = () => session.lastDeposit;

export const cepCheck = async (cep: string) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
  } catch (error) {}
};
