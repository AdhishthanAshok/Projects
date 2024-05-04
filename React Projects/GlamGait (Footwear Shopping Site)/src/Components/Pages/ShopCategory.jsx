import React from "react";
import "../PagesCSS/ShopCategory.css";
import Item from "../Item/Item.jsx";
import data_product from "../assets/data.js";

const ShopCategory = ({ category }) => {
  return (
    <div className="main_shop_category">
      <div className="shop_category_hero">
        <h1 className="shop_category_main_heading">Popular in {category}</h1>
        <div className="shop_category_popular_item">
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
      </div>
    </div>
  );
};

export default ShopCategory;
