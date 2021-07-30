import { IncomingWebhookResult, IncomingWebhookSendArguments } from "@slack/webhook"

export type Result = {
  numberOfViolations: number
  numberOfIncomplete: number
}

export interface Webhook {
  send: (text: string | IncomingWebhookSendArguments) => Promise<IncomingWebhookResult>
}