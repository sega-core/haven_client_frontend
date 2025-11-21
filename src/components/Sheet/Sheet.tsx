import { Sheet as SheetReact } from "react-modal-sheet";
import { Icon } from "../Icon";
import { Typography } from "../Typography";
import { Button } from "@heroui/button";

//TODO: подумать об "vaul", намного меньше весит

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
};

export const Sheet = ({ isOpen, onClose, title, children }: Props) => {
  return (
    <SheetReact isOpen={isOpen} onClose={onClose} detent="content" unstyled>
      <SheetReact.Container>
        <SheetReact.Header className="bg-white-primary rounded-t-4xl">
          <div className="relative flex items-center justify-center w-full p-4">
            <Typography
              type="heading-xs"
              className="text-center w-full text-brown-primary"
              weight="semibold"
            >
              {title}
            </Typography>
            <Button isIconOnly onPress={onClose} variant="light" size="sm">
              <Icon name="Close" width={24} height={24} />
            </Button>
          </div>
        </SheetReact.Header>
        <SheetReact.Content>{children}</SheetReact.Content>
      </SheetReact.Container>
      <SheetReact.Backdrop
        onTap={onClose}
        style={{
          backgroundColor: "rgba(0,0,0,0.6)", // for Safari
        }}
      />
    </SheetReact>
  );
};
