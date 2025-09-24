import ObjectInfo from "./(components)/ObjectInfo/ObjectInfo";
import { ObjectProvider } from "./(context)";

type Props = {
  params: Promise<{name: string}>
};

export default async function ObjectDetailPage({ params }: Props) {
  console.log("INIT PAGE")
  const { name } = await params

  return (
    <ObjectProvider objectName={name}>
      <ObjectInfo/>
    </ObjectProvider>
  );
};
