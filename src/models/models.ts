
export interface IAnswer {
  text: string,
  id: number
}
export interface IQuestion {
  id: number,
  question: string,
  rightAnswerId: number,
  answers: IAnswer[]
}

export interface IOptionSelect {
  text: number,
  value: number
}