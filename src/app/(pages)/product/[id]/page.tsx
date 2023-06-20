export default function ProductPage({
  params,
}: {
  params: { id: number };
}){
  return (
    <div>product {params.id}</div>
  );
}