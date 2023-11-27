import DataPoint from '../../types/DatePoint'

export interface IResearchRequest {
  function: string
  start?: number
  final?: number
  step?: number
}

export interface IResearchResponse {
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