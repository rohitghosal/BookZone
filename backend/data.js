import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name : 'Rohit',
      email: 'rohit01845@gmail.com',
      password: bcrypt.hashSync('rohit@2021', bcrypt.genSaltSync(10)),
      isAdmin : true,
      isSeller : true,
      seller: {
        name: 'BookPoint',
        logo: '/images/bookpoint.png',
        description: 'best seller',
        rating: 4.5,
        numReviews: 120,
        },
    },
    {
      name : 'Virat',
      email: 'anonymous.sourav35@gmail.com',
      password: bcrypt.hashSync('virat@2021', bcrypt.genSaltSync(10)),
      isAdmin : false,
      seller :{
        name : 'Cryo Store',
        logo : '/images/cryo.jpeg',
        description : 'Genuine seller',
        rating : 4.0,
        numReviews : 87,
      },
    }
  ],
    products: [
      {
        
        name: 'Core JAVA : Volume I',
        category: 'Programming',
        image: '/images/p1.png',
        price: 120,
        countInStock: 10,
        brand: 'Oreilly',
        rating: 4.5,
        numReviews: 10,
        description: 'high quality product',
      },
      {
        
        name: 'Python for beginners',
        category: 'Programming',
        image: '/images/p2.png',
        price: 100,
        countInStock: 15,
        brand: 'Oreilly',
        rating: 4.0,
        numReviews: 10,
        description: 'high quality product',
      },
      {
        
        name: 'Learning SQL',
        category: 'Programming',
        image: '/images/p3.png',
        price: 220,
        countInStock: 0,
        brand: 'TataMcHill',
        rating: 4.8,
        numReviews: 17,
        description: 'high quality product',
      },
      {
       
        name: 'Modern C Language',
        category: 'Programming',
        image: '/images/p4.png',
        price: 78,
        countInStock: 8,
        brand: 'PH Publications',
        rating: 4.5,
        numReviews: 14,
        description: 'high quality product',
      },
      {
       
        name: 'Beautiful c++',
        category: 'Programming',
        image: '/images/p5.png',
        price: 65,
        countInStock: 20,
        brand: 'TataMcHill',
        rating: 4.5,
        numReviews: 10,
        description: 'high quality product',
      },
      {
        
        name: 'Programming PHP',
        category: 'Programming',
        image: '/images/p6.png',
        price: 139,
        countInStock: 12,
        brand: 'Khan publication',
        rating: 4.5,
        numReviews: 15,
        description: 'high quality product',
      },
    ],
  };
  export default data;
