import { Injectable } from "@nestjs/common";
import { ExtractPageRequest } from "./model";

@Injectable()
export abstract class WebExtractorGateway {
  abstract extract(model: ExtractPageRequest): Promise<boolean>;
}
