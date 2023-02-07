import { IAdditationalOption, IAdditationSize } from "../types/ICreatedProductSlice";

const addetationFilterValue = (
  additationalOption: IAdditationalOption,
  additationSize: IAdditationSize
) => {
  const result = [
    { name: "Назначение", value: additationalOption.appoitment },
    { name: "Упаковка", value: additationalOption.packaging },
    { name: "Оборудование", value: additationalOption.equipment },
    { name: "Цель", value: additationalOption.purpose },
    { name: "Особенности", value: additationalOption.features },
    { name: "Материал", value: additationalOption.material },
    { name: "Страна", value: additationalOption.country },
    { name: "Высота", value: additationSize.height },
    { name: "Длина", value: additationSize.length },
    { name: "Ширина", value: additationSize.width },
    { name: "Вес", value: additationSize.weight },
  ];

  return result.filter((item) => item.value !== "");
};

export { addetationFilterValue };
