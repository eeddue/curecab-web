export const generateOrderId = () => {
  const min = 1000000000;
  const max = 9999999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const facilities = [
  { name: "Kenyatta National Hospital CCC (Nairobi)", phone: "+254715432912" },
  {
    name: "Moi Teaching and Referral Hospital CCC (Eldoret)",
    phone: "+254738960475",
  },
  {
    name: "Coast Provincial General Hospital CCC (Mombasa)",
    phone: "+254786548203",
  },
  { name: "Kisumu County Hospital CCC (Kisumu)", phone: "+254723091758" },
  {
    name: "Nyanza Provincial General Hospital CCC (Kisumu)",
    phone: "+254704829361",
  },
  {
    name: "Rift Valley Provincial General Hospital CCC (Nakuru)",
    phone: "+254776154320",
  },
];

export const couriers = [
  "G4S Kenya",
  "DHL Kenya",
  "FedEx Kenya",
  "Aramex",
  "Posta Kenya",
  "Sendy",
  "Fargo Courier",
  "Wells Fargo",
];

export const EMR_patients = [
  {
    ccc_no: "12345678",
    full_name: "John Doe",
    facility: "Coast Provincial General Hospital CCC (Mombasa)",
  },
  {
    ccc_no: "ABC1234",
    full_name: "Chris Parker",
    facility: "Nyanza Provincial General Hospital CCC (Kisumu)",
  },
];

export const patients = [
  {
    ccc_no: "12345678",
    full_name: "John Doe",
    facility: "Coast Provincial General Hospital CCC (Mombasa)",
    phone: "+254712345678",
    username: "johndoe",
    password: "123456",
  },
  {
    ccc_no: "ABC1234",
    full_name: "Chris Parker",
    facility: "Nyanza Provincial General Hospital CCC (Kisumu)",
    phone: "+254738960475",
    username: "amchris",
    password: "123456",
  },
];

export const orders = [
  {
    client: "+254712345678",
    orderId: generateOrderId(),
    address: "2 Kalimoni",
    deliverBy: new Date().getTime() + 600000,
    deliveryFee: 340,
    courier: "Posta Kenya",
    status: "delivered",
    orderDate: new Date().getTime() - 6000000,
  },
  {
    client: "+254712345678",
    orderId: generateOrderId(),
    address: "9 Nakuru",
    deliverBy: new Date().getTime() + 600000,
    orderDate: new Date().getTime() - 6000000,
    deliveryFee: 340,
    courier: "Posta Kenya",
    status: "pending",
  },
  {
    client: "+254738960475",
    orderId: generateOrderId(),
    address: "204 Githurai",
    orderDate: new Date().getTime() - 6000000,
    deliverBy: new Date().getTime() + 600000,
    deliveryFee: 340,
    courier: "Posta Kenya",
    status: "delivered",
  },
  {
    client: "+254738960475",
    orderId: generateOrderId(),
    address: "2 Changamwe",
    orderDate: new Date().getTime() - 6000000,
    deliverBy: new Date().getTime() + 600000,
    deliveryFee: 340,
    courier: "Posta Kenya",
    status: "failed",
  },
  {
    client: "+254738960475",
    orderId: generateOrderId(),
    address: "234 Kisumu",
    deliverBy: new Date().getTime() + 600000,
    deliveryFee: 340,
    courier: "Posta Kenya",
    status: "pending",
  },
];
