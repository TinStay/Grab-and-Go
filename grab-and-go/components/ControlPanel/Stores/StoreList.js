import StoreBox from "./StoreBox";
import { useStoreContext } from "../../../context";

import classes from "../../../styles/Home.module.scss";

const StoreList = () => {
  const {
    selectedStore,
    setSelectedStore,
    stores,
    setStores,
  } = useStoreContext();

  return (
    <div className="container">
      <h2 className="dark-green-text mt-3">All stores</h2>
      <div className="row mx-auto">
        {stores &&
          stores.map((store) => {
            return (
              <StoreBox
                key={store.id}
                name={store.name}
                address={store.address}
                distance={store.distanceInfo.distance?.text}
              />
            );
          })}

        
      </div>
    </div>
  );
};

export default StoreList;
