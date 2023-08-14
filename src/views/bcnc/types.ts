export interface bcnc {
  bcncCode?: string
  bcncNm?: string
  bcncSeCode?: string
  bcncGradCode?: string
  dscntSeCode?: string
  wkendDfkSeValue?: string
  bcncMxmmResveRegistLmttDe?: string
  bcncMxmmResveChangeLmttTi?: string
  bsnmNo?: string
  mtltyNm?: string
  rprsntvNm?: string
  indutyNm?: string
  bizcndNm?: string
  tlphonNo?: string
  faxNo?: string
  postNo?: string
  bassAdres?: string
  detailAdres?: string
  adresTyCode?: string
  delngBeginDe?: string
  delngEndDe?: string
  etcContents?: string
  useYn?: string
  agentUseStpgeYn?: string
  frpyBcncYn?: string
  etcContents2?: string
  salesFeeRt?: number
  lendChrgeLtClSn?: string
  insrncChrgeLtClSn?: string
  insrncChrgeClSn?: string
  lendChrgeClSn?: string
  frstRegistDt?: string
  insrncChrgeCl?: InsrncChrgeCl
  lendChrgeCl?: LendChrgeCl
}

interface InsrncChrgeCl {
  insrncChrgeClSn: string
  insrncChrgeClNm: string
}

interface LendChrgeCl {
  lendChrgeClSn: string
  lendChrgeClNm: string

}