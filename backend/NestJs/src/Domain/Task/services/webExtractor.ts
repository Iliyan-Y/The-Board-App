import { AutoMap } from "@automapper/classes";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { WebExtractorGateway } from "src/Gateways/WebExtractor/gateway";
import { ExtractorPageModel } from "src/Gateways/WebExtractor/model";

export class GetExtractedPageCommand {
  @AutoMap()
  taskId: string;

  @AutoMap()
  boardId: string;

  constructor(taskId: string, boardId: string) {
    this.taskId = taskId;
    this.boardId = boardId;
  }
}

export enum GetExtractedPageResultStatus {
  Found = 1,
  NotFound = "NotFound",
}

class GetExtractedPageResult {
  status: GetExtractedPageResultStatus;
  value: string;

  constructor(status: GetExtractedPageResultStatus, value?: string) {
    (this.value = value), (this.status = status);
  }
}

abstract class GetExtractedPage {
  abstract getExtractedPage(
    command: GetExtractedPageCommand,
  ): Promise<GetExtractedPageResult>;
}

@Injectable()
export class WebExtractorService implements GetExtractedPage {
  constructor(
    private gateway: WebExtractorGateway,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getExtractedPage(
    command: GetExtractedPageCommand,
  ): Promise<GetExtractedPageResult> {
    const page = await this.gateway.showPage(
      this.mapper.map(command, GetExtractedPageCommand, ExtractorPageModel),
    );

    if (page) {
      return new GetExtractedPageResult(
        GetExtractedPageResultStatus.Found,
        page,
      );
    }

    return new GetExtractedPageResult(GetExtractedPageResultStatus.NotFound);
  }
}
