import { ROUTES } from "../../containers";

export type TProfileSection = {
  title?: string;
  items: {
    id: string;
    label: string;
    icon?: string;
    route?: string;
    external?: string;
    onClick?: () => void;
  }[];
};

export const menuSections: TProfileSection[] = [
  {
    title: "Аккаунт",
    items: [
      {
        id: "subscription",
        label: "Управление подпиской",
        icon: "⭐",
        route: ROUTES.SUBSCRIPTION,
      },
    ],
  },
  {
    title: "Информация",
    items: [
      {
        id: "documentation",
        label: "Часто задаваемые вопросы",
        icon: "🤔",
        route: ROUTES.FAQ,
      },
      {
        id: "news",
        label: "Новости",
        icon: "📨",
        external: "https://t.me/sega_core",
      },
    ],
  },
  {
    title: "Поддержка",
    items: [
      {
        id: "support",
        label: "Связаться с поддержкой",
        icon: "🆘",
        external: "https://t.me/sega_core",
      },
    ],
  },
  {
    title: "Правовая информация",
    items: [
      {
        id: "terms",
        label: "Пользовательское соглашение",
        icon: "📋",
        route: ROUTES.TERMS,
      },
      {
        id: "privacy",
        label: "Политика конфиденциальности",
        icon: "🔒",
        route: ROUTES.PRIVACY,
      },
    ],
  },
];
