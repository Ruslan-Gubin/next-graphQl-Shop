const nowDate = new Date();

const formatedDate = () => {
  return nowDate.toTimeString().slice(0, 5);
};

export { formatedDate };
