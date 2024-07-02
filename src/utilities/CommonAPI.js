import ENV from "./ENV";

export const CommonAPIService = {
  async getEmojiStatus(isShift, dataCount, setIsHappy) {
    ENV.get(`/getEmoji?isShift=${isShift}&dataCount=${dataCount}`)
      .then((res) => {
        setIsHappy(res.data.data.isHappy);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
