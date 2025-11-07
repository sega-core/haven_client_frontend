export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      style={{
        backgroundImage: `url('/bg/bg-main.png')`, // Прямой путь из public
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
      className={`flex flex-col items-center min-h-screen 
      py-4 px-[14px] gap-4  
      border-solid border-green-900 m-2 overflow-auto`}
    >
      {children}
    </main>
  );
};
