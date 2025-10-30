export default async function ProductPage({
  params,
  searchParams,
}: PageProps<"/[channel]/products/[slug]">) {
  const { slug } = await params;
  const { variant } = await searchParams;

  return <></>;
}
