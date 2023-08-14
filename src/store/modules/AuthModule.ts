import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface User {
  userSn: string,
  sysCode: string,
  corpCode: string,
  bcncCode: string,
  deskCode: string,
  userGroupSn: string,
  userId: string,
  userNm: string,
  tlphonNoEncpt: string,
  corpNm: string,
  smsRplyNo: string,
  rebornLiteYn: string,
  mosaicarYn: string,
  userSeCode: string,
  dscntLmttRt: number,
  accnutAcntYn: string,
  deleteYn: string,
  tlphonNo1: string,
  tlphonNo2: string,
  tlphonNo3: string,
  sysCodeArr: string,
  corpCodeArr: string,
  corpNmArr: string,
  loginType: string,
  token: string
}

export interface UserAuthInfo {
  errors: unknown;
  user: User;
  isAuthenticated: boolean;
}

@Module
export default class AuthModule extends VuexModule implements UserAuthInfo {  
  errors = {};
  user = {} as User;
  isAuthenticated = !!JwtService.getToken();

  /**
   * Get current user object
   * @returns User
   */
  get currentUser(): User {
    return this.user;
  }

  /**
   * Verify user authentication
   * @returns boolean
   */
  get isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  /**
   * Get authentification errors
   * @returns array
   */
  get getErrors() {
    return this.errors;
  }

  @Mutation
  [Mutations.SET_ERROR](error) {
    this.errors = { error };
  }

  @Mutation
  [Mutations.SET_AUTH](data: any) {
    const user: User = {
      userSn: data['userSn'],
      sysCode: data['sysCode'],
      corpCode: data['corpCode'],
      bcncCode: data['bcncCode'],
      deskCode: data['deskCode'],
      userGroupSn: data['userGroupSn'],
      userId: data['userId'],
      userNm: data['userNm'],
      tlphonNoEncpt: data['tlphonNoEncpt'],
      corpNm: data['corpNm'],
      smsRplyNo: data['smsRplyNo'],
      rebornLiteYn: data['rebornLiteYn'],
      mosaicarYn: data['mosaicarYn'],
      userSeCode: data['userSeCode'],
      dscntLmttRt: data['dscntLmttRt'],
      accnutAcntYn: data['accnutAcntYn'],
      deleteYn: data['deleteYn'],
      tlphonNo1: data['tlphonNo1'],
      tlphonNo2: data['tlphonNo2'],
      tlphonNo3: data['tlphonNo3'],
      sysCodeArr: data['sysCodeArr'],
      corpCodeArr: data['corpCodeArr'],
      corpNmArr: data['corpNmArr'],
      loginType: data['loginType'],
      token: data['token'],
    }

    this.isAuthenticated = true;
    this.user = user;
    this.errors = {};
    JwtService.saveToken(user.token);
  }

  @Mutation
  [Mutations.SET_USER](user) {
    this.user = user;
  }

  @Mutation
  [Mutations.SET_PASSWORD](password) {
    // this.user.password = password;
  }

  @Mutation
  [Mutations.PURGE_AUTH]() {
    this.isAuthenticated = false;
    this.user = {} as User;
    this.errors = [];
    JwtService.destroyToken();
  }

  @Action
  async [Actions.LOGIN](credentials) {
    // 나중에 로그인 처리
    // alert('login')
    // this.context.commit(Mutations.SET_ERROR, "eeee..........");
    const params = {
      params: {
        ...credentials
      }
    }

    const { data } = await ApiService.get("login", params)
    if (data.resultCode == '00') {
      this.context.commit(Mutations.SET_AUTH, data.data);
    } else {
      this.context.commit(Mutations.SET_ERROR, data.resultMessage);
    }
  }

  @Action
  [Actions.LOGOUT]() {
    this.context.commit(Mutations.PURGE_AUTH);
  }

  @Action
  [Actions.REGISTER](credentials) {
    return ApiService.post("register", credentials)
      .then(({ data }) => {
        this.context.commit(Mutations.SET_AUTH, data.data);
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_ERROR, response.data.errors);
      });
  }

  @Action
  [Actions.FORGOT_PASSWORD](payload) {
    return ApiService.post("forgot_password", payload)
      .then(() => {
        this.context.commit(Mutations.SET_ERROR, {});
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_ERROR, response.data.errors);
      });
  }

  @Action
  [Actions.VERIFY_AUTH](payload) {
    if (!this.currentUser.token) {
      const token = JwtService.getToken()
      if (token) {
        ApiService.setHeader();
        ApiService.post("login/token", payload)
          .then(({ data }) => {
            this.context.commit(Mutations.SET_AUTH, data.data);
          })
          .catch(({ response }) => {
            this.context.commit(Mutations.SET_ERROR, response.data.errors);
            this.context.commit(Mutations.PURGE_AUTH);
          });
      } else {
        this.context.commit(Mutations.PURGE_AUTH);
      }
    }
  }
}
