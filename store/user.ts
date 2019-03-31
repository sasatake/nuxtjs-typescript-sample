interface User {
  name: string;
  city: string;
  email: string;
  avatar: string;
  updatedAt: Date;
}

const users: User[] = [
  {
    name: 'test01',
    city: 'Tokyo',
    email: 'test01@mail.co.jp',
    avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    updatedAt: new Date()
  },
  {
    name: 'test02',
    city: 'New York',
    email: 'test02@mail.co.jp',
    avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    updatedAt: new Date()
  },
  {
    name: 'test03',
    city: 'London',
    email: 'test03@mail.co.jp',
    avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
    updatedAt: new Date()
  }
];

export const state = function() {
  return { users: users };
};
