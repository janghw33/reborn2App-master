import ApiService from "@/core/services/ApiService";
import { Reborn } from "@/store/enums/StoreEnums";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

export interface SysCorpCode {
  groupCode: string;
  groupNm: string;
  groupDc: string;
  details: Array<CodeDetail>;  
}

export interface Code {
  groupCode: string,
  groupNm: string,
  groupDc: string,
  details: Array<CodeDetail>;
}

interface CodeDetail {
  code: string,
  codeNm: string,
  codeDc: string,
  tmpr1: string,
  tmpr2: string,
  tmpr3: string,
  tmpr4: string,
  tmpr5: string,
}

interface StoreInfo {
  sysCorpCode: Array<SysCorpCode>;
  code: Array<Code>;
}

@Module
export default class RebornModule extends VuexModule implements StoreInfo {
  sysCorpCode = [] as Array<SysCorpCode>;
  code = [] as Array<Code>;

  get getSysCorpCode(): Array<SysCorpCode> {
    return this.sysCorpCode
  }

  get getCode(): Array<Code> {
    return this.code
  }

  @Action
  async [Reborn.GET_SYS_CORP_CODE]() {
    const {data} = await ApiService.get("common/sysCorpCode");
    this.context.commit(Reborn.SET_SYS_CORP_CODE, data.data);
  }

  @Action
  async [Reborn.GET_CODE]() {
    const {data} = await ApiService.get("common/code");
    this.context.commit(Reborn.SET_CODE, data.data);
  }

  @Mutation
  [Reborn.SET_SYS_CORP_CODE](payload: Array<SysCorpCode>) {
    this.sysCorpCode = payload
  }

  @Mutation
  [Reborn.SET_CODE](payload: Array<Code>) {
    this.code = payload
  }
}