import moment, { Moment } from "moment"

class MomentService {  
  private static m: Moment = moment()

  public static now(format: string = 'YYYY-MM-DD'): string {    
    return this.m.clone().format(format)
  }

  public static add(amount: string| number, units: moment.unitOfTime.DurationConstructor = 'days', format: string = 'YYYY-MM-DD') {
    return this.m.clone().add(amount, units).format(format)
  }
}

export default MomentService