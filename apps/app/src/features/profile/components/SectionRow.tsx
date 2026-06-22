interface Props {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

/** A profile section: heading (with optional action) above a row of cards. */
const SectionRow = ({ title, action, children }: Props) => {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        {action}
      </div>
      <div className="flex flex-wrap gap-4">{children}</div>
    </section>
  );
};

export default SectionRow;
