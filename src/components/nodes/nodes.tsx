import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  getNodesAsync,
  selectNodes,
  selectListNodes,
  INodes,
  updateNodes,
} from "../../store/nodes.slice";
import List from "../list/list";
import Search from "../search/search";
import "./nodes.scss";

/**
 * @function Nodes
 * @retun Nodes component
 */
const Nodes = () => {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector(selectNodes);
  const listNodes = useAppSelector(selectListNodes) as INodes[];

  useEffect(() => {
    if (!nodes?.length) {
      console.log("caş", nodes?.length);
      dispatch(getNodesAsync());
    }
  }, []);

  const handleChange = (value: string) => {
    dispatch(updateNodes(value));
  };

  return (
    <>
      <Search name="node" options={nodes} handleChange={handleChange}></Search>
      <div className="node-list-content">
        <List nodes={listNodes}></List>
      </div>
    </>
  );
};

export default Nodes;
