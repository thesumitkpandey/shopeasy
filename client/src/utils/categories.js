const categories = [
  "Men",
  "Women",
  "Kids",
  "Electronics",
  "Furniture",
  "Grocery",
];
const newCategories = [
  {
    name: "Men",
    carouselItems: [
      {
        image:
          "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/17/eb6408d8-b413-49f7-8525-317fddba53821650180659351-Casual---Sports-Shoes_Desk.jpg",
        link: "",
      },
      {
        image:
          "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/17/abd2b07f-954c-43ad-ba39-bfa50527d0641650180659364-Backpacks---Luggage_Desk.jpg",
        link: "",
      },
      {
        image:
          "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/3/e384cb32-690c-4ccf-a6cb-61df36960bb21651599573972-Workwear_Desk.jpg",
        link: "",
      },
      {
        image:
          "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/3/b54399f0-6ed5-44b3-84b0-e9d5c1657aaa1651599573991-CR7_Desk_Baner.jpg",
        link: "",
      },
      {
        image:
          "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/3/846beb79-ada7-48c3-a6c6-4448f276c2111651599573979-Sports-Shoes_Desk.jpg",
        link: "",
      },
    ],
  },
  {
    name: "Women",
    carouselItems: [
      {
        image:
          "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/10/7feef02b-0072-4c1b-b83d-4e46a5d93c6b1649530621162-Sangria_Desk_Banner.jpg",
        link: "",
      },
      {
        image:
          "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/3/a20271c6-249f-480b-bcc7-1b150516e54e1651599573998-Dressberry_Desk.jpg",
        link: "",
      },
      {
        image:
          "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/10/9dc6368b-8168-495f-8259-97e29f523b0c1649582887347-Loungewear_Desk.jpg",
        link: "",
      },
      {
        image:
          "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/3/3f6d1e2a-5ef6-4921-be5d-443a11b11d801651599573985-Dresses_Desk.jpg",
        link: "",
      },
      {
        image:
          "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/17/1377cd42-3e4c-4cd7-ae0e-1719e81ff1db1650181498574-Formal-Footwear_Desk.jpg",
        link: "",
      },
    ],
  },
  {
    name: "Kids",
    carouselItems: [
      {
        image:
          "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/12/a606c305-a23f-4fe3-a630-343ced4a10261649782019470-Kids-Wear_Desk_Banner.jpg?v1",
        link: "",
      },
      {
        image:
          "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/12/09f0df54-6f8f-4bb0-a4b9-3b374d4538561649782019495-Top-Brands-2_Desk_Banner.jpg",
        link: "",
      },
      {
        image:
          "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/12/b97efc90-2359-48ea-bf74-9c72d552fdef1649782019503-T-Shirts-_-Shorts_Desk_Banner.jpg",
        link: "",
      },
      {
        image:
          "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/12/0e977afc-87e2-4798-a0d6-bfb05ba796911649782019489-Super-Bottoms_Desk_Banner.jpg",
        link: "",
      },
      {
        image:
          "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/12/09f0df54-6f8f-4bb0-a4b9-3b374d4538561649782019495-Top-Brands-2_Desk_Banner.jpg",
        link: "",
      },
    ],
  },
  {
    name: "Electronics",
    carouselItems: [
      {
        image:
          "https://rukminim2.flixcart.com/fk-p-flap/844/140/image/e6aab87e24c28e27.jpg?q=50",
        link: "",
      },
      {
        image:
          "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/20a160ef30776af8.jpeg?q=20",
        link: "",
      },
      {
        image:
          "https://rukminim2.flixcart.com/fk-p-flap/844/140/image/4bef3f079b135269.jpg?q=50",
        link: "",
      },
      {
        image:
          "https://rukminim2.flixcart.com/fk-p-flap/844/140/image/8d45cbb529627016.jpg?q=50",
        link: "",
      },
      {
        image:
          "https://rukminim2.flixcart.com/fk-p-flap/844/140/image/e8988eebd8073562.jpg?q=50",
        link: "",
      },
    ],
  },
  {
    name: "Furniture",
    carouselItems: [
      {
        image:
          "https://f.media-amazon.com/images/G/31/img18/HomeImprovement/GW/HMDApril/Buy-more--save-more_Header-design_3000x770._SX3000_QL85_.jpg",
        link: "",
      },
      {
        image:
          "https://f.media-amazon.com/images/G/31/img18/HomeImprovement/GW/HMDApril/60-off-Deals-on-Home-improvement-_Header-design_3000x770._SX3000_QL85_.jpg",
        link: "",
      },
      {
        image:
          "https://ii1.pepperfry.com/assets/d270c629-21b9-4892-a5fc-529f1cf1b631.jpg",
        link: "",
      },
      {
        image:
          "https://ii1.pepperfry.com/assets/9195caf6-a884-4ea3-97b4-977853428e52.jpg",
        link: "",
      },
      {
        image:
          "https://f.media-amazon.com/images/G/31/img18/HomeImprovement/GW/LS/Pc._SX3000_QL85_.jpg",
        link: "",
      },
    ],
  },
  {
    name: "Grocery",
    carouselItems: [
      {
        image:
          "https://f.media-amazon.com/images/G/31/img24/AUG/BAU/ss1500x300_SF-header-banners_9._SX1500_QL85_.jpg",
        link: "",
      },
      {
        image:
          "https://f.media-amazon.com/images/G/31/img24/AUG/BAU/1500x300_PC_TCPL._SX1500_QL85_.jpg",
        link: "",
      },
      {
        image:
          "https://f.media-amazon.com/images/G/31/img24/Fresh/kmargso/Fests/Cooking_essentials_1500x300_Aug._SX1500_QL85_.jpg",
        link: "",
      },
      {
        image:
          "https://f.media-amazon.com/images/G/31/img24/AUG/BAU/coca-cola_banner_1500x300_01-v1._SX1500_QL85_.jpg",
        link: "",
      },
      {
        image:
          "https://f.media-amazon.com/images/G/31/img24/AUG/BAU/pbFresh_Header_PC_1500x300._SX1500_QL85_.jpg",
        link: "",
      },
    ],
  },
];

export { newCategories };
export default categories;
