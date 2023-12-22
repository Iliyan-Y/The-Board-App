import axios from "axios";
import { WebExtractorGateway } from "src/Gateways/WebExtractor/gateway";
import { ExtractPageRequest } from "src/Gateways/WebExtractor/model";

export class WebExtractorRepository implements WebExtractorGateway {
  async extract(model: ExtractPageRequest): Promise<boolean> {
    const apiEndpoint = `${process.env.EXTRACTOR_API_BASE_PATH}/WebScrapper`;
    const result = await axios.post(apiEndpoint, model);
    console.log("Result from web extractor: ", result.status, result.data);
    return result.data;
  }
}
