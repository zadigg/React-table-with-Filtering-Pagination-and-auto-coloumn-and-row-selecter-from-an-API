import React, { useEffect, useMemo } from "react";
import axios from "axios";
import TableData from "../Table/TableData";

const Table = () => {
  const [data, setData] = React.useState([]);

  const fetchProducts = async () => {
    const response = await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .catch((err) => console.log(err));

    if (response) {
      const products = response.data;
      console.log("Products: ", response.data);
      setData(products);
    }
  };

  const productsData = useMemo(() => [...data], [data]);
  const productsColumns = useMemo(
    () =>
      data[0]
        ? Object.keys(data[0])
            .filter((key) => key !== "rating")
            .map((key) => {
              if (key === "image")
                return {
                  Header: key,
                  accessor: key,
                  Cell: ({ value }) => <img src={value} />,
                  maxWidth: 70,
                };

              return { Header: key, accessor: key };
            })
        : [],
    [data]
  );

  useEffect(() => {
    fetchProducts();
  }, []);
  return <TableData  columns={productsColumns} data={productsData} />;
};

export default Table;
