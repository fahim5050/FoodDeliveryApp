export const categories=[
    {
        id:1,
        name:'Pizza',
        image: require('../Assets/categories/icons8-pizza-96.png'),
    },
    {
        id:2,
        name:'Burger',
        image: require('../Assets/categories/icons8-hamburger-96.png'),
    },
    {
        id:3,
        name:'italian',
        image: require('../Assets/categories/icons8-cupcake-emoji-96.png'),
    },
    {
        id:4,
        name:'chanies',
        image: require('../Assets/categories/icons8-tropical-fish-96.png'),
    },
    {
        id:5,
        name:'Pakistani',
        image: require('../Assets/categories/icons8-takeout-box-96.png'),
    },
    {
        id:6,
        name:'Noodles',
        image: require('../Assets/categories/icons8-tropical-fish-96.png'),
    },
]
// export const Featured={
//     id:1,
//     title:'hot and spicy',
//     description:'soft and tender freid chicken',
//     restaurants:[
//         {
//             id:1,
//             name:'papa jhons',
//             image: require('../Assets/restaurants/bdcd233971b7c81bf77e1fa4471280eb (1).webp'),
//             description:'hot and spicy pizzas',
//             lng:38.21455,
//             lat:-85.2547,
//             address:'234 second street',
//             star:4,
//             review:'4.4k',
//             category:'fast Food',
//             dishes:[
//                 {
//                     id:1,
//                     name:'pizza',
//                     description:'cheezy garlic pizza',
//                     price:10,
//                     image:require('../Assets/dishes/images (2).jpeg')
//                 },
//                 {
//                     id:2,
//                     name:'pizza',
//                     description:'cheezy garlic pizza',
//                     price:15,
//                     image:require('../Assets/dishes/download (2) (3).jpeg')
//                 },
//                 {
//                     id:3,
//                     name:'pizza',
//                     description:'cheezy garlic pizza',
//                     price:12,
//                     image:require('../Assets/dishes/download (2) (2).jpeg')
//                 },
//                 {
//                     id:4,
//                     name:'pizza',
//                     description:'cheezy garlic pizza',
//                     price:8,
//                     image:require('../Assets/dishes/images (2).jpeg')
//                 },
//                 {
//                     id:5,
//                     name:'pizza',
//                     description:'cheezy garlic pizza',
//                     price:7,
//                     image:require('../Assets/dishes/images (1) (1).jpeg')
//                 },
//                 {
//                     id:6,
//                     name:'pizza',
//                     description:'cheezy garlic pizza',
//                     price:20,
//                     image:require('../Assets/dishes/images (3).jpeg')
//                 },
//             ]
//         }
//     ]
// }
export const featured = {
    id: 1,
    title: 'hot and spicy',
    description: 'soft and tender fried chicken',
    restaurants: [
        {
            id: 1,
            name: 'Papa John\'s',
            image: require('../Assets/restaurants/restaurant.jpg'),
            description: 'hot and spicy pizzas',
            lng: 38.21455,
            lat: -85.2547,
            address: '234 Second Street',
            star: 4,
            review: '4.4k',
            category: 'fast Food',
            dishes: [
                {
                    id: 1,
                    name: 'Pizza',
                    description: 'cheezy garlic pizza',
                    price: 10,
                    image: require('../Assets/dishes/download.jpeg'),
                },
                {
                    id: 2,
                    name: 'Pizza',
                    description: 'cheezy garlic pizza',
                    price: 15,
                    image: require('../Assets/dishes/download6.jpeg'),
                },
            ],
        },
        {
            id: 2,
            name: 'Burger King',
            image: require('../Assets/restaurants/hotel.jpg'),
            description: 'flame-grilled burgers',
            lng: 38.21875,
            lat: -85.2647,
            address: '456 Third Street',
            star: 4.2,
            review: '3.8k',
            category: 'burgers',
            dishes: [
                {
                    id: 1,
                    name: 'Whopper',
                    description: 'classic flame-grilled burger',
                    price: 7,
                    image: require('../Assets/dishes/download1.jpeg'),
                },
                {
                    id: 2,
                    name: 'Chicken Fries',
                    description: 'crispy chicken fries',
                    price: 5,
                    image: require('../Assets/dishes/download2.jpeg'),
                },
                {
                    id: 3,
                    name: 'Chicken Sandwich',
                    description: 'crispy chicken on a soft bun',
                    price: 6,
                    image: require('../Assets/dishes/download6.jpeg'),
                },
                {
                    id: 4,
                    name: 'Chicken Sandwich',
                    description: 'crispy chicken on a soft bun',
                    price: 6,
                    image: require('../Assets/dishes/download6.jpeg'),
                },
            ],
        },
        {
            id: 3,
            name: 'Subway',
            image: require('../Assets/restaurants/rawImage.jpg'),
            description: 'fresh sandwiches and salads',
            lng: 38.22567,
            lat: -85.2548,
            address: '789 Fourth Avenue',
            star: 4.5,
            review: '5.2k',
            category: 'healthy',
            dishes: [
                {
                    id: 1,
                    name: 'Veggie Delight',
                    description: 'fresh veggies and cheese',
                    price: 6,
                    image: require('../Assets/dishes/download.jpeg'),
                },
                {
                    id: 2,
                    name: 'Italian BMT',
                    description: 'spicy Italian meats with cheese',
                    price: 8,
                    image: require('../Assets/dishes/download6.jpeg'),
                },
            ],
        },
        {
            id: 4,
            name: 'KFC',
            image: require('../Assets/restaurants/inside-the-restaurant.jpg'),
            description: 'crispy fried chicken',
            lng: 38.22834,
            lat: -85.2674,
            address: '101 Fifth Avenue',
            star: 4.3,
            review: '4.9k',
            category: 'chicken',
            dishes: [
                {
                    id: 1,
                    name: 'Bucket Meal',
                    description: 'crispy fried chicken with sides',
                    price: 20,
                    image: require('../Assets/dishes/download.jpeg'),
                },
                {
                    id: 2,
                    name: 'Chicken Sandwich',
                    description: 'crispy chicken on a soft bun',
                    price: 6,
                    image: require('../Assets/dishes/download6.jpeg'),
                },
            ],
        },
    ],
};
