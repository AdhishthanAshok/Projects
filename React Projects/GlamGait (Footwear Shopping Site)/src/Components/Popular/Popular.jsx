import React from "react";
import "./Popular.css";
import data_product from "../assets/data";
import Item from "../Item/Item";

const Popular = () => {
  return (
    <div className="popular">
      <h1>TRENDING FOOTWEAR</h1>
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
      <div className="popular_button">
        <button>Explore More &#8594; </button>
      </div>
    </div>
  );
};

export default Popular;
