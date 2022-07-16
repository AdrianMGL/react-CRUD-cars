import React from "react";
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
            {cars.map((car) => (
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
      </div>
    </div>
  );
};

export default CarsList;
