interface RebornMenuPage {
  heading: string,
  route: string,
  svgIcon: string,
  fontIcon: string,
  pages: RebornMenuPageSub[]
}

interface RebornMenuPageSub {
  heading: string,
  route?: string,
  sub?: RebornMenuPageSub[]
}

const RebornMenuConfig: RebornMenuPage[] = [
  {
    heading: "대여관리",
    route: "/pages",
    svgIcon: "/media/icons/duotune/general/gen005.svg",
    fontIcon: "bi-archive",
    pages: [
      {
        heading: "예약관리",
        sub: [
          {
            heading: "예약접수",
            route: "/resve",
          },
          {
            heading: "일일 예약내역",
            route: "/dailyBooking",
          },
          {
            heading: "기간별 예약현황",
            route: "/resveTerm",
          },
          {
            heading: "거래처별 예약내역",
            route: "/bcncResve",
          },
          {
            heading: "예약취소",
            route: "/resveCancel",
          },
        ],
      },
      {
        heading: "계약관리",
        sub: [
          {
            heading: "계약접수",
            route: "/cnct",
          },
          {
            heading: "일일 계약내역",
            route: "/dailyContract",
          },
          {
            heading: "계약마감",
            route: "/cnctClos",
          },
          {
            heading: "미마감계약서",
            route: "/nonCnctClos",
          },
        ],
      },
      {
        heading: "대차관리",
        sub: [
          {
            heading: "대차 접수 현황",
            route: "/mtOrder",
          },
        ],
      },
      {
        heading: "예약현황",
        route: "/resveSearch",
      },
      {
        heading: "예약차트",
        route: "/resveChrt",
      },
      {
        heading: "입/출고 관리",
        route: "/entering",
      },
      {
        heading: "고장/사고 접보",
        route: "/defectAcdntRequis",
      },
      {
        heading: "유실물 관리",
        route: "/lstatcManage",
      },
    ],        
  },
  {
    heading: "현황검색",
    route: "/account",
    svgIcon: "/media/icons/duotune/general/gen004.svg",
    fontIcon: "bi-person",
    pages: [
      {
        heading: "배/반차 현황",
        route: "/disPatch",
      },
      {
        heading: "예약/대기현황",
        route: "/resveWating",
      },
      {
        heading: "차량준비 현황",
        route: "/vhcleSttus",
      },
      {
        heading: "차량운행 현황",
        route: "/vhcleHist",
      },
      {
        heading: "차량운행 일지",
        route: "/vhcleSttusHist",
      },
      {
        heading: "차량수송 현황",
        route: "/wrhsdlvrManageHist",
      },
      {
        heading: "편의장비 현황",
        route: "/cnvncEqpmnHist",
      },
      {
        heading: "셔틀운행 현황",
        route: "/shuttle",
      },
      {
        heading: "항공운항 정보",
        route: "/arplnInfo",
      },
      {
        heading: "자차권유 현황",
        route: "/deviation",
      },
      {
        heading: "쇼퍼 현황",
        route: "/chauferDrverHist",
      },
      {
        heading: "변경이력 검색",
        route: "/modiHist",
      },
    ],
  },
  {
    heading: "정산관리",
    route: "/account",
    svgIcon: "/media/icons/duotune/communication/com005.svg",
    fontIcon: "bi-person",
    pages: [
      {
        heading: "일마감 정산",
        sub: [
          {
            heading: "입출금명세서",
            route: "/payManager",
          },
          {
            heading: "고객 현직불 입금 현황",
            route: "/fiPayament",
          },
          {
            heading: "신용카드 현황",
            route: "/creditCard",
          },
          {
            heading: "마감 입금현황",
            route: "/payDeadLine",
          },
          {
            heading: "수리비 내역",
            route: "/repair",
          },
        ]            
      },
      {
        heading: "거래처 정산",
        sub: [
          {
            heading: "사전 청구서",
            route: "/preInvoice",
          },
          {
            heading: "사후 청구서",
            route: "/nextInvoice",
          },
          {
            heading: "미수총괄 현황",
            route: "/unpaid",
          },
          {
            heading: "미수내역 관리",
            route: "/uncolectPayManage",
          },
          {
            heading: "미수입금 현황",
            route: "/unpaidTerm",
          },
          {
            heading: "미수입금 내역",
            route: "/unpaidHist",
          },
          {
            heading: "판매 수수료 현황",
            route: "/saleFee",
          },
        ]
      },
      {
        heading: "환불 정산",
        route: "/refundPay",
      },
      {
        heading: "현금출납",
        sub: [
          {
            heading: "현금출납 등록",
            route: "/cashRcppmnt",
          },
          {
            heading: "입/출금 현황",
            route: "/cashRcppmntHist",
          },
        ]
      },
    ],
  },
  {
    heading: "영업관리",
    route: "/account",
    svgIcon: "/media/icons/duotune/finance/fin008.svg",
    fontIcon: "bi-person",
    pages: [
      {
        heading: "기간별 할인율 설정",
        route: "/crafted/account/overview",
      },
      {
        heading: "대여요금 관리",
        sub: [
          {
            heading: "단기 대여 요금",
            route: "/lendChrge",
          },
          {
            heading: "대차 대여 요금",
            route: "/lendChrgeMt",
          },
          {
            heading: "월 대여 요금",
            route: "/lendChrgeMonth",
          },
          {
            heading: "대여요금 분류",
            route: "/lendChrgeCl",
          },
        ]
      },
      {
        heading: "자차요금 관리",
        sub: [
          {
            heading: "단기 자차 요금",
            route: "/insrncChrge",
          },
          {
            heading: "월 자차 요금",
            route: "/insrncChrgeMonth",
          },
          {
            heading: "자차요금 분류",
            route: "/insrncChrgeCl",
          },
          {
            heading: "자차 보상한도",
            route: "/insrncRewardInfo",
          },
        ],
      },
      {
        heading: "블럭설정 관리",
        sub: [
          {
            heading: "블럭설정",
            route: "/bcncBlckCo",
          },
          {
            heading: "블럭예약 일괄해제",
            route: "/blckResveCancl",
          },
        ]
      },
      {
        heading: "거래처 예약제한 설정",
        route: "/bcncResveLmtt",
      },
      {
        heading: "공휴일 설정",
        route: "/holidayStup",
      }
    ],
  },
  {
    heading: "운영관리",
    route: "/account",
    svgIcon: "/media/icons/duotune/general/gen055.svg",
    fontIcon: "bi-person",
    pages: [
      {
        heading: "고객관리",
        sub: [
          {
            heading: "고객정보등록",
            route: "/cstrmProfile",
          },
          {
            heading: "고객정보조회",
            route: "/cstrmInfo",
          },
        ]
      },
      {
        heading: "문자 발송 관리",
        sub: [
          {
            heading: "문자 템플릿",
            route: "/smsUserTmplat",
          },
          {
            heading: "문자 일괄발송",
            route: "/smsSend",
          },
          {
            heading: "문자 발송현황",
            route: "/smsHist",
          },
        ]
      },
      {
        heading: "당직일지",
        route: "/dutyJournal",
      },
      {
        heading: "차고지 운영 관리",
        route: "/garage",
      },
      {
        heading: "배차 대기 현황",
        sub: [
          {
            heading: "배차 대기 현황",
            route: "/disPatchWaiting",
          },
          {
            heading: "배차 대기 현황 설정",
            route: "/disPatchWaiting/registForm",
          },
        ]
      },
      {
        heading: "과태료 관리",
        route: "/rentFine",
      },
    ],
  },
  {
    heading: "차량관리",
    route: "/account",
    svgIcon: "/media/icons/duotune/communication/com006.svg",
    fontIcon: "bi-person",
    pages: [
      {
        heading: "일일정비일지",
        route: "/dailyRepair",
      },
      {
        heading: "사고보고서",
        route: "/accident",
      },
      {
        heading: "월간사고현황",
        route: "/monthlyAccident",
      },
      {
        heading: "점검검사관리",
        sub: [
          {
            heading: "점검검사관리",
            route: "/vhcleInspct",
          },
          {
            heading: "차량검사 일정표",
            route: "/vhcleInspctChart",
          },
        ]
      },
      {
        heading: "정비주기도래",
        route: "/regularServicePeriod",
      },
      {
        heading: "연간사고종합",
        route: "/yearlyAccident",
      },
      {
        heading: "정비부품사용",
        route: "/repairHist",
      },
      {
        heading: "부품코드관리",
        route: "/partsCode",
      },
      {
        heading: "정비코드관리",
        route: "/repairCode",
      },
      {
        heading: "보험내역관리",
        route: "/vhcleInsurance",
      },
    ],
  },
  {
    heading: "영업집계",
    route: "/account",
    svgIcon: "/media/icons/duotune/graphs/gra004.svg",
    fontIcon: "bi-person",
    pages: [
      {
        heading: "입금일보",
        route: "/reportDeposit",
      },
      {
        heading: "매출일보",
        route: "/reportSales",
      },
      {
        heading: "매출일보 Ⅱ",
        route: "/reportSales2",
      },
      {
        heading: "매출월보",
        route: "/reportMonthSales",
      },
      {
        heading: "취소 수수료 현황",
        route: "/reportCancelFee",
      },
      {
        heading: "연료사용 현황",
        route: "/fuelCheck",
      },
      {
        heading: "수리비 집계",
        route: "/repairChrge",
      },
      {
        heading: "편의장비 매출현황",
        route: "/cnvncEqpmnSales",
      },
      {
        heading: "영업 일마감",
        route: "/dailyClos",
      },
    ],
  },
  {
    heading: "통계분석",
    route: "/account",
    svgIcon: "/media/icons/duotune/graphs/gra010.svg",
    fontIcon: "bi-person",
    pages: [
      {
        heading: "거래처별 예약집계",
        route: "/bcncResveSttus",
      },
      {
        heading: "요금 항목별 집계",
        route: "/deposit",
      },
      {
        heading: "차량가동률/대당평균",
        route: "/vhcleOperating",
      },
      {
        heading: "매출 분석",
        route: "/saleAnalysis",
      },
      {
        heading: "연간 거래처별 매출",
        route: "/yearDeposit",
      },
    ],
  },
  {
    heading: "기초자료",
    route: "/account",
    svgIcon: "/media/icons/duotune/general/gen017.svg",
    fontIcon: "bi-person",
    pages: [
      {
        heading: "차종등록",
        sub: [
          {
            heading: "차종등록",
            route: "vhcty",
          },
          {
            heading: "차량대장",
            route: "vhcle",
          },
          {
            heading: "보유대수",
            route: "vhcleHoldCo",
          },
        ]
      },
      {
        heading: "편의장비",
        sub: [
          {
            heading: "장비등록",
            route: "/cnvncEqpmn",
          },
          {
            heading: "보유대수",
            route: "/cnvncEqpmnHoldCo",
          },
        ]
      },
      {
        heading: "연료 단가",
        route: "/fuelPrice",
      },
      {
        heading: "거래처 등록",
        route: "bcnc",
      },
      {
        heading: "차량관리 거래처",
        route: "/vhcleManageBcnc",
      },
      {
        heading: "각종 코드관리",
        route: "/code",
      },
      {
        heading: "배차장소",
        route: "/alntPlc",
      },
      {
        heading: "입금계좌",
        route: "/acnt",
      },
      {
        heading: "입금수단",
        route: "/paySe",
      },
      {
        heading: "쇼퍼등록",
        route: "/chauferDrver",
      },
      {
        heading: "데스크 등록",
        route: "/desk",
      },
    ],
  },
  {
    heading: "모바일메뉴",
    route: "/account",
    svgIcon: "/media/icons/duotune/electronics/elc002.svg",
    fontIcon: "bi-person",
    pages: [
      {
        heading: "차량준비",
        route: "/mobileVhcleSttus/registForm",
      },
      {
        heading: "출퇴근현황",
        route: "/vhcleAttendSttus/registForm",
      },
      {
        heading: "셔틀현황",
        route: "/mobileShuttle",
      },
      {
        heading: "통합셔틀현황",
        route: "/unityShuttle",
      },
      {
        heading: "배차준비/반납",
        route: "/mobileDisPatch",
      },
    ],
  },
  {
    heading: "연동관리",
    route: "/account",
    svgIcon: "/media/icons/duotune/arrows/arr031.svg",
    fontIcon: "bi-person",
    pages: [
      {
        heading: "API 환경설정",
        route: "/bcncApi",
      },
      {
        heading: "API 이벤트 차량 환경설정",
        route: "/bcncApiAdd",
      },
      {
        heading: "API 차종 정보 관리",
        route: "/apiVhctyInfo",
      },
      {
        heading: "API 기간별 이벤트 할인율",
        route: "/eventPdDcrt",
      },
    ],
  },
  {
    heading: "환경설정",
    route: "/account",
    svgIcon: "/media/icons/duotune/coding/cod001.svg",
    fontIcon: "bi-person",
    pages: [
      {
        heading: "회사 기본정보",
        route: "/corpStup/updateForm",
      },
      {
        heading: "운영환경 설정",
        route: "/ernStup/updateForm",
      },
      {
        heading: "사용자 관리",
        sub: [
          {
            heading: "사용자 등록",
            route: "/user",
          },
          {
            heading: "사용자 그룹 관리",
            route: "/userGroup",
          },
        ]
      },
      {
        heading: "딜리버리 지역설정",
        route: "/locationSearch",
      },
      {
        heading: "전자계약 단말기 설정",
        route: "/trmnlCrtfc",
      },
      {
        heading: "전자계약서 설정",
        route: "/electCnctStup/updateForm.",
      },
      {
        heading: "키오스크 설정",
        sub: [
          {
            heading: "키오스크 환경 설정",
            route: "/kioskStup",
          },
        ]
      },
    ],
  },
  {
    heading: "홈페이지 관리",
    route: "/account",
    svgIcon: "/media/icons/duotune/layouts/lay009.svg",
    fontIcon: "bi-person",
    pages: [
      {
        heading: "결제관리",
        route: "/hmpgPay",
      },
      {
        heading: "회원관리",
        route: "/hmpgUser",
      },
      {
        heading: "게시판 관리",
        route: "/hmpgBbs",
      },
      {
        heading: "차량 노출 관리",
        route: "/hmpgVhcty",
      },
      {
        heading: "거래처결제관리",
        route: "/hmpgBcncPay",
      },
    ],
  },
]

  export default RebornMenuConfig;