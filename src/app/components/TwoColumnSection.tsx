export default function TwoColumnSection({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto'>
      {children}
    </div>
  );
}
