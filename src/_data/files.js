// Names of the files actually present in src/files/, so templates can hide a
// download button (the CV PDF, for instance) until the file has been added.
import { readdirSync } from "node:fs";

export default function () {
  try {
    return readdirSync("src/files");
  } catch {
    return [];
  }
}
