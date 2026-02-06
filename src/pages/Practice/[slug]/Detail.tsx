import { Typography } from "../../../components/Typography";
import cn from "../../../utils/cn";

export const Detail = () => {
  return (
    <div className="flex flex-col w-full h-full absolute -mt-4">
      <div className="ralative overflow-hidden">
        <div
          className={cn("absolute inset-0 overflow-hidden transition-opacity")}
        >
          <img
            src={
              "https://img.championat.com/news/big/n/f/kak-pravilno-meditirovat-sovety-praktika_157684379279536979.jpg"
            }
            alt={"title"}
            className="object-cover"
            loading="lazy"
          />
          {/* {isLocked && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          )} */}
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-4 rounded-t-4xl py-6 px-3.5 bg-white-primary z-10 mt-50">
        <div className="p-4 bg-beige-tertiary rounded-2xl">
          <Typography type="body-s" className="text-brown-primary">
            Практика прощения
          </Typography>
        </div>
        <div className="p-4 bg-beige-tertiary rounded-2xl">
          <Typography type="body-s" className="text-brown-primary">
            Практика прощения
          </Typography>
        </div>
        <div className="p-4 bg-beige-tertiary rounded-2xl">
          <Typography type="body-s" className="text-brown-primary">
            Практика прощения
          </Typography>
        </div>
        <div className="p-4 bg-beige-tertiary rounded-2xl">
          <Typography type="body-s" className="text-brown-primary">
            Практика прощения
          </Typography>
        </div>
        <div className="p-4 bg-beige-tertiary rounded-2xl">
          <Typography type="body-s" className="text-brown-primary">
            Практика прощения
          </Typography>
        </div>
      </div>
    </div>
  );
};
