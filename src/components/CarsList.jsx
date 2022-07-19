import React, { useState } from "react";
import axios from "axios";

const CarsList = ({ cars, selectCar, getCars }) => {
  /** */
  const deleteCar = (id) => {
    alert("Eliminando...");
    axios
      .delete(`https://cars-crud.herokuapp.com/cars/${id}/`)
      .then(() => getCars())
      .catch((error) => console.log(error.response));
  };

  /** */
  const [page, setPage] = useState(1);
  const numberPage = 15;
  const lastIndex = page * numberPage;
  const firstIndex = lastIndex - numberPage;
  const carsPaginated = cars.slice(firstIndex, lastIndex);
  // console.log(carsPaginated);
  const lastPage = Math.ceil(cars.length / numberPage);
  //console.log(lastPage);

  //
  const numbers = [];

  for (let i = 1; i <= lastPage; i++) {
    numbers.push(i);
  }

  /** */
  return (
    <div className="list">
      <div>
        <h2 className="list__title">Cars List</h2>
      </div>
      <div className="container__table">
        <table className="table">
          <thead className="list__head">
            <tr>
              <th>Id</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Color</th>
              <th>Price</th>
              <th>Year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {carsPaginated.map((car) => (
              <tr key={car.id} className="table__body-tr">
                <td>{car.id}</td>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.color}</td>
                <td>{car.price}</td>
                <td>{car.year}</td>
                <td>
                  <button onClick={() => selectCar(car)} className="btn edit">
                    Edit
                  </button>
                  <button
                    className="btn delete"
                    onClick={() => deleteCar(car.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="btn-page"
          >
            {"<"} Prev
          </button>
          {numbers.map((number) => (
            <button
              key={number}
              onClick={() => setPage(number)}
              className="btn-page"
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === lastPage}
            className="btn-page"
          >
            Next {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarsList;
