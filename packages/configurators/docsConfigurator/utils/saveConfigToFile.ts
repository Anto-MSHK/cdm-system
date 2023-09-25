import { SwaggerDocsConfig } from "../_types";
import fs from "fs";
import { logger } from "packages/logger";
import path from "path";

export const DOCS_FILE_PATH = path.resolve(
  "./packages/server/swagger-docs.json"
);
// const DOCS_FILE_PATH = path.join(__dirname, FILE_PATH);

export function saveConfigToFile(config: SwaggerDocsConfig) {
  try {
    if (!fs.existsSync(DOCS_FILE_PATH)) {
      fs.writeFileSync(DOCS_FILE_PATH, JSON.stringify(config, null, 2));
      logger.info(
        `Docs - The documentation file has been created successfully`
      );
    } else {
      const fileData = fs.readFileSync(DOCS_FILE_PATH, "utf8");
      let existingData;
      try {
        existingData = JSON.parse(fileData);
      } catch (parseError) {
        logger.error("Docs - The documentation file is corrupted");
        logger.error(parseError);
        return;
      }

      const updatedData = { ...existingData, ...config };

      fs.writeFileSync(DOCS_FILE_PATH, JSON.stringify(updatedData, null, 2));
      logger.info(
        `Docs - The documentation file has been updated successfully`
      );
    }
  } catch (error) {
    logger.error(
      "Docs - Error when accessing or writing to the documentation file"
    );
    logger.error(error);
  }
}
