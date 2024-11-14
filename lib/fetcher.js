// lib/fetcher.js

/**
 * Fetches JSON data from a specified URL.
 * @param {string} url - The URL of the JSON file to fetch.
 * @returns {Promise<object>} A promise that resolves to the parsed JSON object.
 */
// lib/fetcher.js

export async function fetcher(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Fetcher error: ${error}`);
    throw error;
  }
}
