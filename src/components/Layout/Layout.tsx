import Background from "../../assets/images/main.png";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
      className={`flex flex-col items-center min-h-screen 
      py-4 px-3.5 gap-4  
      border-solid border-green-900 overflow-auto`}
    >
      {children}
    </main>
  );
};
