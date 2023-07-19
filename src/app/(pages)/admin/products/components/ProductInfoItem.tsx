export default function ProductInfoItem({
  infoName,
  infoValue,
}: {
  infoName: string;
  infoValue: string | number;
}){
  return (
    <div className="p-1 w-full flex justify-between even:bg-zinc-100">
      <span className="block">{infoName}:</span>
      <span className="text-violet-600 block text-end">{infoValue}</span>
    </div>
  );
}