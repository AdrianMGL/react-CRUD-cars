import React, { useEffect, useState } from "react";
import axios from "axios";

const CarsForm = ({ getCars, carSelected, deselectCar }) => {
  /** */
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");

  /** */
  useEffect(() => {
    if (carSelected !== null) {
      setBrand(carSelected.brand);
      setModel(carSelected.model);
      setColor(carSelected.color);
      setPrice(carSelected.price);
      setYear(carSelected.year);
    } else {
      reset();
    }
  }, [carSelected]);

  /** */
  const submit = (e) => {
    e.preventDefault();

    // console.log("submit");

    //
    const carForm = {
      brand: brand,
      model: model,
      color: color,
      price: price,
      year: year,
    };

    //  console.log(carForm);

    //
    if (carSelected !== null) {
      alert("Actualizando");
      axios
        .put(`https://cars-crud.herokuapp.com/cars/${carSelected.id}/`, carForm)
        .then(() => {
          getCars();
          reset();
          deselectCar();
        })
        .catch((error) => console.log(error.response));
    } else {
      alert("Registrando");
      axios
        .post("https://cars-crud.herokuapp.com/cars/", carForm)
        .then(() => {
          reset();
          getCars();
        })
        .catch((error) => console.log(error.response));
    }
  };

  /** RESET */
  const reset = () => {
    setBrand("");
    setModel("");
    setColor("");
    setPrice("");
    setYear("");
  };

  /** */
  return (
    <div className="form">
      <div>
        <h2 className="form__title">Add Cars</h2>
      </div>
      <form onSubmit={submit}>
        <div className="input">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            name="brand"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div className="input">
          <label htmlFor="model">Model</label>
          <input
            type="text"
            name="model"
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>

        <div className="input">
          <label htmlFor="color">Color</label>
          <input
            type="text"
            name="color"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className="input">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="input">
          <label htmlFor="year">Year</label>
          <input
            type="text"
            name="year"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <div className="group__btn">
          <button className="btn success">
            {carSelected !== null ? "Update" : "Create"}
          </button>

          {carSelected !== null && (
            <button className="btn cancel" onClick={deselectCar} type="button">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CarsForm;
