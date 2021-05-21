import StoreBox from "./StoreBox";
import { Container } from "@material-ui/core";


const StoreList = ({filteredStores}) => {

  return (
    <Container >
      <h2 className="dark-green-text mt-3">All stores</h2>
      <div className="row mx-auto">
        {filteredStores &&
          filteredStores.map((store) => {
            return <StoreBox key={store.id} store={store} />;
          })}
      </div>
    </Container>
  );
};

export default StoreList;
