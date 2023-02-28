import { IFeedbackType } from "@/apps/types/IFeedbackType";

const findMaxOpinion = (arr: IFeedbackType[]) => {
  const map: Record<string, number> = {}
  let maxValue = {key: 0, value: 0};

  arr.forEach(item => {
    const current = item.user_opinion
    if (!map[current]) {
        map[current] = 1;
    } else {
      map[current]++;
    }
  })
 
  for (let [key, value] of Object.entries(map)) {
    if (value > maxValue.value) {
      maxValue = {key: Number(key), value: value}
    }
  }

  return maxValue.key
}

export { findMaxOpinion }