export default function AdminProductPage({
  params,
}: {
  params: { id: number };
}){
  return (
    <div>
      {params.id}
    </div>
  );
}