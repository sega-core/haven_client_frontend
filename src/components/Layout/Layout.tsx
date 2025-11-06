export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className="flex flex-col items-center min-h-screen 
      py-4 px-[14px] gap-5  
      border-solid border-green-900 overflow-hidden m-2"
    >
      {children}
    </main>
  );
};
