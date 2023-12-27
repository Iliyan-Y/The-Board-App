import axios from "axios";
import { WebExtractorGateway } from "src/Gateways/WebExtractor/gateway";
import { ExtractorPageModel } from "src/Gateways/WebExtractor/model";

export class WebExtractorRepository implements WebExtractorGateway {
  private webExtractorApi = process.env.EXTRACTOR_API_BASE_PATH;

  async showPage(model: ExtractorPageModel): Promise<string> {
    const apiEndpoint = `${this.webExtractorApi}/WebScrapper/${model.taskId}`;
    console.log(model);
    const result = await axios.get(apiEndpoint, {
      params: { boardId: model.boardId },
    });
    console.log("Status from get extracted page: ", result.status);
    return result.data;
  }

  async extract(model: ExtractorPageModel): Promise<boolean> {
    const apiEndpoint = `${this.webExtractorApi}/WebScrapper`;
    const result = await axios.post(apiEndpoint, model);
    console.log("Result from web extractor: ", result.status, result.data);
    return result.data;
  }
}
