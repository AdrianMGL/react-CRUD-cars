import { useEffect, useState } from "react";
import axios from "axios";
import "./Cars.css";
import CarsForm from "./components/CarsForm";
import CarsList from "./components/CarsList";

function App() {
  /**  */
  const [cars, setCars] = useState([]);
  const [carSelected, setCarSelected] = useState(null);

  /** */
  useEffect(() => {
    axios
      .get("https://cars-crud.herokuapp.com/cars/")
      .then((res) => setCars(res.data));
  }, []);

  /** */
  const getCars = () => {
    axios
      .get("https://cars-crud.herokuapp.com/cars/")
      .then((res) => setCars(res.data));
  };

  /** */
  const selectCar = (car) => {
    console.log(car);
    setCarSelected(car);
  };

  /** */
  const deselectCar = () => setCarSelected(null);

  // console.log(cars);

  return (
    <>
      <header className="car__header">
        <p>CRUD Car</p>
      </header>

      <div className="container">
        <main className="main">
          <CarsForm
            getCars={getCars}
            carSelected={carSelected}
            deselectCar={deselectCar}
          />
          <CarsList cars={cars} selectCar={selectCar} getCars={getCars} />
        </main>
      </div>
    </>
  );
}

export default App;
