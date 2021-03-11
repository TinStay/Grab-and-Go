import StoreBox from "./StoreBox";

import classes from "../../../styles/Home.module.scss";

const StoreList = () => {
  return (
    <div className="container">
      <h2 className="dark-green-text mt-3">All stores</h2>
      <div className="row mx-auto">
        <StoreBox
          name="Albert Heijn"
          address="Herentalsebaan 377
          2160 Wommelgem"
          distance="1"
        />
        <StoreBox
          name="Albert Heijn"
          address="Neckerspoel, Stationsplein 22-17, 5611 AD Eindhoven"
          distance="1.2"
        />
        <StoreBox
          name="Albert Heijn"
          address="Neckerspoel, Stationsplein 22-17, 5611 AD Eindhoven"
          distance="1.9"
        />
        <StoreBox
          name="Albert Heijn"
          address="Neckerspoel, Stationsplein 22-17, 5611 AD Eindhoven"
          distance="1.2"
        />
        <StoreBox
          name="Albert Heijn"
          address="Neckerspoel, Stationsplein 22-17, 5611 AD Eindhoven"
          distance="1.9"
        />
        <StoreBox
          name="Albert Heijn"
          address="Neckerspoel, Stationsplein 22-17, 5611 AD Eindhoven"
          distance="1.2"
        />
        <StoreBox
          name="Albert Heijn"
          address="Neckerspoel, Stationsplein 22-17, 5611 AD Eindhoven"
          distance="1.9"
        />
        <StoreBox
          name="Albert Heijn"
          address="Neckerspoel, Stationsplein 22-17, 5611 AD Eindhoven"
          distance="1.2"
        />
        <StoreBox
          name="Albert Heijn"
          address="Neckerspoel, Stationsplein 22-17, 5611 AD Eindhoven"
          distance="1.9"
        />
      </div>
    </div>
  );
};

export default StoreList;
