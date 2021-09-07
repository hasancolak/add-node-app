import React from "react";
import "./list.scss";

/**
 * @function List
 * @param (any) nodes
 * @retun List component
 */
const List = ({ nodes }: any): JSX.Element => {
  return nodes.map((item: any) => (
    <>
      <div className="node-list">
        <div className="node-title">{item.title}</div>
        <div className="node-icon">
          <img src={item.image} alt={item.title} />
        </div>
        <div className="node-description">{item.description}</div>
      </div>
    </>
  ));
};

export default List;
