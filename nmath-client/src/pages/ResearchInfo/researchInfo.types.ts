import { Dispatch, SetStateAction } from 'react'
import { FunctionPlotDatum } from 'function-plot'

export type ResearchParams = {
  equation: string
}

export interface IResearchRequest {
  function: string
  start?: number
  final?: number
  step?: number
}

export interface DataPoint {
  x: number
  y: number
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

export interface IFunctionActionsProps {
  equation?: string
  index: number
  primaryColor: string
}
