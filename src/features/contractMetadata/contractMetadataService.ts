import {ContractMetadata} from './contractMetadataType';
import contractMetadata from './contractMetadata.json';

const fetchAll = (): Promise<ContractMetadata[]> =>
    new Promise<ContractMetadata[]>((resolve) =>
        resolve(
            contractMetadata.map((metadata: ContractMetadata) => ({
                reference: metadata.reference,
                name: metadata.name,
                accountName: metadata.accountName
            }))
        )
    );

export default {
    fetchAll
};
