export const PageLayout = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  return (
    <div className="flex flex-col w-full items-start justify-start p-[48px] gap-[24px] overflow-x-hidden overflow-y-scroll max-h-[calc(100vh-74px)]">
      {children}
    </div>
  );
};
