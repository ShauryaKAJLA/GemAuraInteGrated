const productsData=[
    {
        name:"Colambia emerald ring",
        desc:"rare emerald fitted in ring by experts",
        metal:{
            type:"White Gold",
            pricePerGram:6500,
            weightInGram:20,
        },
        Gem:{
            type:"Emerald",
            weightInCaret:3,
            totalPrice:100000,
        },
        gender:"m",
        type_of:"Ring",
        images:[
                    '/src/assets/product1_1.png' ,
                   "/src/assets/product1_2.webp",
                    "/src/assets/product1_3.webp",
                    "/src/assets/product1_4.webp"
        ],
        instock:true,
        size:20
    },
    {
        name:"Diamond ring",
        desc:"rare Diamond fitted in ring by experts",
        metal:{
            type:"Platinum",
            pricePerGram:8000,
            weightInGram:10,
        },
        Gem:{
            type:"Diamond",
            weightInCaret:2,
            totalPrice:200000,
        },
        gender:"w",
        type_of:"Ring",
              images:[
                    '/src/assets/diamond.webp',
                    "jicsid",
                    "jicsid",
                   "jicsid",
              ],
              instock:true,
              size:20
    },
    {
        name:"Diamond Necklace",
        desc:"rare Diamond fitted in necklace by experts",
        metal:{
            type:"Gold",
            pricePerGram:8000,
            weightInGram:100,
        },
        Gem:{
            type:"Diamond",
            weightInCaret:2,
            totalPrice:200000,
        },
                gender:"k",
                type_of:"Necklace",
              images:[
                  '/src/assets/necklace.png',
                    "jicsid",
                    "jicsid",
                    "jicsid",
              ],
              instock:false
    },
    {
        name:"Diamond Long Earring",
        desc:"excellent design , italian silver and vvs diamond filled by experts",
        metal:{
            type:"Silver",
            pricePerGram:150,
            weightInGram:100,
        },
        Gem:{
            type:"Diamond",
            weightInCaret:2,
            totalPrice:2000000,
        },
        gender:"w",
        type_of:"Earring",
        images:[
            
            '/src/assets/product4.png',
            "jicsid",
            "jicsid",
            "jicsid",
        ],
        instock:true
    },
    
    {
        name:"Diamond Woman Ring",
        desc:"Daily wear rings lite weight and also super quality",
        metal:{
            type:"Silver",
            pricePerGram:7000,
            weightInGram:80,
        },
        Gem:{
            type:"Diamond",
            weightInCaret:2,
            totalPrice:70000,
        },
                gender:"w",
                type_of:"Ring",
              images:[
                  '/src/assets/product5.png',
                    "jicsid",
                    "jicsid",
                    "jicsid",
              ],
              instock:true,
              size:20,
    },
    {
        name:"Diamond Woman Necklace",
        desc:"Luxerious necklace with vvs Diamonds",
        metal:{
            type:"Platinum",
            pricePerGram:10000,
            weightInGram:150,
        },
        Gem:{
            type:"Diamond",
            weightInCaret:2,
            totalPrice:70000,
        },
                gender:"w",
                type_of:"Necklace",
              images:[
                  '/src/assets/product6.png',
                    "jicsid",
                    "jicsid",
                    "jicsid",
              ],
              instock:true
    },
    {
        name:"Diamond Woman Earing",
        desc:"Luxerious Earring with blue stone",
        metal:{
            type:"Platinum",
            pricePerGram:10000,
            weightInGram:150,
        },
        Gem:{
            type:"Diamond",
            weightInCaret:2,
            totalPrice:70000,
        },
                gender:"w",
                type_of:"Earring",
              images:[
                  '/src/assets/product7.png',
                    "jicsid",
                    "jicsid",
                    "jicsid",
              ],
              instock:true
    },
    {
        name:"Mens Platinum Bracelet",
        desc:"Platinum Expert hand crafted bracelet",
        metal:{
            type:"Platinum",
            pricePerGram:10000,
            weightInGram:150,
        },
        Gem:{
            type:"None",
            weightInCaret:0,
            totalPrice:0,
        },
                gender:"w",
                type_of:"Bracelet",
              images:[
                  '/src/assets/product8.png',
                    "jicsid",
                    "jicsid",
                    "jicsid",
              ],
              instock:true
    },

]


module.exports={productsData}