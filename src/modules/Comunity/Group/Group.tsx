import { Button } from "@heroui/button";
import { Avatar } from "../../../components/Avatar";
import { Block } from "../../../components/Block";
import { Typography } from "../../../components/Typography";
import { Icon } from "../../../components/Icon";
import AvatarComunity from "../../../assets/images/avatarComunity.png";

export const Group = () => {
  return (
    <Block>
      <div className="flex gap-2 items-center">
        <Avatar image={AvatarComunity}/>
        <div className="flex-1">
          <Typography type="heading-xs" className="text-brown-primary">
            Haven
          </Typography>
          <Typography type="body-xs" className="text-brown-primary">
            Рады всем без исключений!
          </Typography>
        </div>
        <Button
          isIconOnly
          onPress={() => alert("link to tg group")}
          variant="light"
          size="sm"
          radius="full"
        >
          <Icon
            name='Plus'
            width={20}
            height={20}
            /* className="fill-(--stroke-white-primary)" */
          />
        </Button>
      </div>
    </Block>
  );
};
