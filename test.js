const users = {
    admin: {
      id: 1,
      name: '大脸怪(admin)',
      avatar: 'https://assets.qszone.com/images/avatar.jpg',
      email: 'Ronnie@123.com',
      role: ['admin'],
    },
    editor: {
      id: 2,
      name: '大脸怪(editor)',
      avatar: 'https://assets.qszone.com/images/avatar.jpg',
      email: 'Ronnie@123.com',
      role: ['editor'],
    },
    guest: {
      id: 3,
      name: '访客(guest)',
      avatar: 'https://assets.qszone.com/images/avatar.jpg',
      role: [],
    },
  }
const token='123'
console.log(users[token] )
console.log(users[token] || users.guest)