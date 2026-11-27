import { API_BASE_URL } from "../config.js";
import importDataMessages from "../../i18n/en/pages/import-data.js";

// Imports the countries from REST Countries. Returns the ImportReportDto counts.
export async function importCountries() {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}/import-data`, { method: "POST" });
  } catch {
    throw new Error(importDataMessages.errors.network);
  }

  if (!response.ok) {
    throw new Error(importDataMessages.errors.failed);
  }

  return response.json();
}
