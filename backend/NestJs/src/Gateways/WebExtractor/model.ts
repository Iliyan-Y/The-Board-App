export class ExtractPageRequest {
  constructor(
    public taskId: string,
    public boardId: string,
    public url: string,
  ) {}
}
