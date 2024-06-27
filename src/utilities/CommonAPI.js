import ENV from "./ENV";

export const CommonAPIService = {
  async getEmojiStatus(isShift, dataCount) {
    ENV.get(`/getEmoji?isShift=${isShift}&dataCount=${dataCount}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
