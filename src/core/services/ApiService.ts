import { App, computed, nextTick, watch, watchEffect } from "vue";
import axios, { AxiosStatic, Method } from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/core/services/JwtService";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ElLoading } from 'element-plus'

export interface IAlertOption {
  label?: string,
  message?: string
  isLoading?: boolean
  onClose?(): void
  onError?(): void
  onSuccess?(data: any): void
}

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;

  private static elLoading?: any = null

  /**
   * @description initialize vue axios
   */
  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.defaults.baseURL = import.meta.env.VITE_API_URL;
    this.setHeader()
    this.setAuth()
  }

  /**
   * @description set the default HTTP request headers
   */
  public static setHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common["Authorization"] = `Token ${JwtService.getToken()}`;
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] = "application/json";
  }

  public static setAuth(): void {
    ApiService.vueInstance.axios.defaults.headers.common["sysCode"] = "THANKJEJU";
    ApiService.vueInstance.axios.defaults.headers.common["corpCode"] = "THANKJEJU";
    ApiService.vueInstance.axios.defaults.headers.common["userSn"] = "7951";
    ApiService.vueInstance.axios.defaults.headers.common["userId"] = "s2";
    ApiService.vueInstance.axios.defaults.headers.common["userGroupSn"] = "7324";
  }

  /*
  public static call(method: string, url: string, config = null as AxiosRequestConfig | null): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios({
      url: url,
      method: method as Method,
      data: config?.data,
      params: config?.params,
    });
  }
  */

  public static get(resource: string, params?: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(resource, { params: params });
  }

  public static post(resource: string, data: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.post(resource, data);
  }

  public static put(resource: string, data: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(resource, data);
  }

  public static delete(resource: string, data: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(resource, data);
  }

  public static swalDefault(text?: string, onClose?: Function) {
    Swal.fire({
      text: text,
      icon: "success",
      buttonsStyling: false,
      confirmButtonText: "확인",
      customClass: {
        confirmButton: "btn btn-primary",
      },
      focusConfirm: true,
      onClose: () => setTimeout(onClose?.(), 200)
    })
  }

  public static swalConfirm(title?: string, text?: string): any {    
    return Swal.fire({
      title: title,
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네",
      cancelButtonText: "아니오"
    })
  }

  public static swalError(message: string, onClose?: Function) {
    Swal.fire({
      text: message,
      icon: "error",
      buttonsStyling: false,
      confirmButtonText: "확인",
      customClass: {
        confirmButton: "btn btn-primary",
      },
      onClose: () => setTimeout(onClose?.(), 200)
    })
  }

  public static loading(isShow: boolean) {
    if (isShow) {
      ApiService.elLoading = ElLoading.service({
        lock: true,
        text: '잠시만 기다리세요',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    } else {
      ApiService.elLoading?.close()
    }
  }

  private static swalDefaultWithLabel(label?: string, message?: string, onClose?: Function) {
    label ??= "처리"
    const text = message ?? `"${label}" 이(가) 완료되었습니다`
    this.swalDefault(text, onClose)
  }

  private static swalConfirmWithLabel(label?: string, message?: string): any {
    label ??= "처리"
    const title = message ?? `"${label}" 하시겠습니까?`
    let text: string = ""
    switch(label) {
      case "삭제":
        text = "삭제된 데이터는 복원이 불가능 합니다"
        break
      case "취소":
        text = "입력중인 데이터는 소멸 됩니다"
        break;
    }
    return this.swalConfirm(title, text)
  }

  public static call(
    callbackEffect: (axios: AxiosStatic, callback: (res: AxiosResponse<any>) => void) => void,
    options: IAlertOption = {}) {
    
    const responseCallback = (res: AxiosResponse<any>): void => {
      if (!!options.isLoading) {
        this.loading(false)
      }

      if(res.data.resultCode === '00') {
        options.onSuccess?.(res.data)
      } else {
        options.onError?.()
        this.swalError(res.data.resultMessage, options.onClose)
      }
    }

    // 로딩창 오픈
    if (!!options.isLoading) {
      this.loading(true)
    }

    // API 호출
    callbackEffect(this.vueInstance.axios, responseCallback)
  }

  public static alert(
    callbackEffect: (axios: AxiosStatic, callback: (res: AxiosResponse<any>) => void) => void,
    options: IAlertOption = {}) {

    const responseCallback = (res: AxiosResponse<any>): void => {
      if (!!options.isLoading) {
        this.loading(false)
      }

      if(res.data.resultCode === '00') {
        options.onSuccess?.(res.data)
        this.swalDefaultWithLabel(options.label, options.message, options.onClose)
      } else {
        options.onError?.()
        this.swalError(res.data.resultMessage, options.onClose)
      }
    }
    
    // 로딩창 오픈
    if (!!options.isLoading) {
      this.loading(true)
    }

    // API 호출
    callbackEffect(this.vueInstance.axios, responseCallback)
  }

  public static confirm(
    callbackEffect: (axios: AxiosStatic, callback: (res: AxiosResponse<any>) => void) => void,
    options: IAlertOption = {}) {

    const responseCallback = (res: AxiosResponse<any>): void => {
      if (!!options.isLoading) {
        this.loading(false)
      }

      if(res.data.resultCode === '00') {
        options.onSuccess?.(res.data)
        this.swalDefaultWithLabel(options.label, options.message, options.onClose)
      } else {
        options.onError?.()
        this.swalError(res.data.resultMessage, options.onClose)
      }
    }

    this.swalConfirmWithLabel(options.label, options.message).then(response => {
      if (response.isConfirmed) {
        if (!!options.isLoading) {
          this.loading(true)
        }

        callbackEffect(this.vueInstance.axios, responseCallback)
      }
    })
  }
}

export default ApiService;
