import pino from 'pino'

const isProduction = process.env.NODE_ENV === 'production'

const pinoLogger = pino({
  level: process.env.LOG_LEVEL ?? (isProduction ? 'info' : 'debug'),
  // In production: pure JSON for Vercel Log Drains / Datadog / Logtail
  // In development: pipe through `| npx pino-pretty` for readable output
})

export const logger = {
  debug: (message: string, context?: string, data?: unknown) =>
    pinoLogger.debug({ context, data }, message),
  info: (message: string, context?: string, data?: unknown) =>
    pinoLogger.info({ context, data }, message),
  warn: (message: string, context?: string, data?: unknown) =>
    pinoLogger.warn({ context, data }, message),
  error: (message: string, context?: string, data?: unknown) =>
    pinoLogger.error({ context, data }, message),
}
