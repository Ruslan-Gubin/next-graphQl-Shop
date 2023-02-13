interface Ioption {
  value: string;
  label: string;
  id?: string;
  img: string
}

interface IOptionDepartment {
  value: string;
  label: string;
  subdepartment: Ioption[];
  id?: string;
  img: string;
  href: string;
  img_layout?: string;
}

const OPTIONS_STATIONERY_SUBDEPARTMENT: Ioption[] = [
  { 
    value: "Бумажная продукция",
    label: "bumazhnaya-produktsiya",
    img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676106431/Hits/%D0%91%D0%BB%D0%BE%D0%BA%D0%BD%D0%BE%D1%82%D1%8B_sabo5b.png'
  },
  { value: "Карты и глобусы", label: "karty-i-globusy",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676103516/Hits/d3ZsmVpcMM0_ybz9kg.jpg' },
  { value: "Офисные принадлежности", label: "ofisnye-prinadlezhnosti",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676103143/Hits/7036874443312930_2b2b_y0sesk.jpg' },
  { value: "Письменные принадлежности", label: "pismennye-prinadlezhnosti",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676103263/Hits/59318_ci1fbp.jpg' },
  { value: "Счетный материал", label: "schetniy-material",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676103651/Hits/axFPYsKXD2I_gz0ou6.jpg' },
  { value: "Торговые принадлежности", label: "torgovye-prinadlezhnosti",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676103902/Hits/image_aljtg3.png' },
  { value: "Чертежные принадлежности", label: "chertezhnye-prinadlezhnosti",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676103688/Hits/6_wutz5s.jpg' },
];

const OPTIONS_GAEDEN_AND_COTTAGE_SUBDEPARTMENT: Ioption[] = [
  {
    value: "Горшки, все для рассады",
    label: "gorshki-opory-i-vse-dlya-rassady",
    img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676273826/Hits/45e0e70c-0e70-4c8b-a174-c0e0412c65bb_nbh1dj.jpg'
  },
  { value: "Грили, мангалы и барбекю", label: "grili-mangaly-i-barbekyu",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676273896/Hits/i_vlps4a.webp' },
  { value: "Полив водоснабжение", label: "poliv-i-vodosnabzhenie",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676273935/Hits/1c9e6738f38be8bf48ae655faf657f81_nkkjlx.jpg' },
  { value: "Растения , семена и грунты", label: "rasteniya-semena-i-grunty",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676273966/Hits/5b03b32c1a0000c704cdf665_xycq4k.jpg' },
  { value: "Садовый декор", label: "sadoviy-dekor",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676274003/Hits/i_ywncat.webp' },
  { value: "Садовый инструмент", label: "sadoviy-instrument",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676274035/Hits/5c19fb4d3fff6-sadovinventar_cgqnx6.webp' },
  {
    value: "Удобрения и химикаты",
    label: "udobreniya-himikaty-i-sredstva-zashchity",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676274090/Hits/article_pesticide_untx4q.jpg'
  },
];

const OPTIONS_TOYS_SUBDEPARTMENT: Ioption[] = [
  { value: "Антистресс", label: "antistress", img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676276648/Hits/834114156_qp7gso.jpg' },
  { value: "Игрушки для малышей", label: "dlya-malyshey", img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676276677/Hits/1912c32b169510c1b32db5fcb5b1198a_iecm2g.jpg' },
  { value: "Игрушки для песочницы", label: "dlya-pesochnitsy",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676276714/Hits/orig_m9u9id.webp' },
  { value: "Игровые комплексы", label: "igrovye-kompleksy",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676276745/Hits/a1f88fba15a620bb6ee8cccb20d2f2bb_jdamsi.jpg' },
  { value: "Игровые наборы", label: "igrovye-nabory",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676276775/Hits/350215_kgxxuo.jpg' },
  { value: "Игрушечное оружие", label: "igrushechnoe-oruzhie",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676276888/Hits/9cb3a9b37beea8a1d50fb580a1ee008a_fwjb9q.jpg' },
  { value: "Игрушечный транспорт", label: "igrushechniy-transport",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676276925/Hits/81TGD5mL0qL._AC_SL1500__ebf5ln.jpg' },
  { value: "Игрушки для ванной", label: "igrushki-dlya-vannoy",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676276953/Hits/i_pwgn9g.webp' },
  { value: "Интерактивные игрушки", label: "interaktivnye",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676276991/Hits/1575952877254_bulletin_yofnta.jpg' },
  { value: "Кинетический песок", label: "kineticheskiy-pesok",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676277026/Hits/PIASEK-kinetyczny-5kg-w-wiaderku-piaskownica-Marka-Nefere_yrgsm8.jpg' },
  { value: "Детские конструкторы", label: "konstruktory",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676277058/Hits/lego-resale-stores-in-us_yehspu.jpg' },
  { value: "Конструкторы LEGO", label: "konstruktory-lego",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676277058/Hits/lego-resale-stores-in-us_yehspu.jpg' },
  { value: "Куклы и аксессуары", label: "kukly-i-aksessuary",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676277130/Hits/32824.970_hbceo1.jpg' },
  { value: "Музыкальные инструменты", label: "muzykalnye-instrumenty" ,img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676277158/Hits/%D0%A4%D0%BE%D1%82%D0%BE-%D0%BC%D1%83%D0%B7%D1%8B%D0%BA%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE-%D0%B8%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0-%D0%B0%D1%80%D1%84%D0%B0_gu19ep.jpg'},
  { value: "Мыльные пузыри", label: "mylnye-puzyri" ,img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676277206/Hits/Devushka_s_mylnymi_puzyryami_9_30140230_ytsor0.jpg'},
  { value: "Мягкие игрушки", label: "myagkie-igrushki",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676277239/Hits/i_ln45px.webp' },
  { value: "Наборы для опытов", label: "opyty",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676277266/Hits/8ajasx4xejm_kklhnb.jpg' },
  { value: "Настольные игры", label: "nastolnye-igry" ,img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676277292/Hits/1s12pug5c8yyi8ko85872z9june93lxb_vyplbs.jpg'},
  { value: "Радиоуправляемые игрушки", label: "radioupravlyaemye-igrushki",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676277320/Hits/gesture-controlled-toy-car-is-not-your-average-kickstarter-project_8_abg3t1.jpg' },
  { value: "Развивающие игрушки", label: "razvivayushchie-igrushki",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676277350/Hits/2-12_usea8i.jpg' },
  { value: "Игрушки сборные модели", label: "sbornye-modeli",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676277382/Hits/i_kcxspn.webp' },
  { value: "Спортивные игры", label: "sportivnye-igry",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676277435/Hits/7f5oyq1ku7wg888ogk8o48w808o4gs_giaekk.jpg' },
  { value: "Сюжетно-ролевые игры", label: "syuzhetno-rolevye-igry",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676277467/Hits/kartinki-syuzhetno-rolevye-igry-5_jjhc4k.jpg' },
  { value: "Игрушки для рукоделия", label: "tvorchestvo-i-rukodelie" ,img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676277497/Hits/6087516414_d17fjw.jpg'},
  { value: "Фигурки и роботы", label: "figurki-i-roboty",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676277553/Hits/product-460135-1_cjqhy4.jpg' },
];

const OPTIONS_KITCHEN_SUBDEPARTMENT: Ioption[] = [
  { value: "Аксессуары для напитков", label: "aksessuary-dlya-napitkov",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286122/Hits/73553ac2b67f33400ec426c62848b983_xvha74.jpg' },
  { value: "Аксессуары для специй", label: "aksessuary-dlya-spetsiy" ,img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286157/Hits/2-5_povecx.jpg'},
  { value: "Бокалы и стаканы", label: "bokaly-i-stakany" ,img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286194/Hits/0119901_13_gbsqiq.jpg'},
  { value: "Противни и формы", label: "protivni-i-formy",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286222/Hits/w_w12122530_872_ccjbf9.jpg' },
  { value: "Графины и кувшины", label: "grafiny-i-kuvshiny" ,img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286251/Hits/i_oyjwlg.webp'},
  { value: "Декоративная посуда", label: "dekorativnaya-posuda" ,img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286284/Hits/dekorativnye-tarelki-materialy-razmery-i-dizajn-15_nyzqn8.jpg'},
  { value: "Емкости для хранения", label: "emkosti-dlya-hraneniya",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286356/Hits/1630482739_45-idei-club-p-khranenie-spetsii-na-kukhne-interer-krasiv-45_u29kbk.jpg' },
  { value: "Измельчители", label: "izmelchiteli-i-sokovyzhimalki",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286385/Hits/chopper_new_2_q0wsap.jpg' },
  { value: "Кастрюли и сковороды", label: "kastryuli-i-skovorody",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286479/Hits/i_wmbtac.webp' },
  { value: "Кухонная утварь", label: "kuhonnaya-utvar" ,img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286502/Hits/76432196_mjyix2.jpg'},
  { value: "Кухонный декор", label: "kuhonniy-dekor" ,img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286533/Hits/decc9e0793ffe0f7da947451c7c47c12_m879wy.jpg'},
  { value: "Ножи кухонные и точилки", label: "nozhi-kuhonnye",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286568/Hits/1_ktkfsm.jpg' },
  {
    value: "Для микроволновой печи",
    label: "posuda-dlya-mikrovolnovoy-pechi",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286592/Hits/i_qd9bqm.webp'
  },
  { value: "Порядок на кухне", label: "poryadok-na-kuhne" ,img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286620/Hits/79fbe22d5d889392575f37e8ed1803df_i5pojm.png'},
  { value: "Разделочные доски", label: "razdelochnye-doski" ,img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286644/Hits/i_akntzp.webp'},
  { value: "Сервизы и наборы", label: "servizy-i-nabory",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286666/Hits/DV1original_hgddpe.jpg' },
  { value: "Аксессуары для сервировки", label: "servirovka-stola",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286688/Hits/3437_4_cn0nuo.jpg' },
  { value: "Столовое серебро", label: "stolovoe-serebro",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286714/Hits/IMG_4003_ascdrm.jpg' },
  { value: "Столовые приборы", label: "stolovye-pribory",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286746/Hits/c862a29848d583d05a4abd064621_qkvzfo.jpg' },
  { value: "Тарелки и блюда", label: "tarelki-i-blyuda" ,img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286771/Hits/1665571058_12-podacha-blud-com-p-fud-foto-na-tarelke-14_f0nmj0.jpg'},
  { value: "Термопосуда", label: "termosy-termosumki",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286803/Hits/ba91f1396abd28aebb65c4f7eaa55798_kphb76.jpg' },
  { value: "Фильтры для воды", label: "filtry-dlya-vody",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286852/Hits/FILTR-AQUAPHOR-RO-101S-MORION-ODWROCONA-OSMOZA-FV-Waga-produktu-z-opakowaniem-jednostkowym-6-kg_hztqhl.webp' },
  { value: "Хлебницы", label: "hlebnitsy",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286879/Hits/i_hbuc4z.webp' },
  { value: "Чайники и кофейники", label: "chayniki-i-kofeyniki",img: 'https://res.cloudinary.com/ds289tkqj/image/upload/v1676286916/Hits/2591c9a9b981ec4643da53e3ac50105b_e8c2gk.jpg' },
];

const OPTIONS_DEPARTMENT: IOptionDepartment[] = [
  {
    value: "Канцтовары",
    label: "stationery",
    href: "/catalog/kantstovary",
    img_layout:
      "https://res.cloudinary.com/ds289tkqj/image/upload/v1676057618/Hits/vypadashka_paper_xbtmod.jpg",
    img: "https://res.cloudinary.com/ds289tkqj/image/upload/v1676037681/Hits/icons8-stationery-64_2_bzywaw.png",
    subdepartment: OPTIONS_STATIONERY_SUBDEPARTMENT,
  },
  {
    value: "Сад и дача",
    label: "garden-and-cottage",
    href: "/catalog/dachniy-sezon",
    img_layout:
      "https://res.cloudinary.com/ds289tkqj/image/upload/v1676058217/Hits/1620304015_39-p-tsveti-na-dache-dlya-lenivikh-foto-39_w8powz.jpg",
    img: "https://res.cloudinary.com/ds289tkqj/image/upload/v1676037199/Hits/icons8-tree-planting-100_qc6pto.png",
    subdepartment: OPTIONS_GAEDEN_AND_COTTAGE_SUBDEPARTMENT,
  },
  {
    value: "Игрушки",
    label: "toys",
    href: "/catalog/igrushki",
    img_layout:
      "https://res.cloudinary.com/ds289tkqj/image/upload/v1676059111/Hits/1655981923937913643_vgxnrp.webp",
    img: "https://res.cloudinary.com/ds289tkqj/image/upload/v1676037436/Hits/icons8-plush-64_zbymwg.png",
    subdepartment: OPTIONS_TOYS_SUBDEPARTMENT,
  },
  {
    value: "Кухня",
    label: "kitchen",
    href: "/catalog/kuhnya",
    img_layout:
      "https://res.cloudinary.com/ds289tkqj/image/upload/v1676058216/Hits/4606c7e80ab7440c69b773d7f71104b4_xizwcy.jpg",
    img: "https://res.cloudinary.com/ds289tkqj/image/upload/v1676037574/Hits/icons8-spachelor-100_jf7uc5.png",
    subdepartment: OPTIONS_KITCHEN_SUBDEPARTMENT,
  },
];

export {
  OPTIONS_DEPARTMENT,
  OPTIONS_STATIONERY_SUBDEPARTMENT,
  OPTIONS_GAEDEN_AND_COTTAGE_SUBDEPARTMENT,
  OPTIONS_KITCHEN_SUBDEPARTMENT,
  OPTIONS_TOYS_SUBDEPARTMENT,
};
export type { IOptionDepartment, Ioption };
