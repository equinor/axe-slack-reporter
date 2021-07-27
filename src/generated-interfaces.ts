export interface AxeResult {
  inapplicable?: (InapplicableEntity)[] | null
  incomplete?: (IncompleteEntity)[] | null
  passes?: (PassesEntity)[] | null
  testEngine: TestEngine
  testEnvironment: TestEnvironment
  testRunner: TestRunner
  timestamp: string
  toolOptions: ToolOptions
  url: string
  violations?: (ViolationsEntity)[] | null
}
export interface InapplicableEntity {
  description: string
  help: string
  helpUrl: string
  id: string
  impact?: string
  nodes?: (NodesEntity)[] | null
  tags?: (string)[] | null
}
export interface IncompleteEntity {
  description: string
  help: string
  helpUrl: string
  id: string
  impact: string
  nodes?: (NodesEntity)[] | null
  tags?: (string)[] | null
}
export interface NodesEntity {
  all?: (AllEntity | null)[] | null
  any?: (AnyEntity | null)[] | null
  failureSummary: string
  html: string
  impact: string
  none?: (NoneEntityOrAnyEntityOrAllEntity | null)[] | null
  target?: (string)[] | null
}
export interface AllEntity {
  data: Data
  id: string
  impact: string
  message: string
  relatedNodes?: (RelatedNodesEntity)[] | null
}
export interface Data {
  name: string
  urlProps: UrlProps
}
export interface UrlProps {
  filename: string
  hash: string
  hostname: string
  pathname: string
  port: string
  protocol: string
  search: Search
}
export interface Search {
}
export interface RelatedNodesEntity {
  html: string
  target?: (string)[] | null
}
export interface AnyEntity {
  data: Data1
  id: string
  impact: string
  message: string
  relatedNodes?: (RelatedNodesEntity1 | null)[] | null
}
export interface Data1 {
  bgColor?: string | null
  contrastRatio?: number | null
  expectedContrastRatio?: string | null
  fgColor?: string | null
  fontSize?: string | null
  fontWeight?: string | null
  messageKey?: string | null
  shadowColor?: string | null
}
export interface RelatedNodesEntity1 {
  html: string
  target?: (string)[] | null
}
export interface NoneEntityOrAnyEntityOrAllEntity {
  data?: null
  id: string
  impact: string
  message: string
  relatedNodes?: (null)[] | null
}
export interface PassesEntity {
  description: string
  help: string
  helpUrl: string
  id: string
  impact?: string | null
  nodes?: (NodesEntity1)[] | null
  tags?: (string)[] | null
}
export interface NodesEntity1 {
  all?: (AllEntity1 | null)[] | null
  any?: (AnyEntity1 | null)[] | null
  html: string
  impact?: string | null
  none?: (NoneEntityOrAnyEntityOrAllEntity1 | null)[] | null
  target?: (string)[] | null
}
export interface AllEntity1 {
  data?: Data2 | null
  id: string
  impact: string
  message: string
  relatedNodes?: (RelatedNodesEntity2 | null)[] | null
}
export interface Data2 {
  name: string
  urlProps: UrlProps1
}
export interface UrlProps1 {
  filename: string
  hash: string
  hostname: string
  pathname: string
  port: string
  protocol: string
  search: Search1
}
export interface Search1 {
  'cyclops-redirect'?: string | null
  post?: string | null
  allerID?: string | null
  channel?: string | null
  'WT.mc_id'?: string | null
  utm_campaign?: string | null
  utm_content?: string | null
  utm_medium?: string | null
  utm_source?: string | null
}
export interface RelatedNodesEntity2 {
  html: string
  target?: (string)[] | null
}
export interface AnyEntity1 {
  data?: DataEntity | null | string
  id: string
  impact: string
  message: string
  relatedNodes?: (RelatedNodesEntity3 | null)[] | null
}
export interface DataEntity {
  headingOrder?: (HeadingOrderEntity)[] | null
  bgColor?: string | null
  contrastRatio?: number | null
  expectedContrastRatio?: string | null
  fgColor?: string | null
  fontSize?: string | null
  fontWeight?: string | null
  messageKey?: string | null
  shadowColor?: null
  role?: string | null
  accessibleText?: null
  isIframe?: boolean | null
}
export interface HeadingOrderEntity {
  ancestry?: (string)[] | null
  level: number
}
export interface RelatedNodesEntity3 {
  html: string
  target?: (string)[] | null
}
export interface NoneEntityOrAnyEntityOrAllEntity1 {
  data?: null
  id: string
  impact: string
  message: string
  relatedNodes?: (null)[] | null
}
export interface TestEngine {
  name: string
  version: string
}
export interface TestEnvironment {
  orientationAngle: number
  orientationType: string
  userAgent: string
  windowHeight: number
  windowWidth: number
}
export interface TestRunner {
  name: string
}
export interface ToolOptions {
  reporter: string
}
export interface ViolationsEntity {
  description: string
  help: string
  helpUrl: string
  id: string
  impact: string
  nodes?: (NodesEntity2)[] | null
  tags?: (string)[] | null
}
export interface NodesEntity2 {
  all?: (null)[] | null
  any?: (AnyEntity2 | null)[] | null
  failureSummary: string
  html: string
  impact: string
  none?: (NoneEntityOrAnyEntityOrAllEntity2 | null)[] | null
  target?: (string)[] | null
}
export interface AnyEntity2 {
  data?: Data3 | null
  id: string
  impact: string
  message: string
  relatedNodes?: (RelatedNodesEntity4 | null)[] | null
}
export interface Data3 {
  bgColor?: string | null
  contrastRatio?: number | null
  expectedContrastRatio?: string | null
  fgColor?: string | null
  fontSize?: string | null
  fontWeight?: string | null
  messageKey?: null
  shadowColor?: null
  accessibleText?: null
  role?: string | null
}
export interface RelatedNodesEntity4 {
  html: string
  target?: (string)[] | null
}
export interface NoneEntityOrAnyEntityOrAllEntity2 {
  data?: null
  id: string
  impact: string
  message: string
  relatedNodes?: (null)[] | null
}
