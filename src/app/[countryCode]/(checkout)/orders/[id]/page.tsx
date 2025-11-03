export default async function OrderConfirmationPage({
  params,
  searchParams,
}: PageProps<"/[countryCode]/orders/[id]">) {
  const { id } = await params;
  return <div>Order Confirmation Page - {id}</div>;
}
