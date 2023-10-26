import type { NextApiRequest, NextApiResponse } from 'next';
import type { Set } from '@/types';
import sets from '@/pages/api/sets.json';

/**
 * Returns a collection of sets per the specified parameters
 */
export default async function getSets(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      orderBy = 'asc',
      sortBy = 'released_at',
      type = 'expansion',
    } = req.query;

    // We'll filter the sets first
    const filteredSets = sets.reduce((sets, set) => {
      if (set.set_type === type) {
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

    res.status(200).json({
      count: filteredSets.length,
      type,
      sets: filteredSets,
    });
  } catch (err) {
    res.status(500).send({ error: 'Something went wrong, sorry!' });
  }
}
