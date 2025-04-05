import React, { useState } from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Sofa",
    category: "Living Room",
    image:
      "https://www.ikea.com/global/assets/range-categorisation/images/corner-sofas-10671.jpeg?imwidth=500",
    description: "Comfortable and stylish sofa.",
  },
  {
    id: 2,
    name: "Coffee Table",
    category: "Living Room",
    image:
      "https://www.ikea.com/in/en/images/products/borgeby-coffee-table-black__0987517_pe817555_s5.jpg",
    description: "Elegant coffee table for your living room.",
  },
  {
    id: 3,
    name: "TV Stand",
    category: "Living Room",
    image:
      "https://www.ikea.com/in/en/range-categorisation/images/tv-benches-10810.jpeg",
    description: "Modern TV stand with storage.",
  },
  {
    id: 4,
    name: "Armchair",
    category: "Living Room",
    image:
      "https://www.ikea.com/in/en/images/products/aeleby-swivel-armchair-gunnared-medium-grey-dark-grey__1214832_pe911751_s5.jpg",
    description: "Cozy armchair for relaxation.",
  },
  {
    id: 5,
    name: "Bookshelf",
    category: "Living Room",
    image:
      "https://www.ikea.com/ext/ingkadam/m/3a13b24f76d846d8/original/PH195144.jpg?f=s",
    description: "Spacious bookshelf for organizing books.",
  },
  {
    id: 6,
    name: "Bed",
    category: "Bedroom",
    image:
      "https://www.ikea.com/global/assets/range-categorisation/images/childrens-single-beds-45848.jpeg?imwidth=500",
    description: "King size bed for maximum comfort.",
  },
  {
    id: 7,
    name: "Wardrobe",
    category: "Bedroom",
    image:
      "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_31/2956326/190801-pax-ikea-wardrobe-ew-433p.jpg",
    description: "Spacious wardrobe with sliding doors.",
  },
  {
    id: 8,
    name: "Dresser",
    category: "Bedroom",
    image:
      "https://www.ikea.com/us/en/images/products/hemnes-8-drawer-dresser-white-stain__1151400_pe886164_s5.jpg",
    description: "Stylish dresser with mirror.",
  },
  {
    id: 9,
    name: "Nightstand",
    category: "Bedroom",
    image:
      "https://www.ikea.com/us/en/images/products/brimnes-nightstand-white__1326565_pe944280_s5.jpg",
    description: "Handy nightstand for bedside storage.",
  },
  {
    id: 10,
    name: "Vanity Table",
    category: "Bedroom",
    image:
      "https://www.ikea.com/images/a-big-rectangular-mirror-with-wall-lamps-above-a-white-desk--8adbe88d8cd7acef73abb28096362ceb.jpg?f=xl",
    description: "Elegant vanity table for your beauty essentials.",
  },
  {
    id: 11,
    name: "Dining Table",
    category: "Kitchen",
    image:
      "https://www.ikea.com/images/lisabo-series-aad7a2a4f05400f9546c099000a74b98.jpg?f=s",
    description: "Wooden dining table for family meals.",
  },
  {
    id: 12,
    name: "Cabinets",
    category: "Kitchen",
    image:
      "https://www.ikea.com/ext/ingkadam/m/69bdf5d6b89d9c17/original/PH201587.jpg?f=s",
    description: "Modern kitchen cabinets with ample storage.",
  },
  {
    id: 13,
    name: "Bar Stools",
    category: "Kitchen",
    image:
      "https://www.ikea.com/in/en/images/products/stig-bar-stool-with-backrest-black-black__0948119_pe798874_s5.jpg",
    description: "Stylish bar stools for kitchen counters.",
  },
  {
    id: 14,
    name: "Grass",
    category: "Outdoor",
    image:
      "https://m.media-amazon.com/images/I/61-ehyY8W5L._AC_UF350,350_QL80_.jpg",
    description: "Premium grass for outdoor.",
  },
  {
    id: 15,
    name: "Cookware Set",
    category: "Kitchen",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTonM4MXlWHozDbEsS1aJogc1ryIeQZ2j0r_Q&s",
    description: "Complete cookware set for your kitchen.",
  },
  {
    id: 16,
    name: "Office Desk",
    category: "Office",
    image: "https://m.media-amazon.com/images/I/8124Af5tqUL.jpg",
    description: "Spacious office desk with storage.",
  },
  {
    id: 17,
    name: "Office Chair",
    category: "Office",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKDl3T6Nb8087tWDA-iFKqMJMDd2VDw8zudw&s",
    description: "Ergonomic office chair for long hours.",
  },
  {
    id: 18,
    name: "Filing Cabinet",
    category: "Office",
    image:
      "https://www.ikea.com/global/assets/range-categorisation/images/storage-units-cabinets-10385.jpeg",
    description: "Secure filing cabinet for office documents.",
  },
  {
    id: 19,
    name: "Whiteboard",
    category: "Office",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiGelB5i7oLwDqY7OtAuSRqnietTtYYeAn2g&s",
    description: "Magnetic whiteboard for brainstorming.",
  },
  {
    id: 20,
    name: "Bookshelf",
    category: "Office",
    image:
      "https://www.ikea.com/global/assets/range-categorisation/images/bookcases-shelving-units-st002.jpeg",
    description: "Spacious bookshelf for organizing books.",
  },
];

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState();

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      <h1>Products</h1>
      <table border={"1"} cellPadding={"10"}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.name} height={200} />
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>
                <Link to={"/Details/  " + product.id}>
                  <button>View Details</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <div>
          <h2>{selectedProduct.name}</h2>
          <img src={selectedProduct.image} alt={selectedProduct.name} />
          <p>Category: {selectedProduct.category}</p>
          <p>{selectedProduct.description}</p>
          <button onClick={() => setSelectedProduct()}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Products;
