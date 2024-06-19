import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const lat = 23.795399;
    const lon = 86.427040;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const res= await axios.get(url);
    return NextResponse.json(res.data);    
  
  } catch (error) {
    console.log("Error fetching forecast data");
    return new Response("Error fetching forecast data", { status: 500 });
  }
}
