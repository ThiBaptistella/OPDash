// src/utils/saveAnnotatedData.ts
import fs from "fs";
import path from "path";

interface AnnotatedData {
  text: string;
  entities: {
    start: number;
    end: number;
    label: string;
  }[];
}

const filePath = path.join(
  __dirname,
  "../../../ai-ml/utils/annotated_eods.json"
);

export const saveAnnotatedEODData = (data: AnnotatedData) => {
  if (fs.existsSync(filePath)) {
    const existingData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    existingData.push(data);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
  } else {
    fs.writeFileSync(filePath, JSON.stringify([data], null, 2));
  }
};
