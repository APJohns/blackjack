import './playingCard.scss';

function PlayingCard(props) {
  if (props.hidden) {
    return <div className="card card-back"></div>;
  } else {
    return <div className="card">{props.name} of {props.suit}</div>;
  }
}

export default PlayingCard;