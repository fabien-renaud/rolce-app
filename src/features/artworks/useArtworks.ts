import {useDispatch, useSelector} from 'react-redux';
import {State} from 'store';
import {Artwork} from './artworkType';
import {fetchAllArtworks, selectAllArtworks} from './artworksSlice';

export const useArtworks = () => {
    const dispatch = useDispatch();
    const artworks: Artwork[] = useSelector((state: State) => selectAllArtworks(state));
    const fetching: boolean = useSelector((state: State) => state.artworks.loading);
    const contentRange: string = useSelector((state: State) => state.artworks.contentRange);

    return {
        artworks,
        fetching,
        contentRange,
        fetchArtworks: (
            offset?: number,
            limit?: number,
            fields?: string[],
            filters?: {key: string; value: string | null}[],
            orders?: {key: string; value: string | null}[]
        ) => dispatch(fetchAllArtworks({offset, limit, fields, filters, orders}))
    };
};
