import Background from "../../assets/images/bg-main.webp";

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
        py-4 px-3.5 gap-4 pb-25
        border-solid overflow-auto
        w-full max-w-md mx-auto
        sm:border sm:rounded-3xl sm:shadow-lg sm:my-8`}
    >
      {children}
    </main>
  );
};
