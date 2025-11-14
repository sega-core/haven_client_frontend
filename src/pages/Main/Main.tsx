import { Blagodarnost } from "../../modules/Blagodarnost";
import { NastroenieCard } from "../../modules/Nastroenie";
import { VoprosDnyaCard } from "../../modules/VoprosDnya";

export const Main = () => {
  return (
    <div className="grid gap-4">
      <NastroenieCard />
      <Blagodarnost />
      <VoprosDnyaCard />
    </div>
  );
};
