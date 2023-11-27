import DataPoint from "./DatePoint"

export type ResearchResult = {
  function: string
  derivative: string
  secondOrderDerivative: string
  parity: string
  unacceptableArgumentValues: number[]
  min: number
  max: number
  asymptotes: number[]
  points: DataPoint[]
}
