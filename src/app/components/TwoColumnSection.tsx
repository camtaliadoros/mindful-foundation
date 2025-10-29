export default function TwoColumnSection({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='grid md:grid-cols-2 gap-12 items-center'>{children}</div>
  );
}
