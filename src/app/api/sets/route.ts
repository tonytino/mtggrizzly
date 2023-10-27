import type { Set } from '@/types';
import sets from './sets.json';

/**
 * Returns a collection of sets per the specified parameters
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderBy = searchParams.get('orderBy') ?? 'asc';
    const sortBy = searchParams.get('sortBy') ?? 'released_at';
    const types = searchParams.get('types') ?? ['core', 'expansion', 'masters'];

    // We'll filter the sets first
    const filteredSets = sets.reduce((sets, set) => {
      if (types.includes(set.set_type)) {
        sets.push(set as Set);
      }

      return sets;
    }, [] as Set[]);

    // Now we can sort them by name, if desired
    if (sortBy === 'name') {
      filteredSets.sort((setA, setB) => {
        if (orderBy === 'desc') {
          return setB.name.localeCompare(setA.name);
        } else {
          return setA.name.localeCompare(setB.name);
        }
      });
    }

    return Response.json({
      count: filteredSets.length,
      types,
      sets: filteredSets,
    });
  } catch (err) {
    return Response.json({
      error: 'Something went wrong, sorry.',
    });
  }
}
