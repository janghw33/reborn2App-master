export const Context = {
  PageContext: 'pageContext',
  FormContext: 'formContext',
  ListContext: 'listContext',
  PrintContext: 'printContext',
} as const;
//type MOBILE_OS = typeof Context[keyof typeof Context];

export const Code = {
  /**
   * 작업자 구분
   */
  USER001: 'USER001',

  /**
   * 등록관청 구분
   */
  CUST001: 'CUST001',

  /**
   * 할인적용 등급
   */
  CUST002: 'CUST002',

  /**
   * 차종분류
   */
  CUST006: 'CUST006',

  /**
   * 제조사
   */
  CUST007: 'CUST007',

  /**
   * 보험사(자차&타차)
   */
  CUST008: 'CUST008',

  CUST011: 'CUST011',

  /**
   * 사고자 구분
   */
  CUST012: 'CUST012',

  /**
   * 사고장소
   */
  CUST013: 'CUST013',

  /**
   * 사고원인
   */
  CUST014: 'CUST014',

  /**
   * 사고종별
   */
  CUST015: 'CUST015',

  /**
   * 지역구분
   */
  CUST019: 'CUST019',

  /**
   * 정비장소
   */
  CUST020: 'CUST020',

  /**
   * 정비내역
   */
  CUST021: 'CUST021',

  /**
   * 사용부품
   */
  CUST022: 'CUST022',

  /**
   * 소속구분
   */
  CUST023: 'CUST023',

  /**
   * 사용연료
   */
  SYSM005: 'SYSM005',

  /**
   * 연료단위
   */
  SYSM006: 'SYSM006',

  /**
   * 과금방법
   */
  SYSM008: 'SYSM008',

  /**
   * 거래처 구분
   */
  SYSM009: 'SYSM009',

  /**
   * 거래방식
   */
  SYSM010: 'SYSM010',
  
  /**
   * 대여 면허유형
   */
  SYSM011: 'SYSM011',

  /**
   * 운행구분
   */
  SYSM026: 'SYSM026',

  /**
   * 차종검색분류
   */
  SYSM036: 'SYSM036',

  /**
   * 차량옵션(안전)
   */
  CART001: 'CART001',

  /**
   * 편의
   */
  CART002: 'CART002',

  /**
   * 음향
   */
  CART003: 'CART003',

  /**
   * 승용/승합 구분
   */
  CART004: 'CART004',
  
} as const;