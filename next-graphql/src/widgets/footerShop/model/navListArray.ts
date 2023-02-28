import { INavListArray } from "./INavListArray";

const navListArray: INavListArray[] = [
  {
    title: "Покупателям",
    links: [
      { name: "Как сделать заказ", href: "/services/kak-sdelat-zakaz" },
      { name: "Способы оплаты", href: "/services/sposoby-oplaty" },
      { name: "Доставка", href: "/services/besplatnaya-dostavka" },
      { name: "Возврат товара", href: "/services/vozvrat-tovara" },
      {
        name: "Возврат денежных средств",
        href: "/services/vozvrat-denezhnyh-sredstv",
      },
      { name: "Правила продажи", href: "/services/pravila-prodazhi" },
      {
        name: "Правила пользования торговой площадкой",
        href: "/services/pravila-polzovaniya-torgovoy-ploshchadkoy",
      },
      { name: "Вопросы и ответы", href: "/services/voprosy-i-otvety" },
    ],
  },
  {
    title: "Партнерам",
    links: [
      { name: "Продавайте на OnlineShop", href: "/" },
      { name: "Курьерам", href: "/" },
      { name: "Доставка", href: "/services/besplatnaya-dostavka" },
      { name: "Перевозчикам", href: "/promo/priglashaem-k-sotrudnichestvu" },
      { name: "Партнерский пункт выдачи", href: "/" },
      {
        name: "Франшизный пункт выдачи",
        href: "/services/franshizniy-punkt-vydachi",
      },
      { name: "Трудоустройство", href: "/" },
      { name: "Цифровые товары", href: "/" },
    ],
  },
  {
    title: "Компания",
    links: [
      { name: "О нас", href: "/services/o-nas" },
      { name: "Реквизиты", href: "/services/rekvizity" },
      { name: "Пресс-центр", href: "/presscenter" },
      { name: "Контакты", href: "/services/kontakty" },
      { name: "Bug Bounty", href: "/services/bug-bounty" },
      { name: "WB.Tech", href: "/" },
    ],
  },
  {
    title: "Мы в соцсетях",
    links: [
      { name: "ВКонтакте", href: "/" },
      { name: "Одноклассники", href: "/" },
      { name: "YouTube", href: "/" },
      { name: "Телеграм", href: "/" },
    ],
  },
];

export { navListArray };
