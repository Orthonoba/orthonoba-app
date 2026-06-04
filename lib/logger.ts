type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  message: string
  context?: string
  data?: unknown
  timestamp: string
  env: string
}

function log(level: LogLevel, message: string, context?: string, data?: unknown) {
  const entry: LogEntry = {
    level,
    message,
    context,
    data,
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV ?? 'development',
  }

  if (process.env.NODE_ENV === 'production') {
    // Structured JSON logging for Vercel / log aggregators
    const fn = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log
    fn(JSON.stringify(entry))
  } else {
    // Pretty logging in development
    const prefix = {
      debug: '🔍',
      info: 'ℹ️ ',
      warn: '⚠️ ',
      error: '❌',
    }[level]
    const ctx = context ? `[${context}]` : ''
    const fn = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log
    fn(`${prefix} ${ctx} ${message}`, data !== undefined ? data : '')
  }
}

export const logger = {
  debug: (message: string, context?: string, data?: unknown) => log('debug', message, context, data),
  info:  (message: string, context?: string, data?: unknown) => log('info', message, context, data),
  warn:  (message: string, context?: string, data?: unknown) => log('warn', message, context, data),
  error: (message: string, context?: string, data?: unknown) => log('error', message, context, data),
}
