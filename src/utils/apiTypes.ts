export type ApiResp<SuccessData = unknown, ErrorData = unknown> =
  | {
      isError: false;
      data: SuccessData;
    }
  | {
      isError: true;
      data: ErrorData;
    };
