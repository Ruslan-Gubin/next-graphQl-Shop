
interface Ioption {
  value: string;
  label: string;
  id?: string;
}

interface IOptionDepartment {
  value: string;
  label: string;
  subdepartment: Ioption[];
  id?: string
}


const OPTIONS_STATIONERY_SUBDEPARTMENT: Ioption[] = [
  { value: "Бумажная продукция", label: "bumazhnaya-produktsiya" },
  { value: "Карты и глобусы", label: "karty-i-globusy" },
  { value: "Офисные принадлежности", label: "ofisnye-prinadlezhnosti" },
  { value: "Письменные принадлежности", label: "pismennye-prinadlezhnosti" },
  { value: "Счетный материал", label: "schetniy-material" },
  { value: "Торговые принадлежности", label: "torgovye-prinadlezhnosti" },
  { value: "Чертежные принадлежности", label: "chertezhnye-prinadlezhnosti" },
];

const OPTIONS_GAEDEN_AND_COTTAGE_SUBDEPARTMENT: Ioption[] = [
  {
    value: "Горшки, все для рассады",
    label: "gorshki-opory-i-vse-dlya-rassady",
  },
  { value: "Грили, мангалы и барбекю", label: "grili-mangaly-i-barbekyu" },
  { value: "Полив водоснабжение", label: "poliv-i-vodosnabzhenie" },
  { value: "Растения , семена и грунты", label: "rasteniya-semena-i-grunty" },
  { value: "Садовый декор", label: "sadoviy-dekor" },
  { value: "Садовый инструмент", label: "sadoviy-instrument" },
  {
    value: "Удобрения и химикаты ",
    label: "udobreniya-himikaty-i-sredstva-zashchity",
  },
];

const OPTIONS_TOYS_SUBDEPARTMENT: Ioption[] = [
  { value: "Антистресс", label: "antistress" },
  { value: "Игрушки для малышей", label: "dlya-malyshey" },
  { value: "Игрушки для песочницы", label: "dlya-pesochnitsy" },
  { value: "Игровые комплексы", label: "igrovye-kompleksy" },
  { value: "Игровые наборы", label: "igrovye-nabory" },
  { value: "Игрушечное оружие", label: "igrushechnoe-oruzhie" },
  { value: "Игрушечный транспорт", label: "igrushechniy-transport" },
  { value: "Игрушки для ванной", label: "igrushki-dlya-vannoy" },
  { value: "Интерактивные игрушки", label: "interaktivnye" },
  { value: "Кинетический песок", label: "kineticheskiy-pesok" },
  { value: "Детские конструкторы", label: "konstruktory" },
  { value: "Конструкторы LEGO", label: "konstruktory-lego" },
  { value: "Куклы и аксессуары", label: "kukly-i-aksessuary" },
  { value: "Музыкальные инструменты", label: "muzykalnye-instrumenty" },
  { value: "Мыльные пузыри", label: "mylnye-puzyri" },
  { value: "Мягкие игрушки", label: "myagkie-igrushki" },
  { value: "Наборы для опытов", label: "opyty" },
  { value: "Настольные игры", label: "nastolnye-igry" },
  { value: "Радиоуправляемые игрушки", label: "radioupravlyaemye-igrushki" },
  { value: "Развивающие игрушки", label: "razvivayushchie-igrushki" },
  { value: "Игрушки сборные модели", label: "sbornye-modeli" },
  { value: "Спортивные игры", label: "sportivnye-igry" },
  { value: "Сюжетно-ролевые игры", label: "syuzhetno-rolevye-igry" },
  { value: "Игрушки для рукоделия", label: "tvorchestvo-i-rukodelie" },
  { value: "Фигурки и роботы", label: "figurki-i-roboty" },
];

const OPTIONS_KITCHEN_SUBDEPARTMENT: Ioption[] = [
  { value: "Аксессуары для напитков", label: "aksessuary-dlya-napitkov" },
  { value: "Аксессуары для специй", label: "aksessuary-dlya-spetsiy" },
  { value: "Бокалы и стаканы", label: "bokaly-i-stakany" },
  { value: "Противни и формы", label: "protivni-i-formy" },
  { value: "Графины и кувшины", label: "grafiny-i-kuvshiny" },
  { value: "Декоративная посуда", label: "dekorativnaya-posuda" },
  { value: "Емкости для хранения", label: "emkosti-dlya-hraneniya" },
  { value: "Измельчители", label: "izmelchiteli-i-sokovyzhimalki" },
  { value: "Кастрюли и сковороды", label: "kastryuli-i-skovorody" },
  { value: "Кухонная утварь", label: "kuhonnaya-utvar" },
  { value: "Кухонный декор", label: "kuhonniy-dekor" },
  { value: "Ножи кухонные и точилки", label: "nozhi-kuhonnye" },
  {
    value: "Для микроволновой печи",
    label: "posuda-dlya-mikrovolnovoy-pechi",
  },
  { value: "Порядок на кухне", label: "poryadok-na-kuhne" },
  { value: "Разделочные доски", label: "razdelochnye-doski" },
  { value: "Сервизы и наборы", label: "servizy-i-nabory" },
  { value: "Аксессуары для сервировки", label: "servirovka-stola" },
  { value: "Столовое серебро", label: "stolovoe-serebro" },
  { value: "Столовые приборы", label: "stolovye-pribory" },
  { value: "Тарелки и блюда", label: "tarelki-i-blyuda" },
  { value: "Термопосуда", label: "termosy-termosumki" },
  { value: "Фильтры для воды", label: "filtry-dlya-vody" },
  { value: "Хлебницы", label: "hlebnitsy" },
  { value: "Чайники и кофейники", label: "chayniki-i-kofeyniki" },
];

const OPTIONS_DEPARTMENT: IOptionDepartment[] = [
  {
    value: "Канцтовары",
    label: "stationery",
    subdepartment: OPTIONS_STATIONERY_SUBDEPARTMENT,
  },
  {
    value: "Сад и дача",
    label: "garden-and-cottage",
    subdepartment: OPTIONS_GAEDEN_AND_COTTAGE_SUBDEPARTMENT,
  },
  {
    value: "Игрушки",
    label: "toys",
    subdepartment: OPTIONS_TOYS_SUBDEPARTMENT,
  },
  {
    value: "Кухня",
    label: "kitchen",
    subdepartment: OPTIONS_KITCHEN_SUBDEPARTMENT,
  },
];

export { OPTIONS_DEPARTMENT };
