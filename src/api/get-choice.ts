import { client } from "./client";

export const fetchChoice = async () => {
  try {
    const result = await client({
      url: "/choice",
      method: "GET",
      transformResponse: [
        function (data) {
          const parsedData = JSON.parse(data);
          const { id, ...rest } = parsedData;
          const newData = {
            choiceId: parsedData.id,
            ...rest,
          };
          return newData;
        },
      ],
    });
    return result?.data;
  } catch (e) {
    console.error(e);
  }
};
