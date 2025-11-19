import { BlagodarnostCard } from "../../modules/Blagodarnost";
import { NastroenieCard } from "../../modules/Nastroenie";
import { TargetsBlock } from "../../modules/Targets";
import { VoprosDnyaCard } from "../../modules/VoprosDnya";

export const Main = () => {
  return (
    <div className="grid gap-4">
      <TargetsBlock />
      <NastroenieCard />
      <BlagodarnostCard />
      <VoprosDnyaCard />
    </div>
  );
};
