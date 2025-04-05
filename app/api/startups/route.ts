import { NextResponse } from 'next/server';
import { 
  getAllStartups, 
  getStartupById, 
  getStartupsByStage, 
  getHighArrStartups, 
  getStartupsByValuation,
  getAverageTamByStage,
  getAiStartups
} from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryType = searchParams.get('query');
    const id = searchParams.get('id');
    const stage = searchParams.get('stage');

    let result;

    switch (queryType) {
      case 'all':
        result = await getAllStartups();
        break;
      case 'by-id':
        if (!id) throw new Error('ID is required for by-id query');
        result = await getStartupById(parseInt(id));
        break;
      case 'by-stage':
        if (!stage) throw new Error('Stage is required for by-stage query');
        result = await getStartupsByStage(stage);
        break;
      case 'high-arr':
        result = await getHighArrStartups();
        break;
      case 'by-valuation':
        result = await getStartupsByValuation();
        break;
      case 'avg-tam':
        result = await getAverageTamByStage();
        break;
      case 'ai-startups':
        result = await getAiStartups();
        break;
      default:
        throw new Error('Invalid query type');
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error in GET /api/startups:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic'; 