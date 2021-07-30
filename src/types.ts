import { IncomingWebhookResult, IncomingWebhookSendArguments } from "@slack/webhook"

export type Result = {
  numberOfViolations: number
  numberOfIncomplete: number
}

export interface IWebhook {
  send: (text: string | IncomingWebhookSendArguments) => Promise<IncomingWebhookResult>
}