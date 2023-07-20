require('dotenv').config();



export async function GET(request: Request) {}

export async function POST(request: Request) {
  const json = await request.json()
}