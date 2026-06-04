import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const startTime = Date.now()

export async function GET() {
  let dbOk = false
  let overallStatus: 'ok' | 'degraded' | 'down' = 'ok'

  try {
    await prisma.$queryRaw`SELECT 1`
    dbOk = true
  } catch {
    overallStatus = 'degraded'
  }

  const uptimeSecs = Math.floor((Date.now() - startTime) / 1000)

  return NextResponse.json(
    {
      status: overallStatus,
      version: process.env.npm_package_version ?? '0.1.0',
      uptime: uptimeSecs,
      timestamp: new Date().toISOString(),
      checks: { database: dbOk },
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
