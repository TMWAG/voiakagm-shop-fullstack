export default function CataloguePage({
  params,
}: {
  params: {
    id: number;
  }
}){
  return (
    <div>
      catalogue {params.id}
    </div>
  );
};