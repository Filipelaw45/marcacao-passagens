interface HeaderProps {
  children?: React.ReactNode;
}
export function Header({ children }: HeaderProps) {
  return (
    <>
      <div className="w-full h-20 mb-5 flex flex-col justify-center bg-gradient-to-r from-blue-700 to-blue-900">
        {children}
      </div>
    </>
  );
}
