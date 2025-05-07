import React from "react";

export const displayOptionsTree = (listCategories, level = 0) => {
  return listCategories.map(item => (
    <React.Fragment key={item.id}>
      <option value={item.id}>
        {`${"--".repeat(level)} ${item.name}`}
      </option>

      {item.children && item.children.length > 0 &&
        displayOptionsTree(item.children, level + 1)
      }
    </React.Fragment>
  ));
}