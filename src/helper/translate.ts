import axios from "axios";

const translate = (text_arr: any, to: string, from = "ja") => {
  const data = JSON.stringify({
    trans_nameproduct: "",
    trans_content: text_arr,
    trans_languages: to,
    f_languages: from,
  });

  const config = {
    method: "post",
    url: `http://tomonivn.com/auction.php`,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };

  return axios(config)
    .then(({ data }) => {
      return data.Content.map((item: { text: string }) => {
        const cleanedText = item.text.replace(/\n$/, "");
        return `<span>${cleanedText}</span><br/>`;
      }).join("");
    })

    .catch((err) => {
      return text_arr;
    });
};

export default translate;
