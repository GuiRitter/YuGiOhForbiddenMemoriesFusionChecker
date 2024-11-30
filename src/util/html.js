import React from "react";

export const buildCell = (key, content, attributes) => <td
	{...attributes}
	key={key}
>{content}</td>;

export const buildRow = (key, attributes, ...cellList) => <tr
	key={key}
	{...attributes}
>{cellList}</tr>;

export const buildTable = (...rowList) => <table><tbody>{rowList}</tbody></table>;
