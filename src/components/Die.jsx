export default function Die(props) {

  return (
    <div className={`die ${props.isHeld && "die-isHeld"}`} onClick={props.holdDice}>
      {props.value}
    </div>
  )
}