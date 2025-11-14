import { VoprosDnya } from "../../components/NavigationBlock";
import { Blagodarnost } from "../../modules/Blagodarnost";
import { NastroenieCard } from "../../modules/Nastroenie";

export const Main = () => {
  return (
    <div className="grid gap-4">
      <NastroenieCard />
      <Blagodarnost />
      <VoprosDnya />
    </div>
  );
};
