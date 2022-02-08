import Proptypes from "prop-types";

const ListSelect = (props) => {
  const {
    mainMessage,
    elements,
    selectedElement,
    onDefaultElementSelected,
    onElementSelected,
  } = props;
  let classes = "btn list-group-item";
  let getItemsList;
  if (selectedElement < 0) {
    classes += " active";
    getItemsList = () => {
      return elements.map((element, counter) => {
        return (
          <li
            key={counter}
            className="btn list-group-item"
            onClick={() => onElementSelected(element.id)}
          >
            {element.name}
          </li>
        );
      });
    };
  } else {
    getItemsList = () => {
      return elements.map((element, counter) => {
        let classes = "btn list-group-item";
        if (selectedElement === counter) classes += " active";
        return (
          <li
            key={counter}
            className={classes}
            onClick={() => onElementSelected(element.id)}
          >
            {element.name}
          </li>
        );
      });
    };
  }
  return (
    <ul className="list-group">
      <li
        key={-1}
        className={classes}
        onClick={() => onDefaultElementSelected()}
      >
        {mainMessage}
      </li>
      {getItemsList()}
    </ul>
  );
};

ListSelect.propTypes = {
  mainMessage: Proptypes.string.isRequired,
  selectedElement: Proptypes.number.isRequired,
  //   elements: Proptypes.array(
  //     Proptypes.shape({
  //       id: Proptypes.string.isRequired,
  //       name: Proptypes.string.isRequired,
  //     })
  //   ),
};

export default ListSelect;
