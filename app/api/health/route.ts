import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const startTime = Date.now()

export async function GET() {
  const checks: Record<string, boolean> = {}
  let overallStatus: 'ok' | 'degraded' | 'down' = 'ok'

  // Database check
  try {
    await prisma.$queryRaw`SELECT 1`
    checks.database = true
  } catch {
    checks.database = false
    overallStatus = 'degraded'
  }

  // Environment check
  const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET', 'STRIPE_SECRET_KEY']
  checks.environment = requiredEnvVars.every(v => !!process.env[v])
  if (!checks.environment) overallStatus = 'degraded'

  const uptimeSecs = Math.floor((Date.now() - startTime) / 1000)

  return NextResponse.json(
    {
      status: overallStatus,
      version: process.env.npm_package_version ?? '0.1.0',
      uptime: uptimeSecs,
      timestamp: new Date().toISOString(),
      checks,
    },
    {
      status: overallStatus === 'ok' ? 200 : 503,
      headers: {
        'Cache-Control': 'no-store, no-cache',
        'X-Health-Status': overallStatus,
      },
    }
  )
}
