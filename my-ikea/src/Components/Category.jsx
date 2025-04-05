import React from "react";

const Category = () => {
  const categories = [
    {
      id: 1,
      name: "Living Room",
      image:
        "https://lh7-us.googleusercontent.com/HdjziRWTOU-BlN2K2vAOTlsKEv02vFv5fbTgBnViDeIDBYgWvM7GLE0-L7FX39gurwsYjwY0_GJ789GHZYLJoiwQEwVoRrL0_5uK5l1r-EqMH0UWKSGqpkcf4Cmo7j1eYxkTlPYwfAG6Pxq4gUaH0g",
    },
    {
      id: 2,
      name: "Bedroom",
      image:
        "https://www.ikea.com/images/a-white-nordli-bed-with-storage-and-headboard-covered-in-vit-5f165a2547ac48176cae7d11ebefa818.jpg?f=s",
    },
    {
      id: 3,
      name: "Kitchen",
      image:
        "https://www.ikea.com/ext/ingkadam/m/3915edf2b352cb8e/original/PH201870.jpg?f=s",
    },
    {
      id: 4,
      name: "Office",
      image:
        "https://www.ikea.com/images/a-modernly-furnished-office-environment-with-light-green-wal-b5d6d51fddd09635080c4337baf089eb.jpg?f=s",
    },
    {
      id: 5,
      name: "Outdoor",
      image:
        "https://www.ikea.com/images/naemmaroe-series-988abf8a31c11f20b4e3d955a7f18f30.jpg?f=s",
    },
  ];

  return (
    <div>
      <h1>Categories</h1>
      <div>
        {categories.map((category) => (
          <div key={category.id}>
            <img
              src={category.image}
              alt={category.name}
              width={500}
              height={250}
            />
            <h2 className="text-lg font-semibold mt-2">{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
