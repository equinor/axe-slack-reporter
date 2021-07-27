import { none, some, match, fromNullable } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/function'
import { IncomingWebhook } from '@slack/webhook'

const sendMessageToSlack = (url: string): number => 0

export const send = (maybeUrl: (string | undefined)) => pipe(
  fromNullable(maybeUrl),
  match(
    () => 1,
    (url: string) => sendMessageToSlack(url),
  ),
)
// const webhook = new IncomingWebhook(url)
