const  getProducts = async() => {
    return [
        {
            id: "1",
            name: "Classic Polo Shirt",
            brand: "Polo Ralph Lauren",
            description: "Men's Classic Fit Soft Cotton Polo",
            image:
                "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            price: 110.0,
            colors: [
                { name: "Navy", class: "bg-blue-900" },
                { name: "White", class: "bg-white border border-gray-300" },
                { name: "Gray", class: "bg-gray-500" },
                { name: "Black", class: "bg-black" },
                { name: "Red", class: "bg-red-600" },
            ],
            isNewArrival: true,
            rating: 4.5,
            reviewCount: 512,
            complimentaryGiftWrap: true,
        },
        {
            id: "2",
            name: "Women's V-Neck Scrub Top",
            brand: "Ecoflex",
            description: "Comfortable and durable medical scrub top",
            image:
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            price: 39.99,
            colors: [
                { name: "Navy", class: "bg-blue-800" },
                { name: "Maroon", class: "bg-red-800" },
                { name: "Gray", class: "bg-gray-600" },
                { name: "Black", class: "bg-black" },
                { name: "Teal", class: "bg-teal-500" },
            ],
            isNewArrival: false,
            bestseller: true,
            rating: 4.8,
            reviewCount: 1024,
        },
        {
            id: "3",
            name: "Modern Hoodie",
            description: "Unisex Cotton Blend Hoodie",
            image:
                "https://images.unsplash.com/photo-1554342321-0776d282ceac?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            price: 75.0,
            colors: [
                { name: "Charcoal", class: "bg-gray-700" },
                { name: "Olive", class: "bg-green-700" },
                { name: "Beige", class: "bg-yellow-200" },
            ],
            isNewArrival: true,
        },
    ]
}

export { getProducts }