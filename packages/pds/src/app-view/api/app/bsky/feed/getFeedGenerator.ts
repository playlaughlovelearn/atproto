import { Server } from '../../../../../lexicon'
import AppContext from '../../../../../context'

export default function (server: Server, ctx: AppContext) {
  server.app.bsky.feed.getFeedGenerator({
    auth: ctx.accessVerifier,
    handler: async ({ params, auth }) => {
      const requester = auth.credentials.did
      const res = await ctx.appviewAgent.api.app.bsky.feed.getFeedGenerator(
        params,
        await ctx.serviceAuthHeaders(requester),
      )
      return {
        encoding: 'application/json',
        body: res.data,
      }
    },
  })
}
