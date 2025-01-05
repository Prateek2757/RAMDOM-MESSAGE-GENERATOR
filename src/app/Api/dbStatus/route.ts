import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connect } from '../../../lib/dbConnect';

// Named export for the GET method
export async function GET() {
  try {
    await connect(); // Ensure the database connection is established

    const connectionStatus = mongoose.connection.readyState; // 1 means connected

    if (connectionStatus === 1) {
      return NextResponse.json({ status: "Connected", readyState: connectionStatus });
    } else {
      return NextResponse.json({ status: "Not Connected", readyState: connectionStatus }, { status: 500 });
    }
  } catch (error) {
    console.error("Error in health-check:", error);
    return NextResponse.json({ status: "Error" }, { status: 500 });
  }
}
