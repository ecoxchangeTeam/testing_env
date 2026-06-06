import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const dbUrl = process.env.DATABASE_URL || "";
  
  // Mask password for security
  let maskedUrl = "NOT_SET";
  if (dbUrl) {
    try {
      const parsed = new URL(dbUrl);
      parsed.password = "****";
      maskedUrl = parsed.toString();
    } catch {
      maskedUrl = "INVALID_URL_FORMAT";
    }
  }

  console.log("[Debug DB] Masked DATABASE_URL:", maskedUrl);

  try {
    console.log("[Debug DB] Running test query...");
    // Try a simple count query with a short timeout
    const testQuery = await Promise.race([
      prisma.user.count(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Database connection timeout (10s)")), 10000)
      )
    ]);
    
    return NextResponse.json({
      status: "success",
      databaseUrl: maskedUrl,
      usersCount: testQuery
    });
  } catch (err: any) {
    console.error("[Debug DB] Error:", err);
    return NextResponse.json({
      status: "error",
      databaseUrl: maskedUrl,
      error: err.message || String(err),
      stack: err.stack
    }, { status: 500 });
  }
}
