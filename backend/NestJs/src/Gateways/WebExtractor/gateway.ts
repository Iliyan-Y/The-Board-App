import { Injectable } from "@nestjs/common";
import { ExtractorPageModel } from "./model";

@Injectable()
export abstract class WebExtractorGateway {
  abstract extract(model: ExtractorPageModel): Promise<boolean>;
  abstract showPage(model: ExtractorPageModel): Promise<string>;
}
