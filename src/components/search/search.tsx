import React, { useState } from "react";
import "./search.scss";

/**
 * @function Search
 * @param options
 * @param name
 * @param handleChange
 * @returns
 */
const Search = ({ options = {}, name, handleChange }: any) => {
  const [value, setValue] = useState("");

  const optionsHTML = options.map((data: any, index: any) => (
    <option key={index} value={data.title}>
      {data.title}
    </option>
  ));

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    if (options.some((item: any) => item.title === value)) {
      handleChange(value);
      setValue("");
    }
  };

  return (
    <>
      <div className="search-box">
        <form>
          <input
            type="text"
            name={name}
            list={name}
            onChange={handleOnChange}
            value={value}
            placeholder={`Add New Node...`}
          />
          <datalist id={name}>{optionsHTML}</datalist>
        </form>
      </div>
    </>
  );
};

export default Search;
