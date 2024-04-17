import React from "react";
import "./Popular.css";
import data_product from "../assets/data";
import Item from "../Item/Item";

const Popular = () => {
  return (
    <div className="popular">
      <h1>POPULAR IN MEN</h1>
      <div className="popular_item">
        {data_product.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            old_price={item.old_price}
            new_price={item.new_price}
          />
        ))}
      </div>
      <button>Explore More &#8594; </button>
    </div>
  );
};

export default Popular;
