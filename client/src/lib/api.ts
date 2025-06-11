import { Template, TextStyle, VerificationResult } from "@/types/template";

/**
 * API base URL - adjust this to match your backend API endpoint
 */
const API_BASE = "/api"; // or use environment variable: import.meta.env.VITE_API_BASE

/**
 * Uploads a Word template file and extracts text styles
 * @param file The DOCX file to upload
 * @returns A promise that resolves to the extracted styles and metadata
 */
export async function uploadTemplate(
  file: File
): Promise<{ styles: TextStyle[] }> {
  // Create form data to send the file
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/templates/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to upload template");
  }

  return await response.json();
}

/**
 * Saves a template with extracted styles
 * @param name The name of the template
 * @param description Optional description for the template
 * @param styles Array of text styles to save with the template
 * @returns A promise that resolves when the template is saved successfully
 */
export async function saveTemplate(
  name: string,
  description: string,
  styles: TextStyle[]
): Promise<Template> {
  const response = await fetch(`${API_BASE}/templates/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      styles,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to save template");
  }

  return await response.json();
}

/**
 * Verifies a document against a template
 * @param templateId The ID of the template to verify against
 * @param file The document file to verify
 * @returns A promise that resolves to the verification results
 */
export async function verifyDocument(
  file: File,
  templateId: number,
  ignoreDirectFormatting: boolean
): Promise<VerificationResult> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${API_BASE}/verification?templateId=${templateId}`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to verify document");
  }

  return await response.json();
}

/**
 * Retrieves a list of all templates
 * @returns A promise that resolves to an array of templates
 */
export async function getTemplates(): Promise<Template[]> {
  const response = await fetch(`${API_BASE}/templates`);

  if (!response.ok) {
    throw new Error("Failed to fetch templates");
  }

  return await response.json();
}

/**
 * Retrieves a specific template by ID
 * @param id The ID of the template to retrieve
 * @returns A promise that resolves to the template details
 */
export async function getTemplate(id: number): Promise<Template> {
  const response = await fetch(`${API_BASE}/templates/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch template details");
  }

  return await response.json();
}

/**
 * Deletes a template by ID
 * @param id The ID of the template to delete
 * @returns A promise that resolves when the template is successfully deleted
 */
export async function deleteTemplate(id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/templates/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete template");
  }
}
