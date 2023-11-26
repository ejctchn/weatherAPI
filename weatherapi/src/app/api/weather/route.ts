import { NextRequest, NextResponse } from "next/server";

export async function GET(request: any)
{
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    let url = "";
    if(address)
    {
        url = "htpps://api.openweathermap.org/data/2.5/weather?q=" + address + "&appid=1e3c656f48edc602b78d204e4e9cb897"
    }
    else
    {

    }
}