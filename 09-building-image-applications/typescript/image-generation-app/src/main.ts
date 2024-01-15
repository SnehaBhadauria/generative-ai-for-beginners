import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import * as dotenv from "dotenv";

dotenv.config();

const endpoint = process.env.AZURE_OPENAI_ENDPOINT || '';
const azureApiKey = process.env.AZURE_OPENAI_KEY || '';

export async function main() {
  try {
    console.log("== Image Generation App ==");

    const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
    const promptImage = "captain with a parrot on his shoulder";
    const deploymentName = 'dall-e-3'; // the deployment should be Dall-E model

    const imageGenerations = await client.getImages(deploymentName, promptImage, {
      n: 1,
      size: "1024x1024",
      responseFormat: "url",
      quality: "standard",
      style: "natural",
    });

    for (const image of imageGenerations.data) {
        console.log(`Image generated URL...: ${image.url}`);
    }
  } catch (error) {
    console.log("The sample encountered an error: ", error);
  }
}

main();