// sending to ChatGPT

const API_URL =
  "https://stg-microservices.selise.biz/api/blocks-assistant/BlocksAssistant/Assistant/AiCompletion";
const API_KEY =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiI4NjU2RDg1Ri1DM0UwLTQ4QUEtOTUwNS02NTQ1MDUwOTZBRUMiLCJzdWIiOiI4ODg4YjJlMi01MTQ2LTQzMmEtYTZmNC1jNWU4ZjVjNGMzYzEiLCJzaXRlX2lkIjoiQTE1QUQ0NkUtNEUzMy00MUMwLUJFOTctNzVBOEFCNDhGODBEIiwib3JpZ2luIjoiYmxvY2tzLnNlbGlzZXN0YWdlLmNvbSIsInNlc3Npb25faWQiOiJlY2FwLWEyMjBlMGU1LTBjMTgtNGJjNy05MjcwLWE4YTc4MjA4NzVlMyIsInVzZXJfaWQiOiI4ODg4YjJlMi01MTQ2LTQzMmEtYTZmNC1jNWU4ZjVjNGMzYzEiLCJkaXNwbGF5X25hbWUiOiJCbG9ja3MgRXh0ZXJuYWwgVGVzdCIsInNpdGVfbmFtZSI6IlNFTElTRSBCbG9ja3MiLCJ1c2VyX25hbWUiOiJibG9ja3NleHRlcm5hbHRlc3Rfc3RnQHlvcG1haWwuY29tIiwiZW1haWwiOiJibG9ja3NleHRlcm5hbHRlc3Rfc3RnQHlvcG1haWwuY29tIiwicGhvbmVfbnVtYmVyIjoibm8tcGhvbmUiLCJsYW5ndWFnZSI6ImVuLVVTIiwidXNlcl9sb2dnZWRpbiI6IlRydWUiLCJuYW1lIjoiODg4OGIyZTItNTE0Ni00MzJhLWE2ZjQtYzVlOGY1YzRjM2MxIiwidXNlcl9hdXRvX2V4cGlyZSI6IkZhbHNlIiwidXNlcl9leHBpcmVfb24iOiIwMS8wMS8wMDAxIDAwOjAwOjAwIiwicm9sZSI6ImJsb2Nrc2FkbWluXzBjYWFhMGM2LTA0YWUtNDliZS1hNzliLTZiN2FmZDVhNGYwYiIsImhkciI6IlRydWUiLCJvcmdpZCI6IjBjYWFhMGM2LTA0YWUtNDliZS1hNzliLTZiN2FmZDVhNGYwYiIsIm5iZiI6MTcwODc5Nzc2NSwiZXhwIjoxNzA4Nzk4MTg1LCJpc3MiOiJDTj1FbnRlcnByaXNlIENsb3VkIEFwcGxpY2F0aW9uIFBsYXRmb3JtIiwiYXVkIjoiKiJ9.FZwh7fSNECmgPoJ3LDX11JQbqum43RX1JNyGRt1Uf9CCYnFvblLcRhzG3D7zTumO4veLZlKA8WPZnpJzWt5PXEkgWyKUDemQCumj1UvA6CX9poOAW6MXScxthU38L6YwGf6Qt9asiuTmcfjHNwHzsRxDHmI9d_TXpRI0keEcnrDdy6FaIOWV51pIRvloCh7qCfi47brFiArZACmxckSBR1ks5zwPilm0IFJsZjytPdMenu1M0lFH2-TDoeShwVwAPeFit0EHlb3pCxKifGEaQ3rKSEROamWlqg3RPJ5d7yynXvVdP1i4JVoO3hfmNZO5yvxYcGFaLvSVqRw1E-oxzA"; // Replace with your actual API key

export interface apiTranslatedData {
  Content: string;
}

export async function apiRequestGerman(selectedText: string) {
  const requestData = {
    Message: `The requirement is to translate a user interface element of a webpage.The output should include only the text of the specified element, without any additional text or quotes or punctuation.The element type in question is 'Form Field'.Considering the above, translate the following from English to German:'${selectedText}'.`,
    Temperature: 0.5,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const responseData: apiTranslatedData = await response.json();
    console.log("responseData", responseData);
    let translation =
      responseData.Content == null
        ? "Translation not found"
        : responseData.Content;
    return translation;
  } catch (error) {
    console.error("Error in API request:", error);
  }
}

export async function apiRequestBangla(selectedText: string) {
  const requestData = {
    Message: `The requirement is to translate a user interface element of a webpage.The output should include only the text of the specified element, without any additional text or quotes or punctuation.The element type in question is 'Form Field'.Considering the above, translate the following from English to Bangla:'${selectedText}'.`,
    Temperature: 0.5,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const responseData: apiTranslatedData = await response.json();
    console.log("responseData", responseData);
    let translation =
      responseData.Content == null
        ? "Translation not found"
        : responseData.Content;
    return translation;
  } catch (error) {
    console.error("Error in API request:", error);
  }
}
