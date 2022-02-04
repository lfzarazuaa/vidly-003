import PropTypes from "prop-types";
const LikeIcon = (props) => {
  const { isLikeSelected, onClickLike } = props;
  return (
    <i
      onClick={onClickLike}
      className={"btn fa fa-heart" + (isLikeSelected ? "" : "-o")}
      aria-hidden="true"
    ></i>
  );
};

LikeIcon.propTypes = {
  isLikeSelected: PropTypes.bool.isRequired,
  onClickLike: PropTypes.func.isRequired,
};

export default LikeIcon;
