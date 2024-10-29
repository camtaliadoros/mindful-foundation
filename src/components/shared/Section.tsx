type SectionProps = {
  children: React.ReactNode;
  classes: string;
};

export const Section = ({ children, classes }: SectionProps) => {
  return <section className={`${classes} w-full px-6 `}>{children}</section>;
};
