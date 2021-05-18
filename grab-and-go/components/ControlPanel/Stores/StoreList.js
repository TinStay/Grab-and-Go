import StoreBox from "./StoreBox";


const StoreList = ({filteredStores}) => {

  return (
    <div className="container">
      <h2 className="dark-green-text mt-3">All stores</h2>
      <div className="row mx-auto">
        {filteredStores &&
          filteredStores.map((store) => {
            return <StoreBox key={store.id} store={store} />;
          })}
      </div>
    </div>
  );
};

export default StoreList;
