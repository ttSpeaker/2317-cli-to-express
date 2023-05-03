import fs from "fs";
import path from "path";

export const get = (file: string) =>
  new Promise((resolve, reject) => {
    fs.readFile(getPath(file), "utf8", (err, content) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(JSON.parse(content));
    });
  });

export const save = (file: string, content: any) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(getPath(file), JSON.stringify(content), (err) => {
      if (err) {
        reject(err);
      }
      resolve("OK");
    });
  });
};
const getPath = (file: string): string => {
  return path.resolve(__dirname, "../../data/", file + ".json");
};
