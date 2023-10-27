import { RawRecord } from "../src/definitions/RawTypes";

export const constructAlternateKeyRecord = (keyName: string, term: string): RawRecord => {
    return {
        $: {
            Type: `${term}.AlternateKey`,
        },
        PropertyValue: [
            {
                $: {
                    Property: 'Key',
                },
                Collection: [
                    {
                        Record: [
                            {
                                $: {
                                    Type: `${term}.PropertyRef`,
                                },
                                PropertyValue: [
                                    {
                                        $: {
                                            Property: 'Name',
                                            PropertyPath: keyName,
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    };
}
