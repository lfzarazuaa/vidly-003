
const LikeIcon = (props) => {
    const { isLikeSelected, onClickLike } = props
    return ( 
        <i onClick = {onClickLike}
                className = {"btn fa fa-heart" + (isLikeSelected?"":"-o")}
                aria-hidden="true"></i>
     );
}
 
export default LikeIcon;