import classes from "../../../styles/Home.module.scss";

const StoreBox = (props) => {
  return (
    <div className={classes.white_container}>
      <div className="d-flex justify-content-between px-3 align-items-center">
        <div>
          <h5 className="dark-green-text">{props.name}</h5>
          <p className="text-muted">{props.address}</p>
        </div>
        <div>
          <span className="green-text h5">{props.distance} km</span>
        </div>
      </div>
    </div>
  );
};

export default StoreBox;
