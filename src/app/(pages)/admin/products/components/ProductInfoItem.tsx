export default function ProductInfoItem({
  infoName,
  infoValue,
}: {
  infoName: string;
  infoValue: string | number;
}){
  return (
    <span>
      {infoName}: <span>{infoValue}</span>
    </span>
  );
}