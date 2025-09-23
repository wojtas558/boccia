export default function Ball({
  getColor,
  scored = false,
  height = 80,
  onClick = {},
}) {
  return (
    <span
      onClick={() => onClick()}
      className={'border rounded-circle d-block ' + (scored ? getColor() : '')}
      style={{
        height: height,
        aspectRatio: 1,
      }}
    />
  );
}
