import { NextResponse } from 'next/server';
import { 
  getFeaturedStartups, 
  getTrendingStartups, 
  getEarlyStageStartups,
  getStartupById
} from '@/lib/db/investments';

export async function GET(request: Request) {
  try {
    console.log('API Route: Received request:', request.url);
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    console.log('API Route: Query parameters:', { type, id });

    let data;
    
    if (id) {
      console.log('API Route: Fetching startup by ID:', id);
      data = await getStartupById(parseInt(id));
      console.log('API Route: Startup data:', data);
      
      if (!data) {
        console.log('API Route: Startup not found');
        return NextResponse.json({ error: 'Startup not found' }, { status: 404 });
      }
    } else {
      console.log('API Route: Fetching startups by type:', type);
      switch (type) {
        case 'featured':
          data = await getFeaturedStartups();
          break;
        case 'trending':
          data = await getTrendingStartups();
          break;
        case 'early-stage':
          data = await getEarlyStageStartups();
          break;
        default:
          data = await getFeaturedStartups();
      }
      console.log(`API Route: Found ${data?.length || 0} startups`);
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch investments' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic'; 