// lib/fetcher.js

/**
 * Fetches JSON data from a specified URL.
 * @param {string} url - The URL of the JSON file to fetch.
 * @returns {Promise<object>} A promise that resolves to the parsed JSON object.
 */
export async function fetcher(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
