import { PracticeCard } from "../../modules/Practice";

export const LayeredCards = () => {
  return (
<div className="relative">
  <div
    className="absolute inset-0 translate-x-[20px] translate-y-[20px]
           rounded-3xl bg-black-secondary opacity-30 z-10">
  </div>

  <div
    className="absolute inset-0 translate-x-[10px] translate-y-[10px]
           rounded-3xl bg-black-secondary opacity-60 z-20">
  </div>

  <div
    className="relative z-30 p-4 rounded-3xl flex flex-col justify-between
           bg-black-secondary gap-2 min-h-[179px]">
    
    <div className="flex gap-2 justify-end">
      <button className="bg-mustard-primary text-white-primary py-2 px-4 rounded-full">
        559₽
      </button>
    </div>

    <div className="grid gap-2">
      <h1 className="text-white-primary">Bundle one</h1>
      <div className="flex gap-2 flex-wrap">
        <button className="bg-white-tertiary text-brown-primary py-2 px-4 rounded-full">
          goo
        </button>
        <button className="bg-white-tertiary text-brown-primary py-2 px-4 rounded-full">
          boo
        </button>
      </div>
    </div>
  </div>
</div>

  );
};
